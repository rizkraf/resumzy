<script setup lang="ts">
defineProps({
  resumeState: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <UForm :state="resumeState" class="flex flex-col gap-4">
    <UFormField label="Name" name="name">
      <UInput
        v-model="resumeState.name"
        class="w-full"
        color="neutral"
        placeholder="John Doe"
      />
    </UFormField>
    <UFormField label="Phone Number" name="phone">
      <UInput
        v-model="resumeState.phone"
        class="w-full"
        color="neutral"
        placeholder="+1 (555) 123-4567"
      />
    </UFormField>
    <UFormField label="Email" name="email">
      <UInput
        v-model="resumeState.email"
        class="w-full"
        color="neutral"
        placeholder="johndoe@example.com"
      />
    </UFormField>
    <UFormField label="Address" name="address">
      <UInput
        v-model="resumeState.address"
        class="w-full"
        color="neutral"
        placeholder="123 Main St, City, Country"
      />
    </UFormField>
    <UFormField label="LinkedIn" name="linkedin">
      <UInput
        v-model="resumeState.linkedin"
        class="w-full"
        color="neutral"
        placeholder="linkedin.com/in/johndoe"
      />
    </UFormField>
    <UFormField label="Website" name="website">
      <UInput
        v-model="resumeState.website"
        class="w-full"
        color="neutral"
        placeholder="johndoe.com"
      />
    </UFormField>
    <UFormField label="Description" name="description">
      <UTextarea
        v-model="resumeState.description"
        class="w-full"
        color="neutral"
        placeholder="A brief summary about yourself and your professional experience..."
      />
    </UFormField>
  </UForm>
</template>
