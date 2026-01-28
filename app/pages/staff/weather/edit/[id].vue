<script setup>
useHead({
    title: "แก้ไขข้อมูลสภาพอากาศ",
    bodyAttrs: {
        class: "bg-gray-150 flex justify-center items-center min-h-screen"
    }
})
definePageMeta({ layout: 'form' })
const persent = ref(null)
const zone = ref(null)
const zones = ref([])
const error = ref(null)
if (import.meta.client) {
    const token = localStorage.getItem("token")
    const id = useRoute().params.id
    const { data: data2 } = await $fetch("/api/zone", {
        headers: {
            "Authentication": "App " + token
        }
    })
    
    zones.value = data2
    
    const { data } = await $fetch("/api/staff/rain/" + id, {
        method: "GET",
        headers: {
            "Authentication": "App " + token
        }
    })
    persent.value = data.persent
    zone.value = data.zone
}
async function submit(event) {
    event.preventDefault()
    const token = localStorage.getItem("token")
    const id = useRoute().params.id
    const { message, status } = await $fetch("/api/staff/rain/" + id, {
        method: "PUT",
        body: {
            persent: persent.value,
            zone: zone.value
        },
        headers: {
            "Authentication": "App " + token
        }
    })
    if (status != 200) {
        error.value = message
    } else {
        location.assign("/staff/weathers")
    }
}
</script>
<template>
    <UCard class="w-100">
        <template #header>
            <h2 class="font-semibold text-center text-xl  mb-2">แก้ไขข้อมูลเขต</h2>
        </template>
        <UAlert v-if="error" title="ผิดพลาด" :description="error" color="error" variant="soft" class="mb-4" />
        <UForm v-on:submit="submit" class="space-y-3">
            <UFormField label="ปริมาณน้ำฝน" class="w-full text-center">
                <UInput color="neutral" v-model="persent" type="persent" name="persent" placeholder="ปริมาณน้ำฝน"
                    class="w-full" required />
            </UFormField>
            <UFormField label="พื้นที่" color="neutral" class="w-full text-center">
                <USelectMenu color="neutral" v-model="zone" :items="zones" class="w-full" valueKey="id" labelKey="name"  />
            </UFormField>
            <UButton type="submit" color="neutral" class="w-full text-center font-semibold hover:cursor-pointer" block>
                แก้ไข
            </UButton>
            <ULink to="/staff/weathers" color="gray" class="text-xs font-semibold">
                ← ย้อนกลับ
            </ULink>
        </UForm>
    </UCard>
</template>