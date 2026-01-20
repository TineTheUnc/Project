<script setup>
    const login = ref(false)
    if (import.meta.client){
     const token = localStorage.getItem('token')
     login.value = !!token
    }
    function logout(){
        localStorage.clear()
        location.assign("/login")
    }
</script>

<template>
    <header class="bg-black text-white">
        <div class="max-w-7xl mx-auto flex justify-between items-center px-4 h-14">
            <div class="flex items-center gap-6">
                <slot name="page"/>
            </div>
            <div class="flex items-center gap-3">
                <NuxtLink v-if="!login" to="/login" class="bg-white text-black px-4 py-1.5 font-semibold shadow rounded">เข้าสู่ระบบ</NuxtLink>
                <NuxtLink v-if="!login" to="/register" class="bg-white text-black px-4 py-1.5 font-semibold shadow rounded">สมัครสมาชิก</NuxtLink>
                <NuxtLink v-if="login" to="/user/profile" class="bg-white text-black px-4 py-1.5 font-semibold shadow rounded">โปรไฟล์</NuxtLink>
                <button v-if="login" v-on:click="logout"  class="bg-white text-black px-4 py-1.5 font-semibold shadow rounded">ออกจากระบบ</button>
            </div>
        </div>
    </header>
</template>