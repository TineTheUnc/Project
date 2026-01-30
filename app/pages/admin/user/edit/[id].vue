<script setup>
useHead({
    title: 'แก้ไขข้อมูลผู้ใช้',
    bodyAttrs: {
        class: 'bg-gray-150 flex justify-center items-center min-h-screen'
    }
})

definePageMeta({ layout: 'form' })

const name = ref('')
const email = ref('')
const role = ref('user')
const error = ref(null)

if (import.meta.client) {
    const token = localStorage.getItem('token')
    const id = useRoute().params.id

    const { data } = await $fetch('/api/admin/user/' + id, {
        headers: { Authentication: 'App ' + token }
    })

    name.value = data.name
    email.value = data.email
    role.value = data.role
}

async function submit() {

    try {
        const token = localStorage.getItem('token')
        const id = useRoute().params.id

        const { status, message } = await $fetch('/api/admin/user/' + id, {
            method: 'PUT',
            body: {
                name: name.value,
                email: email.value,
                role: role.value
            },
            headers: { Authentication: 'App ' + token }
        })

        if (status !== 200) {
            error.value = message
        } else {
            location.assign('/admin/users')
        }
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <UCard class="w-96">
        <template #header>
            <h2 class="text-center text-lg font-semibold">
                แก้ไขข้อมูลผู้ใช้
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
                    placeholder="ชื่อผู้ใช้"
                    autofocus
                    color="neutral"
                    class="w-full"
                />
            </UFormField>

            <UFormField label="อีเมล" required>
                <UInput
                    v-model="email"
                    type="email"
                    placeholder="email"
                    color="neutral"
                    class="w-full"
                />
            </UFormField>

            <UFormField label="สิทธิ์ผู้ใช้" required>
                <USelect
                    v-model="role"
                    :items="[
                        { label: 'User', value: 'user' },
                        { label: 'Staff', value: 'staff' },
                        { label: 'Admin', value: 'admin' }
                    ]"
                    valueKey="value" labelKey="label"
                    color="neutral"
                    class="w-full"
                />
            </UFormField>

            <UButton
                type="submit"
                color="primary"
                block
                class="hover:cursor-pointer"
            >
                แก้ไข
            </UButton>

            <ULink to="/admin/users" class="block text-xs text-gray-500 text-left">
                ← ย้อนกลับ
            </ULink>
        </UForm>
    </UCard>
</template>
