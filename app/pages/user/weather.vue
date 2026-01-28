<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart,
  BarElement,
  Legend,
  Title,
  CategoryScale,
  LinearScale
} from 'chart.js'

Chart.register(BarElement, Legend, Title, CategoryScale, LinearScale)

useHead({ title: 'Weather' })

const rain = ref(null)
const sensor = ref(null)

const option = { responsive: true }

const today = new Date()
const date = ref(today.toISOString().split('T')[0])

const token = import.meta.client ? localStorage.getItem('token') : null

const buildChartData = (data) => {
  const day = new Date(date.value)
  return {
    labels: data.map(d => d.zone),
    datasets: [{
      label: `สภาพอากาศวันที่ ${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`,
      backgroundColor: '#02a3f4',
      data: data.map(d => d.persent)
    }]
  }
}

const fetchRain = async () => {
  rain.value = null
  try {
    const { data } = await $fetch(`/api/user/rain?date=${date.value}`, {
      headers: { Authentication: 'App ' + token }
    })
    if (data?.length) rain.value = buildChartData(data)
  } catch (e) {
    console.error('โหลดฝนไม่สำเร็จ', e)
  } 
}

const fetchSensor = async () => {
  try {
    const { data } = await $fetch(`/api/user/sensor?date=${date.value}`, {
      headers: { Authentication: 'App ' + token }
    })
    sensor.value = data
  } catch (e) {
    console.error('โหลด sensor ไม่สำเร็จ', e)
  }
}

let timer
onMounted(async () => {
  await fetchAll()
  timer = setInterval(fetchSensor, 10000) // 10 วิพอ ไม่ต้องถี่
})

const fetchAll = async () => {
  await fetchRain()
  await fetchSensor()
}

onUnmounted(() => clearInterval(timer))
watch(date, fetchAll)
</script>
<template>
  <div class="min-h-screen bg-default">
    <div class="max-w-6xl mx-auto px-4 space-y-6 mt-6">

        
        <!-- date picker -->
        <div class="flex justify-center">
            <UInput
          v-model="date"
          type="date"
          color="neutral"
          class="w-48"
        />
      </div>
      <!-- sensor snapshot -->
      <div v-if="sensor" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UCard>
          <p class="text-xs text-gray-500">อุณหภูมิ</p>
          <p class="text-2xl font-semibold">{{ sensor.temp }} °C</p>
        </UCard>

        <UCard>
          <p class="text-xs text-gray-500">ความชื้น</p>
          <p class="text-2xl font-semibold">{{ sensor.hum }} %</p>
        </UCard>

        <UCard>
          <p class="text-xs text-gray-500">ความกดอากาศ</p>
          <p class="text-2xl font-semibold">
            {{ (sensor.pres / 100).toFixed(0) }} hPa
          </p>
        </UCard>

        <UCard>
          <p class="text-xs text-gray-500">ความสูง</p>
          <p class="text-2xl font-semibold">{{ sensor.alt }} m</p>
        </UCard>
      </div>

      <!-- rain chart -->
      <UCard>
        <Bar
          v-if="rain"
          :data="rain"
          :options="option"
        />

        <h2 v-else class="text-center py-10 text-gray-500">
          ไม่มีข้อมูลในวันที่เลือก
        </h2>
      </UCard>

    </div>
  </div>
</template>
