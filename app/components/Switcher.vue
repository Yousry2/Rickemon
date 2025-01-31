<script lang="ts" setup generic="T extends SwitchOption<any>">
import type {  SwitchOption } from '@/config/constants'

import { defineProps } from 'vue'

defineProps<{ selectedOption: string, options: T[], onSwitch: (source: T) => void }>()
</script>

<template>
  <div>
    <button
      v-for="src in options"
      :key="src.key"
      :class="source === src.key ? 'btn-primary' : 'btn-outline'"
      class="rounded-lg px-4 py-2 mr-2"
      @click="onSwitch(src)"
    >
      {{ src.label }}
    </button>
  </div>
</template>
