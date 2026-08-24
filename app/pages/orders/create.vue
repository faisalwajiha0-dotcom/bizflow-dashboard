<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const router = useRouter()
const { addOrder } = useOrders()

const form = reactive({
  customer: '',
  email: '',
  product: '',
  date: '',
  amount: '',
  status: 'Pending' as
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
})

const errorMessage = ref('')

const submitOrder = () => {
  errorMessage.value = ''

  if (
    !form.customer.trim()
    || !form.email.trim()
    || !form.product.trim()
    || !form.date
    || !form.amount.trim()
  ) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  const initials = form.customer
    .trim()
    .split(' ')
    .filter(Boolean)
    .map(name => name.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  addOrder({
    customer: form.customer.trim(),
    email: form.email.trim(),
    product: form.product.trim(),
    date: form.date,
    amount: form.amount.trim(),
    status: form.status,
    initials,
    avatar: 'bg-blue-100 text-[#2879D8]'
  })

  router.push('/orders')
}

const cancelOrder = () => {
  router.push('/orders')
}
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-6 sm:px-8 lg:px-10">
    <!-- Page Header -->
    <div class="mb-8">
      <button
        type="button"
        class="mb-4 text-sm font-semibold text-[#2879D8] transition hover:text-[#174A78]"
        @click="cancelOrder">
        ← Back to Orders
      </button>

      <div class="mb-3 flex items-center gap-2 text-sm font-medium text-[#2879D8]">
        <span class="h-2 w-2 rounded-full bg-[#4D93E8]" />
        Order Management
      </div>

      <h1 class="text-3xl font-bold tracking-tight text-[#173B63] sm:text-4xl">
        Create Order
      </h1>

      <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
        Create a new customer order and add it to your orders list.
      </p>
    </div>

    <!-- Form Card -->
    <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <!-- Card Header -->
      <div class="border-b border-slate-100 px-6 py-5 sm:px-8">
        <h2 class="text-xl font-bold text-[#173B63]">
          Order Information
        </h2>

        <p class="mt-1.5 text-sm text-slate-500">
          Enter the customer and order details below.
        </p>
      </div>

      <!-- Form -->
      <form
        class="p-6 sm:p-8"
        @submit.prevent="submitOrder">
        <!-- Error -->
        <div
          v-if="errorMessage"
          class="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {{ errorMessage }}
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <!-- Customer Name -->
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Customer Name
            </label>

            <input
              v-model="form.customer"
              type="text"
              placeholder="Enter customer name"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <!-- Email -->
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Email Address
            </label>

            <input
              v-model="form.email"
              type="email"
              placeholder="customer@example.com"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <!-- Product -->
          <div class="sm:col-span-2">
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Product
            </label>

            <input
              v-model="form.product"
              type="text"
              placeholder="Enter product name"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <!-- Date -->
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Order Date
            </label>

            <input
              v-model="form.date"
              type="date"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <!-- Amount -->
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Amount
            </label>

            <input
              v-model="form.amount"
              type="text"
              placeholder="$129.00"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <!-- Status -->
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Order Status
            </label>

            <select
              v-model="form.status"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] focus:bg-white">
              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Shipped">
                Shipped
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>
          </div>
        </div>

        <!-- Buttons -->
        <div class="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            class="inline-flex justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            @click="cancelOrder">
            Cancel
          </button>

          <button
            type="submit"
            class="inline-flex justify-center rounded-xl bg-[#2879D8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-[#174A78]">
            + Create Order
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
