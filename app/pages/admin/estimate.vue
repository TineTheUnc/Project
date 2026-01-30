<script setup>
useHead({
  title: 'ประเมินเจ้าหน้าที่',
  bodyAttrs: {
    class: 'bg-gray-150 flex justify-center items-center min-h-screen'
  }
})

definePageMeta({ layout: 'form' })

const route = useRoute()
const error = ref(null)
const users = ref([])
const selectedUser = ref(null)

const categories = [
  { key: 'diligence', label: 'ความขยัน' },
  { key: 'punctuality', label: 'ความตรงต่อเวลา' },
  { key: 'accuracy', label: 'ความแม่นยำในการทำงาน' },
  { key: 'responsibility', label: 'ความรับผิดชอบ' },
  { key: 'teamwork', label: 'การทำงานเป็นทีม' }
]

const scores = reactive({
  diligence: null,
  punctuality: null,
  accuracy: null,
  responsibility: null,
  teamwork: null
})

if (import.meta.client) {
  const token = localStorage.getItem('token')
  const { data } = await $fetch('/api/admin/staffs', {
    headers: { Authentication: 'App ' + token },
    method:'GET'
  })
  console.log(data);
  
  users.value = data
}
async function submit() {
  error.value = null

  const notFilled = Object.values(scores).some(v => v === null)
  if (notFilled) {
    error.value = 'กรุณาให้คะแนนครบทุกหมวด'
    return
  }

  const token = localStorage.getItem('token')

  const { status, message } = await $fetch(
    '/api/admin/evaluate/' + selectedUser.value,
    {
      method: 'POST',
      headers: { Authentication: 'App ' + token },
      body: { 
        scores: scores 
      }
    }
  )

  if (status !== 200) {
    error.value = message
  } else {
    navigateTo('/admin/estimates')
  }
}
</script>
<template>
  <UCard class="w-80">
    <template #header>
      <h2 class="text-center text-lg font-semibold">
        ประเมินเจ้าหน้าที่
      </h2>
    </template>

    <UAlert v-if="error" title="ผิดพลาด" :description="error" color="error" variant="soft" class="mb-4" />

    <UForm @submit.prevent="submit" class="space-y-5">
      <UFormField label="เจ้าหน้าที่" class=" text-sm text-center font-medium">
      <USelect
        v-model="selectedUser"
        :items="users"
        valueKey="id" labelKey="name"
        placeholder="เลือกเจ้าหน้าที่"
        class="w-full"
        color="neutral"
        required
      />
    </UFormField>
    <hr/>
      <div v-for="cat in categories" :key="cat.key" class="space-y-2">
        <p class="text-sm text-center font-medium">
          {{ cat.label }}
        </p>
        
        <URadioGroup class="flex items-center justify-center mb-2" orientation="horizontal" v-model="scores[cat.key]"
          :items="[
            { label: 'ปรับปรุง', value: -1 },
            { label: 'พอใช้', value: 0 },
            { label: 'ดีเยี่ยม', value: 1 }
          ]" />
      </div>

      <UButton type="submit" color="primary" class="hover:cursor-pointer" block>
        บันทึกการประเมิน
      </UButton>

      <ULink to="/admin/estimates" class="block text-xs text-gray-500 hover:cursor-pointer">
        ← ย้อนกลับ
      </ULink>
    </UForm>
  </UCard>
</template>
