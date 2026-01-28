<script setup>
import { h, resolveComponent } from 'vue'

useHead({
    title: "Weather"
})

const UButton = resolveComponent("UButton")
const UFieldGroup = resolveComponent("UFieldGroup")
const rain = ref(null)
const zones = ref("")
const persent = ref("")
const Izone = ref("")
const error = ref(null)
const columns = [
    {
        accessorKey: 'id',
        header: '#',
    },
    {
        accessorKey: 'persent',
        header: 'ปริมาณน้ำฝน',
    },
    {
        accessorKey: 'zone',
        header: 'พื้นที่',
    },
    {
        accessorKey: 'by',
        header: 'ผู้กรอก',
    },
    {
        accessorKey: 'create',
        header: 'วันที่',
    },
    {
        accessorKey: 'id',
        header: '',
        cell: ({ row }) => h(UFieldGroup, [
            h(UButton, {
                size: "xs",
                color: "primary",
                variant: "outline",
                id: row.original.id,
                class: "hover:cursor-pointer",
                onClick: () => edit(row.getValue("id"))
            }, "แก้ไข"),
            h(UButton, {
                size: "xs",
                color: "error",
                variant: "outline",
                id: row.original.id,
                class: "hover:cursor-pointer",
                onClick: () => deletes(row.getValue("id"))
            }, "ลบ")
        ]
        )
    }
]
if (import.meta.client) {
    const token = localStorage.getItem("token")
    const { data: data1 } = await $fetch("/api/staff/rain", {
        headers: {
            "Authentication": "App " + token
        }
    })
    rain.value = data1
    const { data: data2 } = await $fetch("/api/zone", {
        headers: {
            "Authentication": "App " + token
        }
    })
    zones.value = data2
}

async function add(event) {
    const token = localStorage.getItem("token")
    const { message, status } = await $fetch("/api/staff/rain", {
        method: "POST",
        body: {
            persent: persent.value,
            zone: Izone.value
        },
        headers: {
            "Authentication": "App " + token
        }
    })
    if (status != 200) error.value = message;
    else {
        const { data } = await $fetch("/api/staff/rain", {
            headers: {
                "Authentication": "App " + token
            }
        })
        rain.value = data
    }
}

async function edit(id) {
    location.assign("/staff/weather/edit/" + id)
}

async function deletes(id) {
    const token = localStorage.getItem("token")
    const { message, status } = await $fetch("/api/staff/rain/" + id, {
        method: "delete",
        headers: {
            "Authentication": "App " + token
        }
    })
    if (status != 200) error.value = message;
    else {
        const { data } = await $fetch("/api/staff/rain", {
            headers: {
                "Authentication": "App " + token
            }
        })
        rain.value = data
    }
}
</script>

<template>
    <div class="max-w-7xl mx-auto flex items-start gap-6 mt-6 px-4">
        <main class="flex-1">
            <UCard>
                <template #header>
                    <h3 class="text-sm font-semibold">
                        รายชื่อ
                    </h3>
                </template>

                <UAlert v-if="error" title="ผิดพลาด" :description="error" color="error" variant="soft" class="mb-4" />

                <div class="overflow-x-auto space-y-4">
                    <!-- controls -->
                    <div class="flex flex-wrap items-center gap-2">
                        <UFormField label="ปริมาณน้ำฝน" orientation="horizontal">
                            <UInput color="neutral" v-model="persent" type="number" min="0" max="100" class="w-32" />
                        </UFormField>

                        <UFormField label="พื้นที่" color="neutral" orientation="horizontal">
                            <USelectMenu color="neutral" v-model="Izone" :items="zones" class="w-50" valueKey="id" labelKey="name"  />
                        </UFormField>
                        <UButton color="neutral" class="hover:cursor-pointer" variant="solid" @click="add">
                            เพิ่ม
                        </UButton>
                    </div>

                    <!-- table -->
                    <UTable :data="rain" :columns="columns" class="flex-1" />
                </div>
            </UCard>
        </main>
    </div>
</template>