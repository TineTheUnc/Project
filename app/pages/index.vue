<script setup >
    import { Bar } from 'vue-chartjs';
    import { Chart, BarElement, Legend, Title,CategoryScale,LinearScale} from 'chart.js'
    Chart.register( BarElement, Legend, Title,CategoryScale,LinearScale)
    useHead({
        title:"Home"
    })
    const rain = ref(null)
    const sensor = ref(null)
    const option = {
        responsive: true,
    }
    const fetchWeather = async () => {
        try {
            const { data: data2 } = await $fetch('/api/todaySensor')
            if (data2) {
                sensor.value = data2
            }
        } catch (e) {
            console.error("ดึงข้อมูลไม่สำเร็จ", e)
        }
    }
    let timer

    onMounted(async () => {
        const { data: data1 } = await $fetch("/api/todayRain")
        if (data1) {
            rain.value = {
                labels: data1.map(d => d.zone),
                datasets: [{
                    label: "สภาพอากาศวันนี้",
                    backgroundColor: "#02a3f4",
                    data: data1.map(d => d.persent)
                }]
            }
        }

        await fetchWeather()
        timer = setInterval(fetchWeather, 5000)
    })

    onUnmounted(() => {
        clearInterval(timer)
    })
</script>

<template>
  <div class="bg-gray-150 min-h-screen">
    <div class="max-w-6xl mx-auto px-4 space-y-6 mt-10">

      <!-- sensor snapshot -->
      <div v-if="sensor" class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UCard>
          <p class="text-xs text-gray-500">อุณหภูมิ</p>
          <p class="text-2xl font-semibold transition-all duration-300">{{ sensor.temp }} °C</p>
        </UCard>

        <UCard>
          <p class="text-xs text-gray-500">ความชื้น</p>
          <p class="text-2xl font-semibold transition-all duration-300">{{ sensor.hum }} %</p>
        </UCard>

        <UCard>
          <p class="text-xs text-gray-500">ความกดอากาศ</p>
          <p class="text-2xl font-semibold transition-all duration-300">
            {{ (sensor.pres / 100).toFixed(0) }} hPa
          </p>
        </UCard>

        <UCard>
          <p class="text-xs text-gray-500">ความสูง</p>
          <p class="text-2xl font-semibold transition-all duration-300">{{ sensor.alt }} m</p>
        </UCard>
      </div>

      <!-- chart -->
      <UCard>
        <Bar
          v-if="rain"
          :data="rain"
          :options="option"
        />
        <h2 v-else class="text-center m-4">ไม่มีข้อมูลในวันนี้</h2>
      </UCard>

    </div>
  </div>
</template>
