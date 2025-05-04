<script setup lang="ts">
const props = defineProps({
  resumeState: {
    type: Object,
    required: true,
  },
});

const addExperience = () => {
  props.resumeState.experience.push({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  });
};

const removeExperience = (index: number) => {
  if (props.resumeState.experience.length > 1) {
    props.resumeState.experience.splice(index, 1);
  }
};
</script>

<template>
  <UForm :state="resumeState" class="flex flex-col gap-5">
    <UCard v-for="(experience, index) in resumeState.experience" :key="index">
      <template #header>
        <div class="flex items-center justify-between">
          <span> Experience {{ index + 1 }} </span>
          <UButton
            v-if="resumeState.experience.length > 1"
            icon="i-lucide-x"
            variant="link"
            color="error"
            @click="removeExperience(index)"
          />
        </div>
      </template>
      <div class="flex flex-col gap-4">
        <UFormField label="Company" name="company">
          <UInput v-model="experience.company" class="w-full" />
        </UFormField>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UFormField label="Position" name="position">
            <UInput v-model="experience.position" class="w-full" />
          </UFormField>
          <UFormField label="Location" name="location">
            <UInput v-model="experience.location" class="w-full" />
          </UFormField>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UFormField label="Start Date (Month)" name="startDateMonth">
            <UInputMenu
              v-model="experience.startDateMonth"
              :items="months"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Start Date (Year)" name="startDateYear">
            <UInputMenu
              v-model="experience.startDateYear"
              :items="years"
              class="w-full"
            />
          </UFormField>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UFormField label="End Date (Month)" name="endDateMonth">
            <UInputMenu
              v-model="experience.endDateMonth"
              :items="months"
              class="w-full"
              :disabled="experience.currentlyWorking"
            />
          </UFormField>
          <UFormField label="End Date (Year)" name="endDateYear">
            <UInputMenu
              v-model="experience.endDateYear"
              :items="years"
              class="w-full"
              :disabled="experience.currentlyWorking"
            />
          </UFormField>
        </div>
        <UFormField name="currentlyWorking">
          <UCheckbox
            label="Currently Working"
            v-model="experience.currentlyWorking"
          />
        </UFormField>
        <UFormField label="Description" name="description">
          <UTextarea v-model="experience.description" class="w-full" />
        </UFormField>
      </div>
    </UCard>
    <div class="flex justify-end mt-4">
      <UButton
        icon="i-lucide-plus"
        variant="solid"
        color="neutral"
        @click="addExperience"
        >Add Experience</UButton
      >
    </div>
  </UForm>
</template>
