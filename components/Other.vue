<script setup lang="ts">
const props = defineProps({
  resumeState: {
    type: Object,
    required: true,
  },
});

const addOther = () => {
  props.resumeState.other.push({
    sectionName: '',
    items: [
      {
        category: '',
        contents: '',
      },
    ],
  });
};
const removeOther = (index: number) => {
  if (props.resumeState.other.length > 1) {
    props.resumeState.other.splice(index, 1);
  }
};

const addCategory = (other: any) => {
  other.items.push({
    category: '',
    contents: '',
  });
};

const removeCategory = (other: any, index: number) => {
  if (other.items.length > 1) {
    other.items.splice(index, 1);
  }
};
</script>

<template>
  <UForm :state="resumeState" class="flex flex-col gap-5">
    <UCard v-for="(other, index) in resumeState.other" :key="index">
      <template #header>
        <div class="flex items-center justify-between">
          <UFormField name="sectionName">
            <UInput v-model="other.sectionName" class="w-full" />
          </UFormField>
          <UButton
            v-if="resumeState.other.length > 1"
            icon="i-lucide-x"
            variant="link"
            color="error"
            @click="removeOther(index)"
          />
        </div>
      </template>
      <div class="flex flex-col gap-4">
        <div
          v-for="(item, index) in other.items"
          :key="index"
          class="flex flex-col gap-4"
        >
          <UFormField :label="'Category ' + (index + 1)" name="category">
            <div class="flex items-center gap-2">
              <UInput v-model="item.category" class="w-full" />
              <UButton
                v-if="other.items.length > 1"
                icon="i-lucide-x"
                variant="link"
                color="error"
                @click="removeCategory(other, index)"
              />
            </div>
          </UFormField>
          <UFormField :label="'Contents ' + (index + 1)" name="contents">
            <UTextarea v-model="item.contents" class="w-full" />
          </UFormField>
        </div>
        <div>
          <UButton
            icon="i-lucide-plus"
            variant="solid"
            color="neutral"
            @click="addCategory(other)"
            >Add Category</UButton
          >
        </div>
      </div>
    </UCard>
    <div class="flex justify-end mt-4">
      <UButton
        icon="i-lucide-plus"
        variant="solid"
        color="neutral"
        @click="addOther"
        >Add Other</UButton
      >
    </div>
  </UForm>
</template>
