<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';

useSeoMeta({
  title: 'Resume Builder | Resumzy',
  ogTitle: 'Resume Builder | Resumzy',
  description:
    'Create your resume in minutes with our free resume builder. ATS-friendly and easy to use.',
  ogDescription:
    'Create your resume in minutes with our free resume builder. ATS-friendly and easy to use.',
});

const items = [
  {
    label: 'Personal',
    description:
      'Your personal information is used to identify you and contact you.',
    icon: 'i-lucide-user',
    slot: 'personal' as const,
  },
  {
    label: 'Experience',
    description:
      'Your job experience is used to showcase your professional background.',
    icon: 'i-lucide-briefcase',
    slot: 'experience' as const,
  },
  {
    label: 'Education',
    description: 'Your education is used to showcase your academic background.',
    icon: 'i-lucide-book',
    slot: 'education' as const,
  },
  {
    label: 'Other',
    description:
      'Your other information is used to showcase skills, certifications, and other relevant details.',
    icon: 'i-lucide-info',
    slot: 'other' as const,
  },
] satisfies TabsItem[];

const resumeState = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  linkedin: '',
  website: '',
  description: '',
  experience: [
    {
      company: '',
      position: '',
      location: '',
      startDateMonth: '',
      startDateYear: '',
      endDateMonth: '',
      endDateYear: '',
      currentlyWorking: false,
      description: '',
    },
  ],
  education: [
    {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDateMonth: '',
      startDateYear: '',
      endDateMonth: '',
      endDateYear: '',
      currentlyStudying: false,
      description: '',
    },
  ],
  other: [
    {
      sectionName: '',
      items: [
        {
          category: '',
          contents: '',
        },
      ],
    },
  ],
});
const resume = useTemplateRef('resumePreview');

// Function to download resume as PDF
const downloadResume = async () => {
  if (!resume.value) return;

  const { jsPDF } = await import('jspdf');

  try {
    // Show loading notification
    const toast = useToast();
    toast.add({
      title: 'Generating PDF',
      description: 'Please wait while we prepare your resume',
      icon: 'i-lucide-download',
      color: 'neutral',
      id: 'pdf-generation',
    });

    try {
      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      // Get resume data from state
      const {
        name,
        phone,
        email,
        address,
        linkedin,
        website,
        description,
        experience,
        education,
        other,
      } = resumeState;

      // Set fonts
      pdf.setFont('helvetica', 'bold');

      // Header section
      pdf.setFontSize(24);
      pdf.text(name || 'Your Name', 40, 40);

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      let contactY = 60;
      let contactX = 40;

      // Contact information on one line with separators
      const contactInfo = [phone, email, address, linkedin, website].filter(
        Boolean
      );
      if (contactInfo.length > 0) {
        // Calculate available width for the contact info
        const pageWidth = 515; // A4 width minus margins
        const separator = ' | ';
        let currentLine = '';
        let lineWidth = 0;

        // Process each contact item
        contactInfo.forEach((item, index) => {
          const itemWidth =
            (pdf.getStringUnitWidth(item) * 11) / pdf.internal.scaleFactor;
          const separatorWidth =
            index < contactInfo.length - 1
              ? (pdf.getStringUnitWidth(separator) * 11) /
                pdf.internal.scaleFactor
              : 0;

          // Check if adding this item would overflow
          if (
            lineWidth + itemWidth + separatorWidth > pageWidth &&
            lineWidth > 0
          ) {
            // Write current line and start a new one
            pdf.text(currentLine, contactX, contactY);
            contactY += 15;
            currentLine = item;
            lineWidth = itemWidth;
          } else {
            // Add to current line
            currentLine += (lineWidth > 0 ? separator : '') + item;
            lineWidth += itemWidth + (lineWidth > 0 ? separatorWidth : 0);
          }
        });

        // Write the last line
        if (currentLine) {
          pdf.text(currentLine, contactX, contactY);
          contactY += 20;
        }
      }

      // Description
      if (description) {
        pdf.setFontSize(11);
        const descriptionLines = pdf.splitTextToSize(description, 515);
        pdf.text(descriptionLines, 40, contactY);
        contactY += descriptionLines.length * 12 + 10;
      }

      // Separator line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(40, contactY, 555, contactY);
      contactY += 20;

      // Experience section
      if (experience.length > 0) {
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Work Experience', 40, contactY);
        contactY += 20;

        pdf.setFont('helvetica', 'normal');
        experience.forEach((exp) => {
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');

          // Company and location on the same line
          const companyLocationText = `${exp.company || 'Company name'}${
            exp.location ? ' - ' + exp.location : ''
          }`;
          pdf.text(companyLocationText, 40, contactY);

          // Dates on the right
          const dateText = `${exp.startDateMonth || 'Start'} ${
            exp.startDateYear || ''
          } - ${
            exp.currentlyWorking
              ? 'Present'
              : `${exp.endDateMonth || 'End'} ${exp.endDateYear || ''}`
          }`;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          const dateWidth =
            (pdf.getStringUnitWidth(dateText) * 10.5) /
            pdf.internal.scaleFactor;
          pdf.text(dateText, 555 - dateWidth, contactY);
          contactY += 15;

          // Position
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          pdf.text(exp.position || 'Position', 40, contactY);
          contactY += 20;

          // Description with bullet points
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(11);

          if (exp.description) {
            const descLines = exp.description
              .split('\n')
              .filter((line) => line.trim());
            descLines.forEach((line) => {
              pdf.text('•', 45, contactY);
              const descLine = pdf.splitTextToSize(line, 500);
              pdf.text(descLine, 55, contactY);
              contactY += descLine.length * 12;
            });
          } else {
            pdf.text('•', 45, contactY);
            pdf.text('Job description', 55, contactY);
            contactY += 12;
          }

          contactY += 10;
        });
      }

      // Education section
      if (education.length > 0) {
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Education', 40, contactY);
        contactY += 20;

        education.forEach((edu) => {
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');

          // Institution and dates
          pdf.text(edu.institution || 'Institution', 40, contactY);
          // Institution in bold
          pdf.text(edu.institution || 'Institution', 40, contactY);

          // Set font to normal for date text
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(11);
          const eduDateText = `${edu.startDateMonth || 'Start'} ${
            edu.startDateYear || ''
          } - ${
            edu.currentlyStudying
              ? 'Present'
              : `${edu.endDateMonth || 'End'} ${edu.endDateYear || ''}`
          }`;
          const eduDateWidth =
            (pdf.getStringUnitWidth(eduDateText) * 10.5) /
            pdf.internal.scaleFactor;
          pdf.text(eduDateText, 555 - eduDateWidth, contactY);
          contactY += 15;

          // Degree and field
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          let degreeText = '';
          if (edu.degree && edu.fieldOfStudy) {
            degreeText = `${edu.degree} in ${edu.fieldOfStudy}`;
          } else if (edu.degree) {
            degreeText = edu.degree;
          } else {
            degreeText = edu.fieldOfStudy || 'Field of study';
          }
          pdf.text(degreeText, 40, contactY);
          contactY += 20;

          // Description with bullet points
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(11);

          if (edu.description) {
            const eduDescLines = edu.description
              .split('\n')
              .filter((line) => line.trim());
            eduDescLines.forEach((line) => {
              pdf.text('•', 45, contactY);
              const eduDescLine = pdf.splitTextToSize(line, 500);
              pdf.text(eduDescLine, 55, contactY);
              contactY += eduDescLine.length * 12;
            });
          } else {
            pdf.text('•', 45, contactY);
            pdf.text('Education description', 55, contactY);
            contactY += 12;
          }

          contactY += 10;
        });
      }

      // Other sections
      other.forEach((section) => {
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(section.sectionName || 'Section Name', 40, contactY);
        contactY += 20;

        section.items.forEach((item) => {
          pdf.setFontSize(11);

          // Set category to bold
          pdf.setFont('helvetica', 'bold');
          const category = item.category || 'Item name';
          pdf.text(category + ':', 40, contactY);

          // Calculate width of category text to position the contents
          const categoryWidth =
            (pdf.getStringUnitWidth(category + ': ') * 11) /
            pdf.internal.scaleFactor;

          // Set contents to normal font
          pdf.setFont('helvetica', 'normal');
          const contents = item.contents || 'Item contents';
          pdf.text(contents, 40 + categoryWidth, contactY);

          contactY += 15;
        });
        contactY += 10;
      });

      // Generate filename based on name or default
      const filename = name
        ? `${name.replace(/\s+/g, '_')}_resume.pdf`
        : 'resume.pdf';

      // Save the PDF
      pdf.save(filename);

      // Remove loading notification and show success
      toast.remove('pdf-generation');
      toast.add({
        title: 'Success!',
        description: 'Your resume has been downloaded',
        icon: 'i-lucide-check',
        color: 'success',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);

      // Show error notification
      const toast = useToast();
      toast.remove('pdf-generation');
      toast.add({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.',
        icon: 'i-lucide-alert-triangle',
        color: 'error',
      });
    }
  } catch (error) {
    console.error('Error downloading resume:', error);

    // Show error notification
    const toast = useToast();
    toast.add({
      title: 'Error',
      description: 'Failed to download resume. Please try again.',
      icon: 'i-lucide-alert-triangle',
      color: 'error',
    });
  }
};
</script>

<template>
  <header class="border-b border-b-default">
    <UContainer as="div" class="flex h-16 items-center justify-between">
      <UButton
        to="/"
        icon="i-lucide-arrow-left"
        variant="link"
        color="neutral"
        class="text-neutral"
        >Back to home</UButton
      >
      <UButton
        @click="downloadResume"
        icon="i-lucide-download"
        variant="solid"
        color="neutral"
        >Download</UButton
      >
    </UContainer>
  </header>
  <main class="flex-1">
    <UContainer as="section" class="flex flex-col justify-center py-5">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
        <UTabs
          :items="items"
          variant="pill"
          color="neutral"
          class="gap-4 w-full"
          :ui="{ trigger: 'flex-1' }"
        >
          <template #personal="{ item }">
            <p class="text-muted mb-4">
              {{ item.description }}
            </p>
            <PersonalInformation :resumeState="resumeState" />
          </template>

          <template #experience="{ item }">
            <p class="text-muted mb-4">
              {{ item.description }}
            </p>
            <Experience :resumeState="resumeState" />
          </template>

          <template #education="{ item }">
            <p class="text-muted mb-4">
              {{ item.description }}
            </p>
            <Education :resumeState="resumeState" />
          </template>

          <template #other="{ item }">
            <p class="text-muted mb-4">
              {{ item.description }}
            </p>
            <Other :resumeState="resumeState" />
          </template>
        </UTabs>
        <div class="flex flex-col gap-4">
          <h2 class="text-2xl font-bold text-neutral mb-4">Preview</h2>
          <div
            class="bg-white text-black font-helvetica shadow-lg border border-gray-200 aspect-[1/1.4142] w-full max-w-[595px] mx-auto h-[calc((100vw - 2rem) * 1.4142)] max-h-[842px]"
          >
            <div ref="resumePreview" class="p-6 h-full overflow-auto">
              <div class="border-b border-gray-200 pb-4 mb-4">
                <h1 class="text-xl font-bold">
                  {{ resumeState.name || 'Your Name' }}
                </h1>
                <div class="flex flex-wrap text-[11px] gap-1 mt-1">
                  <template
                    v-for="(item, index) in [
                      resumeState.phone,
                      resumeState.email,
                      resumeState.address,
                      resumeState.linkedin,
                      resumeState.website,
                    ].filter(Boolean)"
                  >
                    <template v-if="index > 0"> | </template>
                    <span>{{ item }}</span>
                  </template>
                </div>
                <p v-if="resumeState.description" class="text-xs mt-2">
                  {{ resumeState.description }}
                </p>
              </div>

              <!-- Experience section -->
              <div class="mb-4" v-if="resumeState.experience.length">
                <h2 class="text-sm font-semibold mb-2">Work Experience</h2>
                <div
                  v-for="(exp, index) in resumeState.experience"
                  :key="index"
                  class="mb-3"
                >
                  <div class="flex justify-between">
                    <div class="text-xs font-bold">
                      <span>
                        {{ exp.company || 'Company name' }}
                      </span>
                      <span v-if="exp.location" class="text-xs">
                        - {{ exp.location || 'Location' }}
                      </span>
                    </div>

                    <div class="text-xs">
                      <span>
                        {{ exp.startDateMonth || 'Start date' }}
                        {{ exp.startDateYear || '' }}
                      </span>
                      -
                      <span v-if="!exp.currentlyWorking">
                        {{ exp.endDateMonth || 'End date' }}
                        {{ exp.endDateYear || '' }}
                      </span>
                      <span v-else>Present</span>
                    </div>
                  </div>
                  <div class="flex justify-between">
                    <div class="text-xs">
                      {{ exp.position || 'Position' }}
                    </div>
                  </div>
                  <div class="text-[11px] mt-1">
                    <div
                      v-for="(item, i) in exp.description
                        .split('\n')
                        .filter((line) => line.trim())"
                      :key="i"
                      class="flex items-start mb-1"
                    >
                      <span class="mr-2">•</span>
                      <span>{{ item }}</span>
                    </div>
                    <div v-if="!exp.description" class="flex items-start">
                      <span class="mr-2">•</span>
                      <span>Job description</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Education section -->
              <div class="mb-4" v-if="resumeState.education.length">
                <h2 class="text-sm font-semibold mb-2">Education</h2>
                <div
                  v-for="(edu, index) in resumeState.education"
                  :key="index"
                  class="mb-3"
                >
                  <div class="flex justify-between">
                    <div class="text-xs font-bold">
                      {{ edu.institution || 'Institution' }}
                    </div>
                    <div class="text-xs">
                      <span>
                        {{ edu.startDateMonth || 'Start date' }}
                        {{ edu.startDateYear || '' }}
                      </span>
                      -
                      <span v-if="!edu.currentlyStudying">
                        {{ edu.endDateMonth || 'End date' }}
                        {{ edu.endDateYear || '' }}
                      </span>
                      <span v-else>Present</span>
                    </div>
                  </div>
                  <div class="text-xs">
                    <span v-if="edu.degree && edu.fieldOfStudy">
                      {{ edu.degree || 'Degree' }} in
                      {{ edu.fieldOfStudy || 'Field of study' }}
                    </span>
                    <span v-else-if="edu.degree">
                      {{ edu.degree || 'Degree' }}
                    </span>
                    <span v-else>
                      {{ edu.fieldOfStudy || 'Field of study' }}
                    </span>
                  </div>
                  <div class="text-[11px] mt-1">
                    <div
                      v-for="(item, i) in edu.description
                        .split('\n')
                        .filter((line) => line.trim())"
                      :key="i"
                      class="flex items-start mb-1"
                    >
                      <span class="mr-2">•</span>
                      <span>{{ item }}</span>
                    </div>
                    <div v-if="!edu.description" class="flex items-start">
                      <span class="mr-2">•</span>
                      <span>Education description</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Other sections -->
              <div
                v-for="(section, index) in resumeState.other"
                :key="index"
                class="mb-4"
              >
                <h2 class="text-sm font-semibold mb-2">
                  {{ section.sectionName || 'Section Name' }}
                </h2>
                <div
                  v-for="(item, itemIndex) in section.items"
                  :key="itemIndex"
                  class="flex flex-row items-center"
                >
                  <div class="text-[11px]">
                    <span class="font-bold">
                      {{ item.category || 'Item name' }}:
                    </span>

                    <span class="font-medium">
                      {{ item.contents || 'Item contents' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </main>
</template>
