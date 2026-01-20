<script setup>
    const role = ref(null)
    if (import.meta.client){
        const token = localStorage.getItem('token')
        if (token){
            const {data} = await $fetch("/api/user/me",{
            method:"GET",
            headers:{
                "Authentication": "App "+token
                }
            })
            
            if (data){
                role.value = data.role
            }
            console.log(role.value );
        }
        
        
    }
</script>

<template>
    <Header>
        <template #page>
            <NuxtLink to="/" class="font-semibold text-3xl mr-6">Home</NuxtLink>
            <NuxtLink  v-show="role == 'user' || role == 'staff' || role == 'admin'" to="/user/weather" class="font-semibold text-sm mr-4">ข้อมูลสภาพอากาศ</NuxtLink>
            <NuxtLink  v-show="role == 'staff'" to="/staff/weathers" class="font-semibold text-sm mr-4">จัดการข้อมูลสภาพอากาศ</NuxtLink>
            <NuxtLink  v-show="role == 'admin'" to="/admin/zones" class="font-semibold text-sm mr-4">จัดการข้อมูลโซน</NuxtLink>
            <NuxtLink  v-show="role == 'admin'" to="/admin/users" class="font-semibold text-sm mr-4">จัดการข้อมูลผู้ใช้</NuxtLink>
        </template>
    </Header>
    <slot/>
</template>