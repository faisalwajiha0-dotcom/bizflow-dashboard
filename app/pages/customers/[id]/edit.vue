```vue
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

const {
  customers,
  loadCustomers,
  updateCustomer
} = useCustomers()

const customerId = Number(route.params.id)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  location: '',
  orders: 0,
  totalSpent: 0,
  joined: '',
  status: 'Active' as 'Active' | 'Inactive',
  initials: ''
})

const errorMessage = ref('')

onMounted(() => {
  loadCustomers()

  const customer = customers.value.find(
    item => item.id === customerId
  )

  if (!customer) {
    return
  }

  form.name = customer.name
  form.email = customer.email
  form.phone = customer.phone
  form.location = customer.location
  form.orders = customer.orders
  form.totalSpent = customer.totalSpent
  form.joined = customer.joined
  form.status = customer.status
  form.initials = customer.initials
})

const saveChanges = () => {
  errorMessage.value = ''

  if (
    !form.name.trim()
    || !form.email.trim()
    || !form.phone.trim()
    || !form.location.trim()
  ) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  const initials = form.name
    .trim()
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const success = updateCustomer(customerId, {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    location: form.location.trim(),
    orders: Number(form.orders),
    totalSpent: Number(form.totalSpent),
    joined: form.joined,
    status: form.status,
    initials
  })

  if (!success) {
    errorMessage.value = 'Customer not found.'
    return
  }

  toast.add({
    title: 'Customer Updated Successfully',
    description: `${form.name} has been updated.`,
    color: 'success'
  })

  router.push(`/customers/${customerId}`)
}
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-6 sm:px-8 lg:px-10">
    <div class="mb-8">
      <div class="mb-3 flex items-center gap-2 text-sm font-medium text-[#2879D8]">
        <span class="h-2 w-2 rounded-full bg-[#4D93E8]" />
        Customer Management
      </div>

      <h1 class="text-3xl font-bold tracking-tight text-[#173B63] sm:text-4xl">
        Edit Customer
      </h1>

      <p class="mt-2 text-sm text-slate-500">
        Update customer information and account details.
      </p>
    </div>

    <div class="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <form
        class="p-6 sm:p-8"
        @submit.prevent="saveChanges">
        <div
          v-if="errorMessage"
          class="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {{ errorMessage }}
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Customer Name
            </label>

            <input
              v-model="form.name"
              type="text"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Email Address
            </label>

            <input
              v-model="form.email"
              type="email"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Phone Number
            </label>

            <input
              v-model="form.phone"
              type="text"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <div class="sm:col-span-2">
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Location
            </label>

            <input
              v-model="form.location"
              type="text"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Status
            </label>

            <select
              v-model="form.status"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] focus:bg-white">
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Total Spent
            </label>

            <input
              v-model.number="form.totalSpent"
              type="number"
              min="0"
              step="0.01"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Total Orders
            </label>

            <input
              v-model.number="form.orders"
              type="number"
              min="0"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>
        </div>

        <div class="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
          <NuxtLink
            :to="`/customers/${customerId}`"
            class="inline-flex justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
            Cancel
          </NuxtLink>

          <button
            type="submit"
            class="inline-flex justify-center rounded-xl bg-[#2879D8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-[#174A78]">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
```
