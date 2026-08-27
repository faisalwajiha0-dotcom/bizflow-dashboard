<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
const selectedStatus = ref('All Status')
const selectedDate = ref('All Dates')
const sortOrder = ref('Newest')
const showSortMenu = ref(false)
const searchQuery = ref('')
const {
  orders,
  loadOrders,
  updateOrderStatus,
  deleteOrder
} = useOrders()

onMounted(() => {
  loadOrders()
})
const successMessage = ref('')
const filteredOrders = computed(() => {
  let result = [...orders.value]

  // 🔎 Search Order
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.trim().toLowerCase()

    result = result.filter(order =>
      order.customer.toLowerCase().includes(query)
      || order.email.toLowerCase().includes(query)
      || order.product.toLowerCase().includes(query)
      || order.id.toLowerCase().includes(query)
    )
  }
  // Status filter
  if (selectedStatus.value !== 'All Status') {
    result = result.filter(
      order => order.status === selectedStatus.value
    )
  }

  // Date filter
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate.value !== 'All Dates') {
    result = result.filter(order => {
      const orderDate = new Date(order.date)
      orderDate.setHours(0, 0, 0, 0)

      if (selectedDate.value === 'Today') {
        return orderDate.getTime() === today.getTime()
      }

      if (selectedDate.value === 'This Week') {
        const weekStart = new Date(today)
        const day = weekStart.getDay()

        weekStart.setDate(
          weekStart.getDate() - day
        )

        return orderDate >= weekStart && orderDate <= today
      }

      if (selectedDate.value === 'This Month') {
        return (
          orderDate.getMonth() === today.getMonth()
          && orderDate.getFullYear() === today.getFullYear()
        )
      }

      return true
    })
  }

  // Sorting
  result.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()

    if (sortOrder.value === 'Newest') {
      return dateB - dateA
    }

    if (sortOrder.value === 'Oldest') {
      return dateA - dateB
    }

    if (sortOrder.value === 'Amount High') {
      return parseFloat(b.amount.replace(/[^0-9.]/g, ''))
        - parseFloat(a.amount.replace(/[^0-9.]/g, ''))
    }

    if (sortOrder.value === 'Amount Low') {
      return parseFloat(a.amount.replace(/[^0-9.]/g, ''))
        - parseFloat(b.amount.replace(/[^0-9.]/g, ''))
    }

    if (sortOrder.value === 'Customer A-Z') {
      return a.customer.localeCompare(b.customer)
    }

    return 0
  })

  return result
})

const changeStatus = (
  id: string,
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
) => {
  updateOrderStatus(id, status)
}

const removeOrder = (id: string) => {
  successMessage.value = ''

  deleteOrder(id)

  successMessage.value = `Order deleted successfully!`

  setTimeout(() => {
    successMessage.value = ''
  }, 3500)
}
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-4 sm:px-8 lg:px-10">
    <div
      v-if="successMessage"
      class="mb-6 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
      {{ successMessage }}
    </div>
    <!-- Page Header -->
    <div class="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div class="mb-3 flex items-center gap-2 text-sm font-medium text-[#2879D8]">
          <span class="h-2 w-2 rounded-full bg-[#4D93E8]" />
          Order Management
        </div>

        <h1 class="text-3xl font-bold tracking-tight text-[#173B63] sm:text-4xl">
          Orders
        </h1>

        <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Track orders, manage deliveries and keep your customers updated.
        </p>
      </div>

      <NuxtLink
        to="/orders/create"
        class="inline-flex w-fit items-center gap-2 rounded-xl bg-[#2879D8] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition duration-200 hover:-translate-y-0.5 hover:bg-[#174A78]">
        <span class="text-lg">+</span>
        Create Order
      </NuxtLink>
    </div>

    <!-- Statistics -->
    <div class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <!-- Total Orders -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Total Orders
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              1,284
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg text-[#2879D8]">
            #
          </div>
        </div>

        <p class="mt-4 text-xs font-medium text-blue-600">
          ↑ 14.2% this month
        </p>
      </div>

      <!-- Processing -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Processing
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              48
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-lg text-orange-500">
            ◷
          </div>
        </div>

        <p class="mt-4 text-xs font-medium text-orange-600">
          Orders being prepared
        </p>
      </div>

      <!-- Shipped -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Shipped
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              126
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-lg text-purple-600">
            →
          </div>
        </div>

        <p class="mt-4 text-xs font-medium text-purple-600">
          On the way to customers
        </p>
      </div>

      <!-- Delivered -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Delivered
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              1,062
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600">
            ✓
          </div>
        </div>

        <p class="mt-4 text-xs font-medium text-emerald-600">
          82.7% delivery rate
        </p>
      </div>
    </div>

    <!-- Orders Card -->
    <div
      class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <!-- Card Header -->
      <div class="border-b border-slate-100 px-6 py-6 sm:px-7">
        <div
          class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 class="text-xl font-bold text-[#173B63]">
              Recent Orders
            </h2>

            <p class="mt-1.5 text-sm text-slate-500">
              View and manage your latest customer orders.
            </p>
          </div>

          <div class="relative inline-block">
            <button
              type="button"
              class="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-[#2879D8] hover:text-[#2879D8]"
              @click="showSortMenu = !showSortMenu">
              <span>⇅</span>
              Sort Orders
            </button>

            <div
              v-if="showSortMenu"
              class="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
              <button
                type="button"
                class="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-blue-50 hover:text-[#2879D8]"
                @click="sortOrder = 'Newest'; showSortMenu = false">
                Newest First
              </button>

              <button
                type="button"
                class="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-blue-50 hover:text-[#2879D8]"
                @click="sortOrder = 'Oldest'; showSortMenu = false">
                Oldest First
              </button>

              <button
                type="button"
                class="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-blue-50 hover:text-[#2879D8]"
                @click="sortOrder = 'Amount High'; showSortMenu = false">
                Amount: High → Low
              </button>

              <button
                type="button"
                class="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-blue-50 hover:text-[#2879D8]"
                @click="sortOrder = 'Amount Low'; showSortMenu = false">
                Amount: Low → High
              </button>

              <button
                type="button"
                class="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-blue-50 hover:text-[#2879D8]"
                @click="sortOrder = 'Customer A-Z'; showSortMenu = false">
                Customer: A → Z
              </button>
            </div>
          </div>
        </div>

        <!-- Search & Filters -->
        <div class="mt-6 flex flex-col gap-3 md:flex-row">
          <div
            class="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 transition focus-within:border-[#2879D8] focus-within:bg-white">
            <span class="text-lg text-slate-400">
              ⌕
            </span>

            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by order ID or customer..."
              class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400">
          </div>

          <select
            v-model="selectedStatus"
            class="h-12 rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] focus:bg-white">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <select
            v-model="selectedDate"
            class="h-12 rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] focus:bg-white">
            <option>All Dates</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-275">
          <thead>
            <tr class="border-b border-slate-100 bg-[#FAFBFD]">
              <th
                class="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Order
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Customer
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Product
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Date
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Amount
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>

              <th
                class="px-7 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              class="transition hover:bg-[#F8FAFD]">
              <!-- Order -->
              <td class="px-7 py-5">
                <p class="font-semibold text-[#2879D8]">
                  {{ order.id }}
                </p>
              </td>

              <!-- Customer -->
              <td class="px-6 py-5">
                <div class="flex items-center gap-3">
                  <div
                    :class="[
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                      order.avatar,
                    ]">
                    {{ order.initials }}
                  </div>

                  <div>
                    <p class="text-sm font-semibold text-[#173B63]">
                      {{ order.customer }}
                    </p>

                    <p class="mt-1 text-xs text-slate-400">
                      {{ order.email }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Product -->
              <td class="px-6 py-5">
                <span class="text-sm text-slate-600">
                  {{ order.product }}
                </span>
              </td>

              <!-- Date -->
              <td class="px-6 py-5">
                <span class="text-sm text-slate-500">
                  {{ order.date }}
                </span>
              </td>

              <!-- Amount -->
              <td class="px-6 py-5">
                <span class="text-sm font-semibold text-[#173B63]">
                  {{ order.amount }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-5">
                <select
                  :value="order.status"
                  class="rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none"
                  :class="{
                    'bg-emerald-50 text-emerald-600': order.status === 'Delivered',
                    'bg-blue-50 text-[#2879D8]': order.status === 'Processing',
                    'bg-purple-50 text-purple-600': order.status === 'Shipped',
                    'bg-orange-50 text-orange-600': order.status === 'Pending',
                    'bg-red-50 text-red-600': order.status === 'Cancelled',
                  }"
                  @change="
                    changeStatus(
                      order.id,
                      ($event.target as HTMLSelectElement).value as 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled',
                    )
                  ">
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
              </td>

              <!-- Action -->
              <td class="px-7 py-5">
                <div class="flex justify-end gap-2">
                  <!-- View -->
                  <NuxtLink
                    :to="`/orders/${encodeURIComponent(order.id)}`"
                    class="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#2879D8]">
                    View
                  </NuxtLink>

                  <!-- Edit -->
                  <NuxtLink
                    :to="`/orders/${encodeURIComponent(order.id)}/edit`"
                    class="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                    Edit
                  </NuxtLink>

                  <!-- Delete -->
                  <button
                    type="button"
                    class="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                    @click="removeOrder(order.id)">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="flex flex-col gap-4 border-t border-slate-100 px-7 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-slate-500">
          Showing
          <span class="font-semibold text-slate-700">1–5</span>
          of
          <span class="font-semibold text-slate-700">1,284</span>
          orders
        </p>

        <div class="flex items-center gap-2">
          <button
            class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-400">
            Previous
          </button>

          <button
            class="rounded-lg bg-[#2879D8] px-3 py-2 text-sm font-semibold text-white shadow-sm">
            1
          </button>

          <button
            class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50">
            2
          </button>

          <button
            class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50">
            3
          </button>

          <button
            class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
