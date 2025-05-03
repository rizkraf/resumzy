<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-t-default">
    <UContainer
      as="footer"
      class="flex h-16 items-center justify-between border-t border-t-default"
    >
      <div class="text-sm text-muted-foreground">
        &copy; {{ currentYear }} Resumzy. All rights reserved.
      </div>
      <div>
        <UButton
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-lucide-github"
          variant="link"
          color="neutral"
        />
      </div>
    </UContainer>
  </footer>
</template>
