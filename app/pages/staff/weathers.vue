<script setup >
    useHead({
        title:"Weather"
    })
    const rain = ref(null)
    const option = {
        responsive: true,
    }
    const zones = ref("")
    const persent = ref("")
    const Izone = ref("")
    const error = ref(null)
    if(import.meta.client){
        const token = localStorage.getItem("token")
        const {data:data1} = await $fetch("/api/staff/rain",{
            headers:{
                "Authentication": "App "+token
            }
        })
        rain.value = data1
        const {data:data2} = await $fetch("/api/zone",{
            headers:{
                "Authentication": "App "+token
            }
        })
        zones.value = data2
    }

    async function add(event) {
        const token = localStorage.getItem("token")
        const {message,status} = await $fetch("/api/staff/rain",{
        method:"POST",
        body:{
            persent:persent.value,
            zone:Izone.value
        },
        headers:{
            "Authentication": "App "+token
            }
        })
        if (status!=200) error.value = message;else location.reload()
    }

    async function edit(event) {
        const id = event.target.id
        location.assign("/staff/weather/edit/"+id)
    }

    async function deletes(event) {
        const id = event.target.id
        const token = localStorage.getItem("token")
        const {message,status} = await $fetch("/api/staff/rain/"+id,{
        method:"delete",
        headers:{
            "Authentication": "App "+token
            }
        })
        if (status!=200) error.value = message;else location.reload()
    }
</script>

<template>
    <div class=" max-w-7xl mx-auto flex  items-center gap-6 mt-6 px-4">
        <main class="flex-1">
        <div class="bg-white rounded-lg shadow border p-6">
            <h3 class="font-semibold txet-sm text-black mb-2">รายชื่อ</h3>
            <h3 v-if="error" class="bg-red-200 text-red-500 text-center border w-full p-4 mb-2 font-semibold rounded">{{ error }}</h3>
            <div class="overflow-x-auto">
                ปริมาณน้ำฝน: <input v-model="persent" type="number" class="p-1 border rounded"></input>
                พื้นที่:
                <select v-model="Izone" class="p-1 border rounded" name="zone" id="zone">
                    <option  v-for="zone in zones" :value="zone.id">{{ zone.name }}</option>
                </select>
                <input type="button" v-on:click="add" class="bg-green-500 text-white border p-1 ml-2 font-semibold rounded" value="เพิ่ม"></input>
                <table class="min-w-full text-sm mt-4">
                    <thead class="bg-gray-100">
                        <tr class="text-gray-700 text-sm">
                            <th class="px-4 py-3 text-left">#</th>
                            <th class="px-4 py-3 text-left">ปริมาณน้ำฝน</th>
                            <th class="px-4 py-3 text-left">พื้นที่</th>
                            <th class="px-4 py-3 text-left">ผู้กรอก</th>
                            <th class="px-4 py-3 text-left">วันที่</th>
                            <th class="px-4 py-3 text-left"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        <tr class="hover:bg-gray-100" v-for="data in rain">

                                <td class="px-4 py-4">{{data.id}}</td>
                                <td class="px-4 py-4">{{data.persent}}%</td>
                                <td class="px-4 py-4">{{data.zone}}</td>
                                <td class="px-4 py-4">{{data.by}}</td>
                                <td class="px-4 py-4">{{data.create}}</td>
                                <td class="px-4 py-4">
                                    <div class="inline-flex rounded-base shadow-xs -space-x-px" role="group">
                                        <button type="button" v-on:click="edit" :id="data.id" class="bg-blue-500 text-white border p-1 ml-2 font-semibold rounded" >แก้ไข</button>
                                        <button type="button" v-on:click="deletes" :id="data.id" class="bg-red-500 text-white border p-1 ml-2 font-semibold rounded" >ลบ</button>
                                    </div>
                                </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </main>
    </div>
</template>