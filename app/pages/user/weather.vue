<script setup >
    import { Bar } from 'vue-chartjs';
    import { Chart, BarElement, Legend, Title,CategoryScale,LinearScale} from 'chart.js'
    Chart.register( BarElement, Legend, Title,CategoryScale,LinearScale)
    useHead({
        title:"Weather"
    })
    const rain = ref(null)
    const option = {
        responsive: true,
    }
    const d = new Date()
    const date = ref(d.toISOString().split("T")[0])
    if(import.meta.client){
        const token = localStorage.getItem("token")
        const {data:data1} = await $fetch("/api/user/rain?date="+date.value,{
            headers:{
                "Authentication": "App "+token
            }
        })
        
        if (data1){
            const day = new Date(date.value)
            const Chartdata = {
                labels: data1.map((data)=>data.zone),
                datasets:[
                    {
                        label:"สภาพอากาศที่วันที่ "+day.getDate()+"/"+(day.getMonth()+1)+"/"+day.getFullYear(),
                        backgroundColor: "#02a3f4",
                        data: data1.map((data)=>data.persent)
                    }
                ]
            }
            rain.value = Chartdata
        }
    }

    async function change(event) {
        rain.value = null
       const token = localStorage.getItem("token")
        const {data:data1} = await $fetch("/api/user/rain?date="+date.value,{
            headers:{
                "Authentication": "App "+token
            }
        })
        if (data1){
            const day = new Date(date.value)
            const Chartdata = {
                labels: data1.map((data)=>data.zone),
                datasets:[
                    {
                        label:"สภาพอากาศที่วันที่ "+day.getDate()+"/"+(day.getMonth()+1)+"/"+day.getFullYear(),
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
        <div class="flex justify-center pt-6 mt-4">
            <input v-on:change="change" v-model="date" type="date" name="date" id="date">
        </div>
        <div class="w-full justify-center flex mt-4">
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