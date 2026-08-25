```vue
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()

const { customers, loadCustomers } = useCustomers()

onMounted(() => {
  loadCustomers()
})

const customer = computed(() => {
  return customers.value.find(
    item => item.id === Number(route.params.id)
  )
})

const goBack = () => {
  router.push('/customers')
}
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-6 sm:px-8 lg:px-10">
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="mb-3 flex items-center gap-2 text-sm font-medium text-[#2879D8]">
          <span class="h-2 w-2 rounded-full bg-[#4D93E8]" />
          Customer Management
        </div>

        <h1 class="text-3xl font-bold tracking-tight text-[#173B63] sm:text-4xl">
          Customer Details
        </h1>

        <p class="mt-2 text-sm text-slate-500">
          View customer information and activity.
        </p>
      </div>

      <div class="flex gap-3">
        <NuxtLink
          to="/customers"
          class="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
          Back
        </NuxtLink>

        <NuxtLink
          v-if="customer"
          :to="`/customers/${customer.id}/edit`"
          class="rounded-xl bg-[#2879D8] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-[#174A78]">
          Edit Customer
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="customer"
      class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div class="bg-linear-to-r from-[#174A78] via-[#1F5C91] to-[#2879D8] px-6 py-10 sm:px-8">
        <div class="flex flex-col items-center gap-4 sm:flex-row">
          <div class="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#4D93E8] text-2xl font-bold text-white shadow-lg">
            {{ customer.initials }}
          </div>

          <div class="text-center sm:text-left">
            <h2 class="text-2xl font-bold text-white">
              {{ customer.name }}
            </h2>

            <p class="mt-1 text-sm text-blue-100">
              {{ customer.email }}
            </p>

            <span
              class="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white">
              {{ customer.status }}
            </span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 sm:p-8">
        <div class="rounded-xl bg-[#F8FAFD] p-5">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Phone
          </p>
          <p class="mt-2 font-semibold text-[#173B63]">
            {{ customer.phone }}
          </p>
        </div>

        <div class="rounded-xl bg-[#F8FAFD] p-5">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Location
          </p>
          <p class="mt-2 font-semibold text-[#173B63]">
            {{ customer.location }}
          </p>
        </div>

        <div class="rounded-xl bg-[#F8FAFD] p-5">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Member Since
          </p>
          <p class="mt-2 font-semibold text-[#173B63]">
            {{ customer.joined }}
          </p>
        </div>

        <div class="rounded-xl bg-[#F8FAFD] p-5">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Orders
          </p>
          <p class="mt-2 text-2xl font-bold text-[#2879D8]">
            {{ customer.orders }}
          </p>
        </div>

        <div class="rounded-xl bg-[#F8FAFD] p-5">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Total Spent
          </p>
          <p class="mt-2 text-2xl font-bold text-[#173B63]">
            ${{ customer.totalSpent.toFixed(2) }}
          </p>
        </div>

        <div class="rounded-xl bg-[#F8FAFD] p-5">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Account Status
          </p>
          <p class="mt-2 font-semibold text-emerald-600">
            {{ customer.status }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-else
      class="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <h2 class="text-xl font-bold text-[#173B63]">
        Customer Not Found
      </h2>

      <p class="mt-2 text-sm text-slate-500">
        The customer you're looking for does not exist.
      </p>

      <button
        type="button"
        class="mt-5 rounded-xl bg-[#2879D8] px-5 py-3 text-sm font-semibold text-white"
        @click="goBack">
        Back to Customers
      </button>
    </div>
  </div>
</template>
