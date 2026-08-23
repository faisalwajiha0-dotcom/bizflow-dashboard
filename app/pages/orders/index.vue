<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const orders = [
  {
    id: '#ORD-1048',
    customer: 'Ayesha Khan',
    email: 'ayesha.khan@email.com',
    product: 'Wireless Headphones',
    date: 'Aug 22, 2026',
    amount: '$129.00',
    status: 'Delivered',
    initials: 'AK',
    avatar: 'bg-blue-100 text-[#2879D8]'
  },
  {
    id: '#ORD-1047',
    customer: 'Hassan Ali',
    email: 'hassan.ali@email.com',
    product: 'Smart Watch',
    date: 'Aug 22, 2026',
    amount: '$189.00',
    status: 'Processing',
    initials: 'HA',
    avatar: 'bg-purple-100 text-purple-600'
  },
  {
    id: '#ORD-1046',
    customer: 'Sara Ahmed',
    email: 'sara.ahmed@email.com',
    product: 'Mechanical Keyboard',
    date: 'Aug 21, 2026',
    amount: '$75.00',
    status: 'Shipped',
    initials: 'SA',
    avatar: 'bg-emerald-100 text-emerald-600'
  },
  {
    id: '#ORD-1045',
    customer: 'Maham Fatima',
    email: 'maham.fatima@email.com',
    product: 'Laptop Stand',
    date: 'Aug 21, 2026',
    amount: '$65.00',
    status: 'Pending',
    initials: 'MF',
    avatar: 'bg-pink-100 text-pink-600'
  },
  {
    id: '#ORD-1044',
    customer: 'Usman Tariq',
    email: 'usman.tariq@email.com',
    product: 'Wireless Headphones',
    date: 'Aug 20, 2026',
    amount: '$258.00',
    status: 'Cancelled',
    initials: 'UT',
    avatar: 'bg-orange-100 text-orange-600'
  }
]
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-4 sm:px-8 lg:px-10">
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

      <button
        class="inline-flex w-fit items-center gap-2 rounded-xl bg-[#2879D8] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition duration-200 hover:-translate-y-0.5 hover:bg-[#174A78]">
        <span class="text-lg">+</span>
        Create Order
      </button>
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

          <button
            class="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-[#2879D8] hover:text-[#2879D8]">
            <span>⇅</span>
            Sort Orders
          </button>
        </div>

        <!-- Search & Filters -->
        <div class="mt-6 flex flex-col gap-3 md:flex-row">
          <div
            class="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 transition focus-within:border-[#2879D8] focus-within:bg-white">
            <span class="text-lg text-slate-400">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search by order ID or customer..."
              class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400">
          </div>

          <select
            class="h-12 rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] focus:bg-white">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <select
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
              v-for="order in orders"
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
                <span
                  v-if="order.status === 'Delivered'"
                  class="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                  Delivered
                </span>

                <span
                  v-else-if="order.status === 'Processing'"
                  class="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#2879D8]">
                  Processing
                </span>

                <span
                  v-else-if="order.status === 'Shipped'"
                  class="inline-flex rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-600">
                  Shipped
                </span>

                <span
                  v-else-if="order.status === 'Pending'"
                  class="inline-flex rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
                  Pending
                </span>

                <span
                  v-else
                  class="inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                  Cancelled
                </span>
              </td>

              <!-- Action -->
              <td class="px-7 py-5">
                <div class="flex justify-end">
                  <button
                    class="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#2879D8]">
                    View
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
