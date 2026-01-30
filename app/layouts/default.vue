<script setup lang="ts">
    import type { NavigationMenuItem } from '@nuxt/ui'
    const items1 = ref<NavigationMenuItem[]>([])
    function logout(){
        localStorage.clear()
        location.assign("/login")
    }
    const login = ref(false)
    if (import.meta.client){
        const token = localStorage.getItem('token')
        login.value = !!token
        if (token){
            const {data} = await $fetch("/api/user/me",{
            method:"GET",
            headers:{
                "Authentication": "App "+token
                }
            })
            
            if (data){
                const role = data.role
                items1.value.push({
                    label: "ข้อมูลสภาพอากาศ",
                    to: "/user/weather",
                })
                if (role == 'staff'){
                    items1.value.push({
                        label: "จัดการข้อมูลสภาพอากาศ",
                        to: "/staff/weathers",
                    })
                    items1.value.push({
                        label: "ผลการประเมิน",
                        to: "/staff/estimates",
                    })
                }else if (role == 'admin'){
                    items1.value.push({
                        label: "จัดการข้อมูลโซน",
                        to: "/admin/zones",
                    })
                    items1.value.push({
                        label: "จัดการข้อมูลผู้ใช้",
                        to: "/admin/users",
                    })
                    items1.value.push({
                        label: "ประเมินเจ้าหน้าที่",
                        to: "/admin/estimates",
                    })
                }        
            }
        }
    }
</script>

<template>
    <UHeader title="Home">
        <UNavigationMenu color="neutral" :items="items1"/>
        <template #body>
            <UNavigationMenu color="neutral" :items="items1" orientation="vertical" class="-mx-2.5" />
        </template>
        <template #right>
            <UColorModeButton /> 
            <UButton class="hover:cursor-pointer" v-if="!login" to="/login" color="neutral" >เข้าสู่ระบบ</UButton>
            <UButton class="hover:cursor-pointer" v-if="!login" to="/register" color="neutral" >สมัครสมาชิก</UButton>
            <UButton class="hover:cursor-pointer" v-if="login" to="/user/profile" color="neutral" >โปรไฟล์</UButton>
            <UButton class="hover:cursor-pointer" v-if="login" v-on:click="logout" color="neutral" >ออกจากระบบ</UButton>
        </template>
    </UHeader>
    <slot/>
</template>