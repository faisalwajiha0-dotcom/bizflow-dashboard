<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div class="space-y-7">
    <!-- Welcome Banner -->
    <section
      class="relative overflow-hidden rounded-[26px] bg-[#174A78] px-9 py-9 text-white shadow-lg">
      <!-- Decorative circles -->
      <div
        class="absolute -right-20 -top-24 h-72 w-72 rounded-full border-35 border-white/5" />

      <div
        class="absolute -bottom-32 right-48 h-64 w-64 rounded-full border-30 border-white/5" />

      <div class="relative z-10 max-w-3xl">
        <p class="mb-2 text-sm font-medium text-blue-200">
          Welcome to BizFlow
        </p>

        <h1 class="text-4xl font-bold tracking-tight">
          Good evening, Wajiha 👋
        </h1>

        <p class="mt-4 max-w-2xl text-base leading-7 text-blue-100">
          Here's what's happening with your business today.
          Keep track of sales, orders, customers and products
          all in one place.
        </p>

        <div class="mt-7 flex flex-wrap gap-4">
          <NuxtLink
            to="/products/add"
            class="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#174A78] shadow transition hover:bg-blue-50">
            + Add Product
          </NuxtLink>

          <NuxtLink
            to="/analytics"
            class="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
            View Analytics
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Statistics -->
    <section class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <div
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-slate-500">
              Total Revenue
            </p>
            <h2 class="mt-2 text-3xl font-bold text-[#173B63]">
              $24,580
            </h2>
          </div>

          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
            $
          </div>
        </div>

        <p class="mt-5 text-sm">
          <span class="font-semibold text-emerald-500">↑ 12.5%</span>
          <span class="ml-2 text-slate-400">from last month</span>
        </p>
      </div>

      <div
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-slate-500">
              Total Orders
            </p>
            <h2 class="mt-2 text-3xl font-bold text-[#173B63]">
              348
            </h2>
          </div>

          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
            🛍
          </div>
        </div>

        <p class="mt-5 text-sm">
          <span class="font-semibold text-emerald-500">↑ 8.2%</span>
          <span class="ml-2 text-slate-400">from last month</span>
        </p>
      </div>

      <div
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-slate-500">
              Customers
            </p>
            <h2 class="mt-2 text-3xl font-bold text-[#173B63]">
              1,240
            </h2>
          </div>

          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600">
            ◎
          </div>
        </div>

        <p class="mt-5 text-sm">
          <span class="font-semibold text-emerald-500">↑ 15.3%</span>
          <span class="ml-2 text-slate-400">from last month</span>
        </p>
      </div>

      <div
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-slate-500">
              Products
            </p>
            <h2 class="mt-2 text-3xl font-bold text-[#173B63]">
              186
            </h2>
          </div>

          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-xl text-orange-500">
            ◇
          </div>
        </div>

        <p class="mt-5 text-sm">
          <span class="font-semibold text-emerald-500">↑ 4.7%</span>
          <span class="ml-2 text-slate-400">from last month</span>
        </p>
      </div>
    </section>

    <!-- Charts -->
    <section class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <!-- Sales Overview -->
      <div
        class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm xl:col-span-2">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-[#173B63]">
              Sales Overview
            </h2>

            <p class="mt-1 text-sm text-slate-400">
              Monthly revenue performance
            </p>
          </div>

          <select
            class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 outline-none">
            <option>Last 12 months</option>
            <option>Last 6 months</option>
            <option>This year</option>
          </select>
        </div>

        <!-- Chart -->
        <div class="mt-8 h-72">
          <div class="flex h-full items-end gap-4 border-b border-slate-200 px-2">
            <div
              v-for="(height, index) in [
                38, 52, 64, 43, 75, 61,
                70, 88, 67, 92, 78, 86,
              ]"
              :key="index"
              class="group flex h-full flex-1 flex-col justify-end">
              <!-- Bar -->
              <div class="flex h-full items-end justify-center">
                <div
                  class="w-full max-w-10 rounded-t-lg bg-[#4D93E8] transition-all duration-300 group-hover:bg-[#174A78]"
                  :style="{ height: `${height}%` }" />
              </div>

              <!-- Month -->
              <div class="pt-3 text-center text-xs text-slate-400">
                {{
                  [
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                  ][index]
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Performance -->
      <div
        class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 class="text-xl font-bold text-[#173B63]">
          Performance
        </h2>

        <p class="mt-1 text-sm text-slate-400">
          Overall business health
        </p>

        <div class="mt-8 flex justify-center">
          <div
            class="flex h-48 w-48 items-center justify-center rounded-full"
            style="background: conic-gradient(#2879D8 0deg 270deg, #E6EEF7 270deg 360deg)">
            <div
              class="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
              <span class="text-3xl font-bold text-[#173B63]">
                75%
              </span>

              <span class="text-xs text-slate-400">
                Performance
              </span>
            </div>
          </div>
        </div>

        <div class="mt-7 space-y-4">
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Sales Target</span>
            <strong class="text-[#173B63]">82%</strong>
          </div>

          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Customer Growth</span>
            <strong class="text-[#173B63]">68%</strong>
          </div>

          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Order Fulfillment</span>
            <strong class="text-[#173B63]">90%</strong>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Tables -->
    <section class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <!-- Recent Orders -->
      <div
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center justify-between p-7">
          <div>
            <h2 class="text-xl font-bold text-[#173B63]">
              Recent Orders
            </h2>

            <p class="mt-1 text-sm text-slate-400">
              Latest customer orders
            </p>
          </div>

          <NuxtLink
            to="/orders"
            class="text-sm font-semibold text-blue-600 hover:text-blue-800">
            View All
          </NuxtLink>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="border-y border-slate-100 bg-slate-50">
              <tr>
                <th class="px-6 py-4 text-slate-500">
                  Order ID
                </th>
                <th class="px-6 py-4 text-slate-500">
                  Customer
                </th>
                <th class="px-6 py-4 text-slate-500">
                  Amount
                </th>
                <th class="px-6 py-4 text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr class="border-b border-slate-100">
                <td class="px-6 py-4 font-semibold text-blue-600">
                  #BF-1024
                </td>
                <td class="px-6 py-4 text-slate-600">
                  Ayesha Khan
                </td>
                <td class="px-6 py-4 font-semibold text-slate-700">
                  $129
                </td>
                <td class="px-6 py-4">
                  <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    Completed
                  </span>
                </td>
              </tr>

              <tr class="border-b border-slate-100">
                <td class="px-6 py-4 font-semibold text-blue-600">
                  #BF-1023
                </td>
                <td class="px-6 py-4 text-slate-600">
                  Hamza Ali
                </td>
                <td class="px-6 py-4 font-semibold text-slate-700">
                  $189
                </td>
                <td class="px-6 py-4">
                  <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    Processing
                  </span>
                </td>
              </tr>

              <tr>
                <td class="px-6 py-4 font-semibold text-blue-600">
                  #BF-1022
                </td>
                <td class="px-6 py-4 text-slate-600">
                  Sara Ahmed
                </td>
                <td class="px-6 py-4 font-semibold text-slate-700">
                  $74
                </td>
                <td class="px-6 py-4">
                  <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top Products -->
      <div
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center justify-between p-7">
          <div>
            <h2 class="text-xl font-bold text-[#173B63]">
              Top Products
            </h2>

            <p class="mt-1 text-sm text-slate-400">
              Best performing products
            </p>
          </div>

          <NuxtLink
            to="/products"
            class="text-sm font-semibold text-blue-600 hover:text-blue-800">
            View All
          </NuxtLink>
        </div>

        <div class="divide-y divide-slate-100">
          <div class="flex items-center justify-between px-7 py-4">
            <div>
              <p class="font-semibold text-[#173B63]">
                Wireless Headphones
              </p>
              <p class="text-xs text-slate-400">
                Electronics
              </p>
            </div>

            <div class="text-right">
              <p class="font-semibold text-[#173B63]">
                124
              </p>
              <p class="text-xs text-slate-400">
                $9,920
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between px-7 py-4">
            <div>
              <p class="font-semibold text-[#173B63]">
                Smart Watch
              </p>
              <p class="text-xs text-slate-400">
                Electronics
              </p>
            </div>

            <div class="text-right">
              <p class="font-semibold text-[#173B63]">
                98
              </p>
              <p class="text-xs text-slate-400">
                $7,840
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between px-7 py-4">
            <div>
              <p class="font-semibold text-[#173B63]">
                Mechanical Keyboard
              </p>
              <p class="text-xs text-slate-400">
                Accessories
              </p>
            </div>

            <div class="text-right">
              <p class="font-semibold text-[#173B63]">
                86
              </p>
              <p class="text-xs text-slate-400">
                $6,450
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between px-7 py-4">
            <div>
              <p class="font-semibold text-[#173B63]">
                Laptop Stand
              </p>
              <p class="text-xs text-slate-400">
                Accessories
              </p>
            </div>

            <div class="text-right">
              <p class="font-semibold text-[#173B63]">
                65
              </p>
              <p class="text-xs text-slate-400">
                $4,875
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
