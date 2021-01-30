<template>
  <div class="h-screen w-screen flex flex-col">
    <Brands />
  </div>
</template>

<script>
import Brands from '@/components/Brands.vue';

export default {
  name: 'App',
  components: {
    Brands,
  },
};
</script>
