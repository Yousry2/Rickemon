<script lang="ts" setup>
import type { SourceOption } from '@/config/constants'
import { SOURCES } from '@/config/constants'
import { defineProps } from 'vue'

defineProps<{ source: string, switchSource: (source: SourceOption) => void }>()
</script>

<template>
  <div>
    <button
      v-for="src in SOURCES"
      :key="src.key"
      :class="source === src.key ? 'btn-primary' : 'btn-outline'"
      class="rounded-lg px-4 py-2 mr-2"
      @click="switchSource(src)"
    >
      {{ src.label }}
    </button>
  </div>
</template>
