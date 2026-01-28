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
    <UCard class="w-100">
        <template #header>
            <h2 class="font-semibold text-center text-xl  mb-2">สมัครสมาชิก</h2>
        </template>
        <UAlert v-if="error" color="error" variant="soft" title="ผิดพลาด" :description="error" />
        <UForm @submit="submit" color="neutral" class="space-y-3">
            <UFormField label="ชื่อผู้ใช้">
                <UInput v-model="name" color="neutral" type="text" placeholder="ชื่อผู้ใช้" class="w-full" required />
            </UFormField>
            <UFormField label="อีเมล">
                <UInput v-model="email" color="neutral" type="email" placeholder="email" class="w-full" required />
            </UFormField>
            <UFormField label="รหัสผ่าน">
                <UInput v-model="password" color="neutral" type="password" placeholder="รหัสผ่าน" class="w-full" required />
            </UFormField>
            <UFormField label="ยืนยันรหัสผ่าน">
                <UInput v-model="con_password" color="neutral" type="password" placeholder="ยืนยันรหัสผ่าน" class="w-full" required />
            </UFormField>
            <UButton  type="submit" color="neutral" class="w-full text-center font-semibold hover:cursor-pointer" block>
                สมัครสมาชิก
            </UButton>
            <div class="text-center">
                <ULink to="/login" color="blue" class="font-semibold">
                    เข้าสู่ระบบ
                </ULink>
            </div>
            <ULink to="/" color="gray" class="text-xs font-semibold">
                ← ย้อนกลับ
            </ULink>
        </UForm>
    </UCard>
</template>