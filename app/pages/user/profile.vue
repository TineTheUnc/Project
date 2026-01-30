<script setup>
useHead({
    title: 'โปรไฟล์ผู้ใช้'
})

const user = ref({})
function getavatarUrl() {
    if (!user.value.avatar) return null
    return user.value.avatar 
}

if (import.meta.client) {
    const token = localStorage.getItem('token')
    const { data } = await $fetch('/api/user/me', {
        headers: {
            Authentication: 'App ' + token
        }
    })
    
    if (data) {
        user.value = data
    }
}
</script>

<template>
    <UCard class="max-w-md mx-auto mt-10 shadow-lg">
        <template #header>
            <h1 class="text-xl font-semibold">
                โปรไฟล์ผู้ใช้
            </h1>
        </template>

        <div class="space-y-4">
            <!-- avatar -->
            <div class="flex justify-center mt-4">
                <UAvatar
                    size="3xl"
                    :src="getavatarUrl()"
                    :label="user.name"
                    class="mx-auto"
                />
            </div>

            <UFormField label="ชื่อผู้ใช้">
                {{ user.name }}
            </UFormField>

            <UFormField label="อีเมล">
                {{ user.email }}
            </UFormField>

            <UFormField label="สิทธิ์">
                {{ user.role }}
            </UFormField>
        </div>

        <template #footer>
            <div class="flex justify-center">
                <UButton
                    to="/user/profileEdit"
                    color="neutral"
                    variant="solid"
                    class="hover:cursor-pointer"
                >
                    แก้ไขโปรไฟล์
                </UButton>
            </div>
        </template>
    </UCard>
</template>
