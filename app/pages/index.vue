<script setup >
    import { Bar } from 'vue-chartjs';
    import { Chart, BarElement, Legend, Title,CategoryScale,LinearScale} from 'chart.js'
    Chart.register( BarElement, Legend, Title,CategoryScale,LinearScale)
    useHead({
        title:"Home"
    })
    const rain = ref(null)
    const option = {
        responsive: true,
    }
    if(import.meta.client){
        const {data:data1} = await $fetch("/api/todayRain")  
        if (data1){
            const Chartdata = {
                labels: data1.map((data)=>data.zone),
                datasets:[
                    {
                        label:"สภาพอากาศวันนี้",
                        backgroundColor: "#02a3f4",
                        data: data1.map((data)=>data.persent)
                    }
                ]
            }
            rain.value = Chartdata
        }
    }
</script>

<template>
     <div class="bg-gray-150 min-h-screen">
        <div class="w-full justify-center flex mt-10">
            <div class="grid grid-cols-1 md:grid-cols-1 gap-10 max-w-6xl w-full px-4">
                <Card>
                    <Bar v-if="rain"
                    :data="rain"
                    :Chartoption="option"
                    />
                    <h2 v-else class="text-center mt-4">ไม่มีข้อมูลในวันนี้</h2>
                </Card>
            </div>
        </div>
     </div>
</template>