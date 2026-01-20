<script setup >
    useHead({
        title:"Admin"
    })
    const users =ref("")
    if(import.meta.client){
        const token = localStorage.getItem("token")
        const {data:datas} = await $fetch("/api/admin/users",{
            headers:{
                "Authentication": "App "+token
            }
        })
        users.value = datas
    }
    async function deletes(event) {
        const id = event.target.id
        const token = localStorage.getItem("token")
        const {message,status} = await $fetch("/api/admin/user/"+id,{
        method:"DELETE",
        headers:{
            "Authentication": "App "+token
            }
        })
        if (status!=200) alert(message);else location.reload()
    }

    async function edit(event) {
        const id = event.target.id
        location.assign("/admin/user/edit/"+id)
    }
</script>

<template>
    <div class=" max-w-7xl mx-auto flex  items-center gap-6 mt-6 px-4">
            <main class="flex-1">
            <div class="bg-white rounded-lg shadow border p-6">
                <h3 class="font-semibold txet-sm text-black">รายชื่อ</h3>
                <div class="overflow-x-auto">
                    <table class="min-w-full text-sm">
                        <thead class="bg-gray-100">
                            <tr class="text-gray-700 text-sm">
                                <th class="px-4 py-3 text-left">#</th>
                                <th class="px-4 py-3 text-left">ชื่อ</th>
                                <th class="px-4 py-3 text-left">email</th>
                                <th class="px-4 py-3 text-left">บทบาท</th>
                                <th class="px-4 py-3 text-left"></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y">
                            <tr class="hover:bg-gray-100" v-for="data in users">
                                <td class="px-4 py-4">{{data.id}}</td>
                                <td class="px-4 py-4">{{data.name}}</td>
                                <td class="px-4 py-4">{{data.email}}</td>
                                <td class="px-4 py-4">{{data.role}}</td>
                                <td class="px-4 py-4">
                                    <div v-if="data.role != 'admin'" class="inline-flex rounded-base shadow-xs -space-x-px" role="group">
                                        <button type="button" v-on:click="edit" :id="data.id" class="bg-blue-500 text-white border p-1 ml-2 font-semibold rounded" >แก้ไข</button>
                                        <button type="button" v-on:click="deletes" :id="data.id" class="bg-red-500 text-white border p-1 ml-2 font-semibold rounded" >ลบ</button>
                                    </div>
                                    <div v-else class="inline-flex rounded-base shadow-xs -space-x-px" role="group">
                                        <button type="button" v-on:click="edit" :id="data.id" class="bg-gray-300 text-white border p-1 ml-2 font-semibold rounded" disabled>แก้ไข</button>
                                        <button type="button" v-on:click="deletes" :id="data.id" class="bg-gray-300 text-white border p-1 ml-2 font-semibold rounded" disabled>ลบ</button>
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