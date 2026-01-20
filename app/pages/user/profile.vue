
<script setup>
    useHead({
        title:"โปรไฟล์ผู้ใช้"
    })
    const user = ref({})
    if (import.meta.client){
        const token = localStorage.getItem('token')
        const {data} = await $fetch("/api/user/me",{
        method:"GET",
        headers:{
            "Authentication": "App "+token
            }
        })
        if (data){
            user.value = data
        }
    }
</script>
<template>
    <Card class="max-w-md mx-auto mt-10 shadow-lg">
        <div class="p-4">
            <h1 class="text-2xl font-bold mb-4">โปรไฟล์ผู้ใช้</h1>
            <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2">ชื่อผู้ใช้:</label>
                <p class="text-gray-900">{{ user.name }}</p>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2">อีเมล:</label>
                <p class="text-gray-900">{{ user.email }}</p>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2">สิทธิ์:</label>
                <p class="text-gray-900">{{ user.role }}</p>
            </div>
            <!-- edit button -->
            <div class="flex justify-center">
                <NuxtLink to="/user/profileEdit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">แก้ไขโปรไฟล์</NuxtLink>
            </div>
        </div>
    </Card>

</template>