<script setup >
    useHead({
        title:"แก้ไขข้อมูลสภาพอากาศ",
        bodyAttrs:{
            class:"bg-gray-150 flex justify-center items-center min-h-screen"
        }
    })
    definePageMeta({ layout: 'form' })
    const persent = ref(null)
    const zone = ref(null)
    const zones = ref([])
    const error = ref(null)
    if (import.meta.client){
        const token = localStorage.getItem("token")
        const id = useRoute().params.id
        const {data} = await $fetch("/api/staff/rain/"+id,{
            method:"GET",
            headers:{
                "Authentication": "App "+token
                }
            })
        persent.value = data.persent
        zone.value = data.zone
        const {data:data2} = await $fetch("/api/zone",{
            headers:{
                "Authentication": "App "+token
            }
        })
        console.log(zone.value);
        
        zones.value = data2
    }
    async function submit(event) {
        event.preventDefault()
        const token = localStorage.getItem("token")
        const id = useRoute().params.id
        const {message,status} = await $fetch("/api/staff/rain/"+id,{
            method:"PUT",
            body:{
                persent:persent.value,
                zone:zone.value
            },
            headers:{
                "Authentication": "App "+token
                }
            })
        if (status!=200) {
            error.value = message
        }else{
            location.assign("/staff/weathers")
        } 
    }
</script>
<template>
    <div class="bg-white rounded-lg shadow p-6 w-80">
        <h2 class="font-semibold text-center text-xl  mb-2">แก้ไขข้อมูลเขต</h2>
        <h3 v-if="error" class="bg-red-200 text-red-500 text-center border w-full p-4 mb-2 font-semibold rounded">{{ error }}</h3>
        <form v-on:submit="submit" class="space-y-3">
            <input v-model="persent" type="persent" name="persent" placeholder="ปริมาณน้ำฝน" class="w-full p-3 border rounded" required>
            <select v-model="zone" class="p-1 border rounded" name="zone" id="zone">
                <option  v-for="z in zones" :value="z.id">{{ z.name }}</option>
            </select>
            <button type="submit" class="bg-blue-500 text-white border w-full p-3 font-semibold rounded">แก้ไข</button>
            <NuxtLink to="/staff/weathers" class="text-gray-500  w-full font-semibold  flex justify-left text-xs">ย้อนกลับ</NuxtLink>
        </form>
    </div>
</template>