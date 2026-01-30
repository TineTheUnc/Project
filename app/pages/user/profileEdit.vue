<script setup>
useHead({
    title: 'แก้ไขโปรไฟล์ผู้ใช้',
    bodyAttrs: {
        class: 'bg-gray-150 flex justify-center items-center min-h-screen'
    }
})

definePageMeta({ layout: 'form' })

const name = ref('')
const email = ref('')
const avatar = ref(null)
const error = ref(null)

if (import.meta.client) {
    const token = localStorage.getItem('token')
    const { data } = await $fetch('/api/user/me', {
        headers: { Authentication: 'App ' + token }
    })

    name.value = data.name
    email.value = data.email
}

async function submit() {
    const token = localStorage.getItem('token')

    const form = new FormData()
    form.append('name', name.value)
    form.append('email', email.value)
    if (avatar.value) {
        form.append('avatar', avatar.value)
    }

    const { status, message, data } = await $fetch('/api/user/me', {
        method: 'PUT',
        body: form,
        headers: {
            Authentication: 'App ' + token
        }
    })

    if (status !== 200) {
        error.value = message
    } else {
        localStorage.setItem('token', data)
        location.assign('/user/profile')
    }
}
</script>

<template>
    <UCard class="w-96">
        <template #header>
            <h2 class="text-center text-lg font-semibold">
                แก้ไขโปรไฟล์ผู้ใช้
            </h2>
        </template>

        <UAlert
            v-if="error"
            title="ผิดพลาด"
            :description="error"
            color="error"
            variant="soft"
            class="mb-4"
        />

        <UForm @submit.prevent="submit" class="space-y-4">


            <UFormField label="ชื่อผู้ใช้" required>
                <UInput
                    v-model="name"
                    color="neutral"
                    placeholder="ชื่อผู้ใช้"
                    class="w-full"
                />
            </UFormField>

            <UFormField label="อีเมล" required>
                <UInput
                    v-model="email"
                    color="neutral"
                    type="email"
                    placeholder="email"
                    class="w-full"
                />
            </UFormField>

            <UFormField label="รูปโปรไฟล์">
                <UFileUpload 
                    color="neutral"
                    accept="image/*"
                    v-model="avatar"
                    placeholder="เลือกรูปโปรไฟล์"
                    class="w-full"
                />
            </UFormField>

            <UButton
                type="submit"
                color="primary"
                block
                class="hover:cursor-pointer"
            >
                บันทึกข้อมูล
            </UButton>

            <ULink
                to="/user/profile"
                class="text-xs text-gray-500"
            >
                ← ย้อนกลับ
            </ULink>
        </UForm>
    </UCard>
</template>
