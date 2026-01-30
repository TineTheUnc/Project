<script setup>
import { h, resolveComponent } from 'vue'

useHead({ title: 'Admin' })

const UButton = resolveComponent('UButton')

const estimates = ref([])
const error = ref(null)
const today = new Date()
const year = ref(today.getFullYear())
const columns = [
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
  }
]

const fetchEvaluates = async () => {
  const token = localStorage.getItem('token')
  estimates.value = null
  try {
    const { data } = await $fetch('/api/admin/evaluates?year='+year.value, {
    headers: { Authentication: 'App ' + token },
    method:'GET'
    })
    console.log(data);
    
    if (data?.length) estimates.value = data
  } catch (e) {
    console.error('โหลดไม่สำเร็จ', e)
  } 
}


if (import.meta.client) {
  const token = localStorage.getItem('token')
  const { data } = await $fetch('/api/admin/evaluates?year='+year.value, {
    headers: { Authentication: 'App ' + token },
    method:'GET'
  })
  estimates.value = data
}
watch(year, fetchEvaluates)
</script>

<template>
  <div class="max-w-7xl mx-auto mt-6 px-4">
    <div class="flex justify-center mb-4">
      <UInput
      v-model="year"
      type="number"
      min="2000"
      max="2100"
      placeholder="YYYY"
      />
    </div>
    <main>
      <UCard>
        <template #header>
          <h3 class="text-sm font-semibold mb-2">
            ประเมิน
          </h3>
          <UButton v-on:click="navigateTo('/admin/estimate')" class="hover:cursor-pointer" type="submit" color="primary" block>
            เพิ่ม
          </UButton>
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
          v-if="estimates"
          :data="estimates"
          :columns="columns"
        />

        <h2 v-else class="text-center py-10 text-gray-500">
          ไม่มีข้อมูลในปีเลือก
        </h2>
      </UCard>
    </main>
  </div>
</template>
