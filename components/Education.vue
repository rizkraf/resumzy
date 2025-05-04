<script setup lang="ts">
const props = defineProps({
  resumeState: {
    type: Object,
    required: true,
  },
});

const addEducation = () => {
  props.resumeState.education.push({
    institution: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: '',
  });
};

const removeEducation = (index: number) => {
  if (props.resumeState.education.length > 1) {
    props.resumeState.education.splice(index, 1);
  }
};
</script>

<template>
  <UForm :state="resumeState" class="flex flex-col gap-5">
    <UCard v-for="(education, index) in resumeState.education" :key="index">
      <template #header>
        <div class="flex items-center justify-between">
          <span> Education {{ index + 1 }} </span>
          <UButton
            v-if="resumeState.education.length > 1"
            icon="i-lucide-x"
            variant="link"
            color="error"
            @click="removeEducation(index)"
          />
        </div>
      </template>
      <div class="flex flex-col gap-4">
        <UFormField label="Institution" name="institution">
          <UInput v-model="education.institution" class="w-full" />
        </UFormField>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UFormField label="Degree" name="degree">
            <UInput v-model="education.degree" class="w-full" />
          </UFormField>
          <UFormField label="Field Of Study" name="fieldOfStudy">
            <UInput v-model="education.fieldOfStudy" class="w-full" />
          </UFormField>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UFormField label="Start Date (Month)" name="startDateMonth">
            <UInputMenu
              v-model="education.startDateMonth"
              :items="months"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Start Date (Year)" name="startDateYear">
            <UInputMenu
              v-model="education.startDateYear"
              :items="years"
              class="w-full"
            />
          </UFormField>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UFormField label="End Date (Month)" name="endDateMonth">
            <UInputMenu
              v-model="education.endDateMonth"
              :items="months"
              class="w-full"
              :disabled="education.currentlyStudying"
            />
          </UFormField>
          <UFormField label="End Date (Year)" name="endDateYear">
            <UInputMenu
              v-model="education.endDateYear"
              :items="years"
              class="w-full"
              :disabled="education.currentlyStudying"
            />
          </UFormField>
        </div>
        <UFormField name="currentlyStudying">
          <UCheckbox
            label="Currently Studying"
            v-model="education.currentlyStudying"
          />
        </UFormField>
        <UFormField label="Description" name="description">
          <UTextarea v-model="education.description" class="w-full" />
        </UFormField>
      </div>
    </UCard>
    <div class="flex justify-end mt-4">
      <UButton
        icon="i-lucide-plus"
        variant="solid"
        color="neutral"
        @click="addEducation"
        >Add Education</UButton
      >
    </div>
  </UForm>
</template>
