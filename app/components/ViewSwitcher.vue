<script lang="ts" setup>
import { VIEW_MODES, type ViewOption } from '@/config/constants'
import { defineProps } from 'vue'

defineProps<{ view: string, setView: (view: ViewOption) => void }>()
</script>

<template>
  <div>
    <button
      v-for="mode in VIEW_MODES"
      :key="mode.key"
      :class="view === mode.key ? 'btn-primary' : 'btn-outline'"
      class="rounded-lg px-4 py-2 mr-2"
      @click="setView(mode)"
    >
      {{ mode.label }}
    </button>
  </div>
</template>


