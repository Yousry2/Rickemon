<script lang="ts" setup>
import { SOURCES } from '@/config/constants'
import { defineProps } from 'vue'

defineProps<{ source: string, switchSource: (source: string) => void }>()
</script>

<template>
  <div>
    <button
      v-for="src in SOURCES"
      :key="src.key"
      :class="source === src.key ? 'btn-primary' : 'btn-outline'"
      class="rounded-lg px-4 py-2 mr-2"
      @click="switchSource(src.key)"
    >
      {{ src.label }}
    </button>
  </div>
</template>
