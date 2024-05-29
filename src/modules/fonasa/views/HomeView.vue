<template>
  <div class="w-screen fade-in">
    <hospitals-table />
  </div>
</template>

<script setup lang="ts">
import HospitalsTable from '@/modules/hospital/components/HospitalsTable.vue';

import { useHospitalStore } from '../../hospital/store/hospital.store';
import { onMounted } from 'vue';

const hospitalStore = useHospitalStore();

onMounted(() => {
  hospitalStore.getAllHospitals();
});
</script>
