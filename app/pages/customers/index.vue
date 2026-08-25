<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const {
  customers,
  loadCustomers
} = useCustomers()

const searchQuery = ref('')
const selectedStatus = ref('All Status')
const sortOption = ref('Newest')

onMounted(() => {
  loadCustomers()
})

const filteredCustomers = computed(() => {
  let result = [...customers.value]

  // 🔎 Search Customer
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()

    result = result.filter(customer =>
      customer.name.toLowerCase().includes(query)
      || customer.email.toLowerCase().includes(query)
      || customer.phone.toLowerCase().includes(query)
    )
  }

  // 👤 Status Filter
  if (selectedStatus.value !== 'All Status') {
    result = result.filter(
      customer => customer.status === selectedStatus.value
    )
  }

  // ↕️ Sort Customers
  if (sortOption.value === 'A-Z') {
    result.sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  }

  if (sortOption.value === 'Z-A') {
    result.sort((a, b) =>
      b.name.localeCompare(a.name)
    )
  }

  if (sortOption.value === 'Highest Spent') {
    result.sort((a, b) =>
      b.totalSpent - a.totalSpent
    )
  }

  if (sortOption.value === 'Lowest Spent') {
    result.sort((a, b) =>
      a.totalSpent - b.totalSpent
    )
  }

  if (sortOption.value === 'Newest') {
    result.sort((a, b) =>
      b.id - a.id
    )
  }

  return result
})
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-4 sm:px-8 lg:px-10">
    <!-- Page Header -->
    <div class="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div class="mb-3 flex items-center gap-2 text-sm font-medium text-[#2879D8]">
          <span class="h-2 w-2 rounded-full bg-[#4D93E8]" />
          Customer Management
        </div>

        <h1 class="text-3xl font-bold tracking-tight text-[#173B63] sm:text-4xl">
          Customers
        </h1>

        <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Manage your customers, view their activity and build stronger relationships.
        </p>
      </div>

      <NuxtLink
        to="/customers/create"
        class="inline-flex w-fit items-center gap-2 rounded-xl bg-[#2879D8] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition duration-200 hover:-translate-y-0.5 hover:bg-[#174A78]">
        <span class="text-lg">+</span>
        Add Customer
      </NuxtLink>
    </div>

    <!-- Statistics -->
    <div class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <!-- Total Customers -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Total Customers
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              2,486
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg text-[#2879D8]">
            ♙
          </div>
        </div>

        <p class="mt-4 text-xs font-medium text-blue-600">
          ↑ 12.5% this month
        </p>
      </div>

      <!-- New Customers -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              New Customers
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              186
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600">
            +
          </div>
        </div>

        <p class="mt-4 text-xs font-medium text-emerald-600">
          ↑ 8.4% from last month
        </p>
      </div>

      <!-- Active Customers -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Active Customers
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              2,148
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-lg text-purple-600">
            ✓
          </div>
        </div>

        <p class="mt-4 text-xs font-medium text-purple-600">
          86.4% of all customers
        </p>
      </div>

      <!-- VIP Customers -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              VIP Customers
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              84
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-lg text-orange-500">
            ★
          </div>
        </div>

        <p class="mt-4 text-xs font-medium text-orange-600">
          High-value customers
        </p>
      </div>
    </div>

    <!-- Customers Table -->
    <div
      class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <!-- Table Header -->
      <div class="border-b border-slate-100 px-6 py-6 sm:px-7">
        <div
          class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 class="text-xl font-bold text-[#173B63]">
              Customer Directory
            </h2>

            <p class="mt-1.5 text-sm text-slate-500">
              View and manage all your customers.
            </p>
          </div>

          <select
            v-model="sortOption"
            class="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 outline-none transition focus:border-[#2879D8] focus:text-[#2879D8]">
            <option value="Newest">
              Newest
            </option>

            <option value="A-Z">
              A-Z
            </option>

            <option value="Z-A">
              Z-A
            </option>

            <option value="Highest Spent">
              Highest Spent
            </option>

            <option value="Lowest Spent">
              Lowest Spent
            </option>
          </select>
        </div>

        <!-- Search & Filter -->
        <div class="mt-6 flex flex-col gap-3 md:flex-row">
          <div
            class="flex h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 transition focus-within:border-[#2879D8] focus-within:bg-white">
            <span class="text-lg text-slate-400">
              ⌕
            </span>

            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, email or phone..."
              class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400">
          </div>

          <select
            v-model="selectedStatus"
            class="h-12 rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] focus:bg-white">
            <option value="All Status">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-250">
          <thead>
            <tr class="border-b border-slate-100 bg-[#FAFBFD]">
              <th
                class="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Customer
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Phone
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Orders
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Spent
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
              v-for="customer in filteredCustomers"
              :key="customer.email"
              class="transition hover:bg-[#F8FAFD]">
              <!-- Customer -->
              <td class="px-7 py-5">
                <div class="flex items-center gap-4">
                  <div
                    :class="
                      customer.status === 'Active'
                        ? 'bg-blue-100 text-[#2879D8]'
                        : 'bg-slate-100 text-slate-500'
                    ">
                    {{ customer.initials }}
                  </div>

                  <div>
                    <p class="font-semibold text-[#173B63]">
                      {{ customer.name }}
                    </p>

                    <p class="mt-1 text-xs text-slate-400">
                      {{ customer.email }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Phone -->
              <td class="px-6 py-5">
                <span class="text-sm text-slate-600">
                  {{ customer.phone }}
                </span>
              </td>

              <!-- Orders -->
              <td class="px-6 py-5">
                <span class="text-sm font-semibold text-[#173B63]">
                  {{ customer.orders }}
                </span>
              </td>

              <!-- Spent -->
              <td class="px-6 py-5">
                <span class="text-sm font-semibold text-[#173B63]">
                  {{ customer.totalSpent }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-5">
                <span
                  v-if="customer.status === 'Active'"
                  class="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                  Active
                </span>

                <span
                  v-else
                  class="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
                  Inactive
                </span>
              </td>

              <!-- Actions -->
              <td class="px-7 py-5">
                <div class="flex justify-end gap-2">
                  <NuxtLink
                    :to="`/customers/${customer.id}`"
                    class="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#2879D8]">
                    View
                  </NuxtLink>

                  <NuxtLink
                    :to="`/customers/${customer.id}/edit`"
                    class="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#2879D8]">
                    Edit
                  </NuxtLink>
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
          <span class="font-semibold text-slate-700">2,486</span>
          customers
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
