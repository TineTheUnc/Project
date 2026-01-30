<script setup>
useHead({ title: 'estimates' })


const em = ref([])
const error = ref(null)

const columns = [
  {
    accessorKey: 'id',
    header: '#'
  },
  {
    accessorKey: 'data',
    header: 'คะแนนรวม',
     cell:({ row }) =>{
      const count = Number(Object.values(row.getValue("data")).reduce((a, b) => a + b, 0))
      let star = ""
      for (let index = 0; index < count; index++) {
        star += "⭐"
      }
      return  star
    }
  },
  {
    accessorKey: 'data',
    header: 'ความขยัน',
     cell:({ row }) =>{
      return  row.getValue("data").diligence ? "⭐" : ""
    }
  },
  {
    accessorKey: 'data',
    header: 'ความตรงต่อเวลา',
     cell:({ row }) =>{
      return  row.getValue("data").punctuality ? "⭐" : ""
    }
  },
  {
    accessorKey: 'data',
    header: 'ความแม่นยำในการทำงาน',
     cell:({ row }) =>{
      return  row.getValue("data").accuracy ? "⭐" : ""
    }
  },
  {
    accessorKey: 'data',
    header: 'ความรับผิดชอบ',
     cell:({ row }) =>{
      return  row.getValue("data").responsibility ? "⭐" : ""
    }
  },
  {
    accessorKey: 'data',
    header: 'การทำงานเป็นทีม',
     cell:({ row }) =>{
      return  row.getValue("data").teamwork ? "⭐" : ""
    }
  },
  {
    accessorKey: 'create',
    header: 'วันประเมิน'
  }
]

if (import.meta.client) {
  const token = localStorage.getItem('token')
  const { data } = await $fetch('/api/staff/evaluate', {
    headers: { Authentication: 'App ' + token },
    method: "GET"
  })
  em.value = data
}
</script>

<template>
  <div class="max-w-7xl mx-auto mt-6 px-4">
    <main>
      <UCard>
        <template #header>
          <h3 class="text-sm font-semibold">
            การประเมิน
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
          :data="em"
          :columns="columns"
        />
      </UCard>
    </main>
  </div>
</template>
