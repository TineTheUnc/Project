<script setup >
    useHead({
        title:"แก้ไขโปรไฟล์ผู้ใช้",
        bodyAttrs:{
            class:"bg-gray-150 flex justify-center items-center min-h-screen"
        }
    })
    definePageMeta({ layout: 'form' })
    const name = ref(null)
    const email = ref(null)
    const error = ref(null)
    if (import.meta.client){
        const token = localStorage.getItem("token")
        const {data} = await $fetch("/api/user/me",{
            method:"GET",
            headers:{
                "Authentication": "App "+token
                }
            })
        name.value = data.name
        email.value = data.email
    }
    async function submit(event) {
        event.preventDefault()
        const token = localStorage.getItem("token")
        const {message,status,data} = await $fetch("/api/user/me",{
            method:"PUT",
            body:{
                name:name.value,
                email:email.value
            },
            headers:{
                "Authentication": "App "+token
                }
            })
        if (status!=200) {
            error.value = message
        }else{
            localStorage.setItem("token",data)
            location.assign("/user/profile")
        }
    }
</script>
<template>
    <div class="bg-white rounded-lg shadow p-6 w-80">
        <h2 class="font-semibold text-center text-xl  mb-2">แก้ไขโปรไฟล์ผู้ใช้</h2>
        <h3 v-if="error" class="bg-red-200 text-red-500 text-center border w-full p-4 mb-2 font-semibold rounded">{{ error }}</h3>
        <form v-on:submit="submit" class="space-y-3">
            <input v-model="name" type="text" name="name" placeholder="ชื่อผู้ใช้" class="w-full p-3 border rounded" required>
            <input v-model="email" type="email" name="email" placeholder="email" class="w-full p-3 border rounded" required>
            <button type="submit" class="bg-blue-500 text-white border w-full p-3 font-semibold rounded">แก้ไขโปรไฟล์</button>
            <NuxtLink to="/user/profile" class="text-gray-500  w-full font-semibold  flex justify-left text-xs">ย้อนกลับ</NuxtLink>
        </form>
    </div>
</template>