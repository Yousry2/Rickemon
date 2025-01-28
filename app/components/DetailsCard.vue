<template>
    <USection class="character-detail">
      <div class="character-content">
        <h1 class="character-name">Character Details</h1>
        <div v-for="(item, index) in details" :key="index" class="detail-item">
          <strong>{{ item.label }}:</strong> 
          <span v-if="item.label === 'Image'">
            <img :src="item.value" alt="Character Image" class="character-img" />
          </span>
          <span v-else>{{ item.value }}</span>
        </div>
      </div>
    </USection>
  </template>
  
  <script>
  export default {
    props: {
      details: Array
    }
  };
  </script>
  
  <style scoped>
  .character-detail {
    text-align: center;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 8px;
  }
  
  .character-content {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .character-name {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .character-img {
    width: 100%;
    max-width: 300px;
    margin: 20px 0;
    border-radius: 8px;
  }
  
  .detail-item {
    font-size: 16px;
    margin-bottom: 8px;
    text-align: left;
  }
  </style>
  