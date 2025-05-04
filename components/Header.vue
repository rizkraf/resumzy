<template>
  <header class="border-b border-b-default">
    <UContainer as="div" class="flex h-16 items-center justify-between">
      <div class="flex items-center space-x-2">
        <UIcon name="i-lucide-file-text" class="size-8 text-neutral" />
        <span class="text-xl font-bold">Resumzy</span>
      </div>
      <div class="flex items-center space-x-4">
        <UButton
          to="/resume/create"
          variant="solid"
          color="neutral"

          class="rounded-full"
        >
          Create Resume
        </UButton>
      </div>
    </UContainer>
  </header>
</template>
