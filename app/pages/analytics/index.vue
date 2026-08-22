<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const salesData = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 58 },
  { month: 'Mar', value: 48 },
  { month: 'Apr', value: 72 },
  { month: 'May', value: 65 },
  { month: 'Jun', value: 86 },
  { month: 'Jul', value: 78 },
  { month: 'Aug', value: 94 }
]

const topProducts = [
  {
    name: 'Wireless Headphones',
    category: 'Electronics',
    sales: 348,
    revenue: '$44,892',
    initials: 'WH',
    bg: 'bg-blue-100',
    text: 'text-[#2879D8]'
  },
  {
    name: 'Smart Watch',
    category: 'Electronics',
    sales: 286,
    revenue: '$38,214',
    initials: 'SW',
    bg: 'bg-purple-100',
    text: 'text-purple-600'
  },
  {
    name: 'Mechanical Keyboard',
    category: 'Accessories',
    sales: 214,
    revenue: '$16,050',
    initials: 'MK',
    bg: 'bg-orange-100',
    text: 'text-orange-600'
  },
  {
    name: 'Laptop Stand',
    category: 'Accessories',
    sales: 176,
    revenue: '$11,440',
    initials: 'LS',
    bg: 'bg-emerald-100',
    text: 'text-emerald-600'
  }
]

const orderStats = [
  {
    label: 'Delivered',
    value: '1,062',
    percentage: '82.7%',
    bar: '82%',
    bg: 'bg-emerald-500'
  },
  {
    label: 'Shipped',
    value: '126',
    percentage: '9.8%',
    bar: '10%',
    bg: 'bg-purple-500'
  },
  {
    label: 'Processing',
    value: '48',
    percentage: '3.7%',
    bar: '4%',
    bg: 'bg-[#2879D8]'
  },
  {
    label: 'Pending',
    value: '48',
    percentage: '3.8%',
    bar: '4%',
    bg: 'bg-orange-400'
  }
]
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-5 py-8 sm:px-8 lg:px-10">
    <!-- Page Header -->
    <div
      class="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div class="mb-3 flex items-center gap-2 text-sm font-medium text-[#2879D8]">
          <span class="h-2 w-2 rounded-full bg-[#4D93E8]" />
          Business Insights
        </div>

        <h1 class="text-3xl font-bold tracking-tight text-[#173B63] sm:text-4xl">
          Analytics
        </h1>

        <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Track your sales performance, revenue and business growth.
        </p>
      </div>

      <!-- Date Filter -->
      <div class="flex items-center gap-3">
        <button
          class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm transition hover:border-[#2879D8] hover:text-[#2879D8]">
          Last 30 Days
          <span class="ml-2 text-slate-400">⌄</span>
        </button>

        <button
          class="rounded-xl bg-[#2879D8] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition hover:bg-[#174A78]">
          Export Report
        </button>
      </div>
    </div>

    <!-- Main Stats -->
    <div class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <!-- Revenue -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Total Revenue
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              $128,450
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#2879D8]">
            $
          </div>
        </div>

        <div class="mt-4 flex items-center gap-2">
          <span class="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
            ↑ 18.4%
          </span>

          <span class="text-xs text-slate-400">
            vs last month
          </span>
        </div>
      </div>

      <!-- Sales -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Total Sales
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              3,842
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            ↗
          </div>
        </div>

        <div class="mt-4 flex items-center gap-2">
          <span class="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
            ↑ 12.8%
          </span>

          <span class="text-xs text-slate-400">
            vs last month
          </span>
        </div>
      </div>

      <!-- Average Order -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Average Order
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              $86.40
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            #
          </div>
        </div>

        <div class="mt-4 flex items-center gap-2">
          <span class="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
            ↑ 6.2%
          </span>

          <span class="text-xs text-slate-400">
            vs last month
          </span>
        </div>
      </div>

      <!-- Customers -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              New Customers
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              486
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            +
          </div>
        </div>

        <div class="mt-4 flex items-center gap-2">
          <span class="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
            ↑ 9.7%
          </span>

          <span class="text-xs text-slate-400">
            vs last month
          </span>
        </div>
      </div>
    </div>

    <!-- Revenue Chart + Order Statistics -->
    <div class="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
      <!-- Revenue Chart -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm xl:col-span-2">
        <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 class="text-xl font-bold text-[#173B63]">
              Revenue Overview
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              Monthly revenue performance
            </p>
          </div>

          <div class="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span class="h-2.5 w-2.5 rounded-full bg-[#2879D8]" />
            Revenue
          </div>
        </div>

        <!-- Chart -->
        <div class="mt-8">
          <div class="relative h-72">
            <!-- Grid -->
            <div class="absolute inset-0 flex flex-col justify-between">
              <div class="border-t border-dashed border-slate-100" />
              <div class="border-t border-dashed border-slate-100" />
              <div class="border-t border-dashed border-slate-100" />
              <div class="border-t border-dashed border-slate-100" />
              <div class="border-t border-dashed border-slate-100" />
            </div>

            <!-- Bars -->
            <div
              class="absolute inset-x-0 bottom-0 top-2 flex items-end justify-around gap-3 px-2">
              <div
                v-for="item in salesData"
                :key="item.month"
                class="group flex h-full flex-1 flex-col items-center justify-end">
                <div
                  class="mb-2 opacity-0 transition group-hover:opacity-100">
                  <span
                    class="rounded-lg bg-[#173B63] px-2 py-1 text-[10px] font-semibold text-white">
                    ${{ item.value }}k
                  </span>
                </div>

                <div
                  class="w-full max-w-10 rounded-t-xl bg-[#2879D8] transition-all duration-300 hover:bg-[#174A78]"
                  :style="{ height: `${item.value * 2.5}px` }" />

                <span class="mt-3 text-xs font-medium text-slate-400">
                  {{ item.month }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Statistics -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div>
          <h2 class="text-xl font-bold text-[#173B63]">
            Order Statistics
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Current order status
          </p>
        </div>

        <div class="mt-8 space-y-7">
          <div
            v-for="item in orderStats"
            :key="item.label">
            <div class="mb-2 flex items-center justify-between">
              <span class="text-sm font-medium text-slate-600">
                {{ item.label }}
              </span>

              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-[#173B63]">
                  {{ item.value }}
                </span>

                <span class="text-xs text-slate-400">
                  {{ item.percentage }}
                </span>
              </div>
            </div>

            <div class="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                :class="['h-full rounded-full transition-all', item.bg]"
                :style="{ width: item.bar }" />
            </div>
          </div>
        </div>

        <div class="mt-8 rounded-xl bg-[#F5F8FC] p-4">
          <p class="text-xs font-medium text-slate-500">
            Total Orders
          </p>

          <p class="mt-1 text-2xl font-bold text-[#173B63]">
            1,284
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <!-- Top Products -->
      <div
        class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm xl:col-span-2">
        <div
          class="flex items-center justify-between border-b border-slate-100 px-6 py-6">
          <div>
            <h2 class="text-xl font-bold text-[#173B63]">
              Top Products
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              Best performing products this month
            </p>
          </div>

          <NuxtLink
            to="/products"
            class="text-sm font-semibold text-[#2879D8] hover:underline">
            View all
          </NuxtLink>
        </div>

        <div class="divide-y divide-slate-100">
          <div
            v-for="(product, index) in topProducts"
            :key="product.name"
            class="flex items-center gap-4 px-6 py-5 transition hover:bg-[#F8FAFD]">
            <div class="w-6 text-sm font-bold text-slate-400">
              0{{ index + 1 }}
            </div>

            <div
              :class="[
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-bold',
                product.bg,
                product.text,
              ]">
              {{ product.initials }}
            </div>

            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-semibold text-[#173B63]">
                {{ product.name }}
              </p>

              <p class="mt-1 text-xs text-slate-400">
                {{ product.category }}
              </p>
            </div>

            <div class="hidden text-right sm:block">
              <p class="text-sm font-semibold text-[#173B63]">
                {{ product.revenue }}
              </p>

              <p class="mt-1 text-xs text-slate-400">
                {{ product.sales }} sales
              </p>
            </div>

            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-600">
              ↑
            </div>
          </div>
        </div>
      </div>

      <!-- Growth Card -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div>
          <p class="text-sm font-medium text-slate-500">
            Business Growth
          </p>

          <h2 class="mt-2 text-3xl font-bold text-[#173B63]">
            +24.8%
          </h2>

          <p class="mt-2 text-sm leading-6 text-slate-500">
            Your business is performing better than the previous period.
          </p>
        </div>

        <!-- Growth visual -->
        <div class="mt-8 flex h-32 items-end gap-2">
          <div class="w-full rounded-t-lg bg-blue-100" style="height: 35%" />
          <div class="w-full rounded-t-lg bg-blue-100" style="height: 48%" />
          <div class="w-full rounded-t-lg bg-blue-100" style="height: 42%" />
          <div class="w-full rounded-t-lg bg-blue-200" style="height: 62%" />
          <div class="w-full rounded-t-lg bg-blue-200" style="height: 55%" />
          <div class="w-full rounded-t-lg bg-blue-300" style="height: 76%" />
          <div class="w-full rounded-t-lg bg-[#2879D8]" style="height: 92%" />
        </div>

        <div class="mt-5 flex items-center justify-between">
          <span class="text-xs text-slate-400">
            Previous
          </span>

          <span class="text-xs font-semibold text-[#2879D8]">
            Current
          </span>
        </div>

        <div class="mt-6 rounded-xl bg-emerald-50 p-4">
          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-600">
              ↑
            </div>

            <div>
              <p class="text-xs text-slate-500">
                Revenue increased
              </p>

              <p class="text-sm font-bold text-emerald-600">
                $24,580 this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
