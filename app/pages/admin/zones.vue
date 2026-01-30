<script setup>
import { h,resolveComponent } from 'vue'

useHead({ title: 'Admin' })

const UButton = resolveComponent('UButton')
const UFieldGroup = resolveComponent('UFieldGroup')

const zones = ref([])
const zone = ref('')
const error = ref(null)

const columns = [
  {
    accessorKey: 'id',
    header: '#'
  },
  {
    accessorKey: 'name',
    header: 'ชื่อเขต'
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => h(UFieldGroup,[
        h(UButton,
          {
            size: 'xs',
            color: 'primary',
            variant: 'outline',
            class: "hover:cursor-pointer",
            onClick: () => edit(row.getValue("id"))
          },'แก้ไข'
        ),
        h(UButton,
          {
            size: 'xs',
            color: 'error',
            variant: 'outline',
            class: "hover:cursor-pointer",
            onClick: () => deletes(row.getValue("id"))
          },'ลบ'
        )
        ]
    )
  }
]

if (import.meta.client) {
  const token = localStorage.getItem('token')
  const { data } = await $fetch('/api/zone', {
    headers: { Authentication: 'App ' + token }
  })
  zones.value = data
}

async function add() {
  const token = localStorage.getItem('token')
  const { status, message } = await $fetch('/api/admin/zone', {
    method: 'POST',
    body: { name: zone.value },
    headers: { Authentication: 'App ' + token }
  })

  if (status !== 200) {
    error.value = message
  } else {
    zone.value = ''
    const { data } = await $fetch('/api/zone', {
      headers: { Authentication: 'App ' + token }
    })
    zones.value = data
  }
}

function edit(id) {
  location.assign('/admin/zone/edit/' + id)
}

async function deletes(id) {
  const token = localStorage.getItem('token')
  const { status, message } = await $fetch('/api/admin/zone/' + id, {
    method: 'DELETE',
    headers: { Authentication: 'App ' + token }
  })

  if (status !== 200) {
    error.value = message
  } else {
    const { data } = await $fetch('/api/zone', {
      headers: { Authentication: 'App ' + token }
    })
    zones.value = data
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto mt-6 px-4">
    <main>
      <UCard>
        <template #header>
          <h3 class="text-sm font-semibold">
            รายชื่อเขต
          </h3>
        </template>

        <UAlert
          v-if="error"
          title="ผิดพลาด" :description="error"
          color="error"
          variant="soft"
          class="mb-4"
        />

        <div class="space-y-4">
          <!-- controls -->
          <div class="flex flex-wrap items-center gap-2">
            <UFormField
              label="พื้นที่"
              orientation="horizontal"
            >
              <UInput
                color="neutral"
                v-model="zone"
                placeholder="ชื่อเขต"
                class="w-48"
              />
            </UFormField>

            <UButton
              color="neutral"
              variant="solid"
              class="hover:cursor-pointer"
              @click="add"
            >
              เพิ่มเขต
            </UButton>
          </div>

          <!-- table -->
          <UTable
            :data="zones"
            :columns="columns"
          />
        </div>
      </UCard>
    </main>
  </div>
</template>
