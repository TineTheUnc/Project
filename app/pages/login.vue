<script setup >
    useHead({
        title:"เข้าสู่ระบบ",
        bodyAttrs:{
            class:"bg-gray-150 flex justify-center items-center min-h-screen"
        }
    })
    definePageMeta({ layout: 'form' })
    const email = ref(null)
    const password = ref(null)
    const error = ref(null)
    async function submit(event) {
        event.preventDefault()
        const {data, message, status} = await $fetch("/api/login",{
            method:'POST',
            body:{
                email:email.value,
                password:password.value
            }
        })
        if (data){
            localStorage.setItem("token",data)
            location.assign("/")
        }else{
            error.value = message
        }
    }
</script>
<template>
    <div class="bg-white rounded-lg shadow p-6 w-80">
        <h2 class="font-semibold text-center text-xl  mb-2">เข้าสู่ระบบ</h2>
        <h3 v-if="error" class="bg-red-200 text-red-500 text-center border w-full p-4 mb-2 font-semibold rounded">{{ error }}</h3>
        <form v-on:submit="submit" class="space-y-3">
            <input v-model="email" type="email" name="email" placeholder="email" class="w-full p-3 border rounded" required>
            <input v-model="password" type="password" name="password" placeholder="รหัสผ่าน" class="w-full p-3 border rounded" required>
            <button type="submit" class="bg-blue-500 text-white border w-full p-3 font-semibold rounded">เข้าสู่ระบบ</button>
            <NuxtLink to="/register" class="text-blue-500  w-full p-3 font-semibold  flex justify-center">สมัครสมาชิก</NuxtLink>
            <NuxtLink to="/" class="text-gray-500  w-full font-semibold  flex justify-left text-xs">ย้อนกลับ</NuxtLink>
        </form>
    </div>
</template>