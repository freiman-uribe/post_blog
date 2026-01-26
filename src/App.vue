<script setup lang="ts">
import { RouterView } from 'vue-router';
import BaseHeader from '@/components/molecules/BaseHeader.vue';
import BaseFooter from '@/components/molecules/BaseFooter.vue';
</script>

<template>
  <BaseHeader/>
  <RouterView/>
  <BaseFooter/>
</template>