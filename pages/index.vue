<script setup lang="ts">
useSeoMeta({
  title: 'Resumzy - Create your resume in minutes',
  ogTitle: 'Resumzy - Create your resume in minutes',
  description:
    'Create your resume in minutes with our free resume builder. ATS-friendly and easy to use.',
  ogDescription:
    'Create your resume in minutes with our free resume builder. ATS-friendly and easy to use.',
});

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
        <h1 class="text-5xl font-bold">
          Create your resume in minutes, completely free
        </h1>
        <p class="text-lg text-muted-foreground">
          Build an ATS-friendly professional resume without the hassle. Our
          simple, no-cost builder offers clean templates and straightforward
          customization.
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
      <div
        class="relative hidden md:block mt-8 overflow-hidden px-2 md:mt-12 lg:mt-16"
      >
        <div
          aria-hidden="true"
          class="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-35% to-white"
        />
        <div
          class="relative mx-auto w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-lg shadow-zinc-950/15 ring-1 ring-white"
        >
          <NuxtImg
            class="relative z-2 w-full rounded-2xl"
            src="/resume-builder.png"
            alt="Resume builder preview"
            format="webp"
            loading="eager"
          />
        </div>
      </div>
    </UContainer>
  </main>
</template>
