<script lang="ts" setup>
import { useCharacterMapper } from '~/composables/useCharacterMapper'
import { useCharacterDetailsStore } from '@/stores/character-details'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id as string
const source = route.query.source as 'pokemon' | 'rick'

const store = useCharacterDetailsStore()

const { mapCharacterDetails } = useCharacterMapper()
const mappedCharacterDetails = mapCharacterDetails(store.characterDetails, source)

onMounted(async () => {
  if (source === 'pokemon') {
    await store.fetchPokemonDetails(id)
  }
  else if (source === 'rick') {
    await store.fetchRickAndMortyDetails(id)
  }
})

const isLoadingDetails = store.isLoadingDetails
const errorDetails = store.errorDetails
</script>

<template>
  <UPage>
    <UContainer class="main-container">
      <DetailsCard :details="mappedCharacterDetails" />
      <p v-if="isLoadingDetails">
        Loading...
      </p>
      <p v-if="errorDetails">
        {{ errorDetails }}
      </p>
    </UContainer>
  </UPage>
</template>

  <style scoped>
  .main-container {
  padding: 20px;
}
</style>
