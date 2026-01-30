<script setup>
useHead({
    title: "เข้าสู่ระบบ",
    bodyAttrs: {
        class: "bg-gray-150 flex justify-center items-center min-h-screen"
    }
})
definePageMeta({ layout: 'form' })
const email = ref(null)
const password = ref(null)
const error = ref(null)
async function submit(event) {
    event.preventDefault()
    const { data, message, status } = await $fetch("/api/login", {
        method: 'POST',
        body: {
            email: email.value,
            password: password.value
        }
    })
    if (data) {
        localStorage.setItem("token", data)
        location.assign("/")
    } else {
        error.value = message
    }
}
</script>
<template>
    <UCard class="w-100">
        <template #header>
            <h2 class="text-xl font-semibold text-center">
                เข้าสู่ระบบ
            </h2>
        </template>

        <UAlert v-if="error" color="error" variant="soft" title="ผิดพลาด" :description="error" />
        <UForm @submit="submit" color="neutral" class="space-y-3">
            <UFormField label="อีเมล">
                <UInput v-model="email" color="neutral" type="email" placeholder="email" class="w-full" required />
            </UFormField>

            <UFormField label="รหัสผ่าน">
                <UInput v-model="password" color="neutral" type="password" placeholder="รหัสผ่าน" class="w-full" required />
            </UFormField>
            
            <UButton type="submit" color="neutral" class="w-full text-center font-semibold hover:cursor-pointer" block>
                เข้าสู่ระบบ
            </UButton>

            <div class="text-center">
                <ULink to="/register" color="neutral" class="font-semibold">
                    สมัครสมาชิก
                </ULink>
            </div>

            <ULink to="/" color="gray" class="text-xs font-semibold">
                ← ย้อนกลับ
            </ULink>
        </UForm>
    </UCard>

</template>