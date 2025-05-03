<script setup lang="ts">
definePageMeta({
  layout: 'landing',
});
</script>

<template>
  <main class="flex-1">
    <UContainer
      as="section"
      class="flex flex-col justify-center space-y-8 py-24 md:py-32"
    >
      <div class="space-y-4 max-w-xl">
        <h1 class="text-5xl font-bold">Build a professional resume for free</h1>
        <p class="text-lg text-muted-foreground">
          Create a clean, ATS friendly, and professional resume in minutes. Our
          free builder offers straightforward templates, simple customization,
          and helpful tips to showcase your skills and experience without the
          complexity.
        </p>
      </div>
      <div class="space-x-4">
        <UButton
          to="/resume/create"
          color="neutral"
          size="xl"
          class="rounded-full"
          trailing-icon="i-lucide-arrow-right"
        >
          Build Your Resume
        </UButton>
      </div>
    </UContainer>
  </main>
</template>
