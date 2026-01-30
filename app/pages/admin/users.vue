<script setup>
import { h, resolveComponent } from 'vue'

useHead({ title: 'Admin' })

const UButton = resolveComponent('UButton')
const UFieldGroup = resolveComponent('UFieldGroup')

const users = ref([])
const error = ref(null)

const columns = [
  {
    accessorKey: 'id',
    header: '#'
  },
  {
    accessorKey: 'name',
    header: 'ชื่อ'
  },
  {
    accessorKey: 'email',
    header: 'อีเมล'
  },
  {
    accessorKey: 'role',
    header: 'บทบาท'
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => {
      const disabled = row.getValue("role") === 'admin'

      return h(
        UFieldGroup,
        {},
        [
          h(
            UButton,
            {
              size: 'xs',
              color: disabled ? 'neutral' : 'primary',
              variant: 'outline',
              disabled,
              class: "hover:cursor-pointer",
              onClick: () => edit(row.getValue("id"))
            },
            'แก้ไข'
          ),
          h(
            UButton,
            {
              size: 'xs',
              color: disabled ? 'neutral' : 'error',
              variant: 'outline',
              disabled,
              class: "hover:cursor-pointer",
              onClick: () => deletes(row.getValue("id"))
            },
            'ลบ'
          )
        ]
      )
    }
  }
]

if (import.meta.client) {
  const token = localStorage.getItem('token')
  const { data } = await $fetch('/api/admin/users', {
    headers: { Authentication: 'App ' + token }
  })
  users.value = data
}

function edit(id) {
  location.assign('/admin/user/edit/' + id)
}

async function deletes(id) {
  const token = localStorage.getItem('token')
  const { status, message } = await $fetch('/api/admin/user/' + id, {
    method: 'DELETE',
    headers: { Authentication: 'App ' + token }
  })

  if (status !== 200) {
    error.value = message
  } else {
    const { data } = await $fetch('/api/admin/users', {
      headers: { Authentication: 'App ' + token }
    })
    users.value = data
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto mt-6 px-4">
    <main>
      <UCard>
        <template #header>
          <h3 class="text-sm font-semibold">
            รายชื่อผู้ใช้
          </h3>
        </template>

        <UAlert
          v-if="error"
          title="ผิดพลาด"
          :description="error"
          color="error"
          variant="soft"
          class="mb-4"
        />

        <UTable
          :data="users"
          :columns="columns"
        />
      </UCard>
    </main>
  </div>
</template>
