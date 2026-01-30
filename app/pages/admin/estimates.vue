<script setup>
import { h, resolveComponent } from 'vue'

useHead({ title: 'Admin' })

const UButton = resolveComponent('UButton')

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
    accessorKey: 'estimate',
    header: 'คะแนน',
     cell:({ row }) =>{
      const count = Number(Object.values(row.getValue("estimate")).reduce((a, b) => a + b, 0))
      let star = ""
      for (let index = 0; index < count; index++) {
        star += "⭐"
      }
      return  star
    }
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => {


      return h(
            UButton,
            {
              size: 'xs',
              color: 'primary',
              variant: 'outline',
              class: "hover:cursor-pointer",
              onClick: () => estimate(row.getValue("id"))
            },
            'ประเมิน'
          )
    }
  }
]

if (import.meta.client) {
  const token = localStorage.getItem('token')
  const { data } = await $fetch('/api/admin/staffs', {
    headers: { Authentication: 'App ' + token }
  })
  users.value = data
}

function estimate(id) {
  location.assign('/admin/estimate/' + id)
}

</script>

<template>
  <div class="max-w-7xl mx-auto mt-6 px-4">
    <main>
      <UCard>
        <template #header>
          <h3 class="text-sm font-semibold">
            รายชื่อเจ้าหน้าที่
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
