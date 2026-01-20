<script setup >
    useHead({
        title:"Admin"
    })
    const zones = ref("")
    const zone = ref(null)
    const error = ref(null)
    if(import.meta.client){
        const token = localStorage.getItem("token")
        const {data:datas} = await $fetch("/api/zone",{
            headers:{
                "Authentication": "App "+token
            }
        })
        zones.value = datas
    }
    async function deletes(event) {
        const id = event.target.id
        const token = localStorage.getItem("token")
        const {message,status} = await $fetch("/api/admin/zone/"+id,{
        method:"DELETE",
        headers:{
            "Authentication": "App "+token
            }
        })
        if (status!=200) error.value = message;else location.reload()
    }

    async function edit(event) {
        const id = event.target.id
        location.assign("/admin/zone/edit/"+id)
    }

    async function add(event) {
        const token = localStorage.getItem("token")
        const {message,status} = await $fetch("/api/admin/zone",{
        method:"POST",
        body:{
            name:zone.value
        },
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
                <h3 class="font-semibold txet-sm text-black mb-2">รายชื่อเขต</h3>
                <h3 v-if="error" class=" mb-2bg-red-200 text-red-500 text-center border w-full p-4 mb-2 font-semibold rounded">{{ error }}</h3>
                พื้นที่: <input v-model="zone" type="text" name="zone" placeholder="ชื่อเขต" class="w-1/2 p-3 border rounded" required>
                <button type="button" v-on:click="add" class="bg-green-500 text-white border p-2 ml-2 font-semibold rounded" >เพิ่มเขต</button>
                <div class="overflow-x-auto mt-4">
                    <table class="min-w-full text-sm">
                        <thead class="bg-gray-100">
                            <tr class="text-gray-700 text-sm">
                                <th class="px-4 py-3 text-left">#</th>
                                <th class="px-4 py-3 text-left">ชื่อเขต</th>
                                <th class="px-4 py-3 text-left"></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y">
                            <tr class="hover:bg-gray-100" v-for="data in zones">
                                <td class="px-4 py-4">{{data.id}}</td>
                                <td class="px-4 py-4">{{data.name}}</td>
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