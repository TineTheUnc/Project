<script setup >
    useHead({
        title:"สมัครสมาชิก",
        bodyAttrs:{
            class:"bg-gray-150 flex justify-center items-center min-h-screen"
        }
    })
    definePageMeta({ layout: 'form' })
    const name = ref(null)
    const email = ref(null)
    const password = ref(null)
    const con_password = ref(null)
    const error = ref(null)
    async function submit(event) {
        event.preventDefault()
        console.log("tes");
        
        if (password.value != con_password.value) return error.value = "โปรดใส่รหัสผ่านให้ตรงกัน"
        const {message, status} = await $fetch("/api/register",{
            method:'POST',
            body:{
                name:name.value,
                email:email.value,
                password:password.value
            }
        })
        if (status == 200){
            location.assign("/login")
        }else{
            error.value = message
        }
    }
</script>
<template>
    <div class="bg-white rounded-lg shadow p-6 w-80">
        <h2 class="font-semibold text-center text-xl  mb-2">สมัครสมาชิก</h2>
        <h3 v-if="error" class="bg-red-200 text-red-500 text-center border w-full p-4 mb-2 font-semibold rounded">{{ error }}</h3>
        <form v-on:submit="submit" class="space-y-3">
            <input v-model="name" type="name" name="name" placeholder="ชื่อผู้ใช้" class="w-full p-3 border rounded" required>
            <input v-model="email" type="email" name="email" placeholder="email" class="w-full p-3 border rounded" required>
            <input v-model="password" type="password" name="password" placeholder="รหัสผ่าน" class="w-full p-3 border rounded" required>
            <input v-model="con_password" type="password" name="com_password" placeholder="ยืนยันรหัสผ่าน" class="w-full p-3 border rounded" required>
            <button type="submit" class="bg-blue-500 text-white border w-full p-3 font-semibold rounded">สมัครสมาชิก</button>
            <NuxtLink to="/login" class="text-blue-500  w-full p-3 font-semibold  flex justify-center">เข้าสู่ระบบ</NuxtLink>
            <NuxtLink to="/" class="text-gray-500  w-full font-semibold  flex justify-left text-xs">ย้อนกลับ</NuxtLink>
        </form>
    </div>
</template>