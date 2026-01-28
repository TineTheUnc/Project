<script setup>
useHead({
    title: 'แก้ไขข้อมูลเขต',
    bodyAttrs: {
        class: 'bg-gray-150 flex justify-center items-center min-h-screen'
    }
})

definePageMeta({ layout: 'form' })

const name = ref('')
const error = ref(null)

if (import.meta.client) {
    const token = localStorage.getItem('token')
    const id = useRoute().params.id
    const { data } = await $fetch('/api/admin/zone/' + id, {
        headers: { Authentication: 'App ' + token }
    })
    name.value = data.name
}

async function submit() {
    const token = localStorage.getItem('token')
    const id = useRoute().params.id

    const { message, status } = await $fetch('/api/admin/zone/' + id, {
        method: 'PUT',
        body: { name: name.value },
        headers: { Authentication: 'App ' + token }
    })

    if (status !== 200) {
        error.value = message
    } else {
        location.assign('/admin/zones')
    }
}
</script>

<template>
    <UCard class="w-80">
        <template #header>
            <h2 class="text-center text-lg font-semibold">
                แก้ไขข้อมูลเขต
            </h2>
        </template>

        <UAlert v-if="error" title="ผิดพลาด" :description="error" color="error" variant="soft" class="mb-4" />

        <UForm @submit.prevent="submit" class="space-y-4">
            <UFormField label="ชื่อเขต" required>
                <UInput v-model="name" placeholder="ชื่อเขต" autofocus class="w-full" color="neutral" />
            </UFormField>

            <UButton type="submit" color="primary" block class="hover:cursor-pointer">
                แก้ไข
            </UButton>

            <ULink to="/admin/zones" class="block text-xs text-gray-500 text-left">
                ← ย้อนกลับ
            </ULink>
        </UForm>
    </UCard>
</template>
