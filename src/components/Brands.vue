<template>
  <div
    class="w-full h-full flex justify-center items-center text-center text-2xl text-teal-100 font-semibold space-x-8"
  >
    <div class="flex flex-col items-center justify-center">
      <ElectronJsIcon class="w-32 h-32" />
      <p class="pt-10 mt-auto">Electron</p>
    </div>
    <div class="flex flex-col items-center justify-center">
      <LightningSolidIcon class="w-32 h-32 text-yellow-300" />
      <p class="pt-10 mt-auto">Vite</p>
    </div>
    <div class="flex flex-col items-center justify-center">
      <VueJsIcon class="w-32 h-32" />
      <p class="pt-10 mt-auto">Vue</p>
    </div>
    <div class="flex flex-col items-center justify-center">
      <TailwindIcon class="w-32 h-32" />
      <p class="pt-10 mt-auto">Tailwindcss</p>
    </div>
    <div class="flex flex-col items-center justify-center">
      <DockerIcon class="w-32 h-32" />
      <p class="pt-10 mt-auto">Docker</p>
    </div>
  </div>
</template>

<script>
import LightningSolidIcon from '@/assets/lightning-solid.svg';
import TailwindIcon from '@/assets/tailwind.svg';
import ElectronJsIcon from '@/assets/electronjs.svg';
import VueJsIcon from '@/assets/vuejs.svg';
import DockerIcon from '@/assets/docker.svg';

export default {
  name: 'Brands',
  components: {
    LightningSolidIcon,
    TailwindIcon,
    ElectronJsIcon,
    VueJsIcon,
    DockerIcon,
  },
};
</script>
