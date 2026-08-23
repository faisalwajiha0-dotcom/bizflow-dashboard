<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const products = [
  {
    name: 'Wireless Headphones',
    sku: 'WH-001',
    category: 'Electronics',
    price: '$129.00',
    stock: 48,
    status: 'In Stock',
    icon: '🎧',
    iconBg: 'bg-blue-50'
  },
  {
    name: 'Smart Watch',
    sku: 'SW-002',
    category: 'Electronics',
    price: '$189.00',
    stock: 32,
    status: 'In Stock',
    icon: '⌚',
    iconBg: 'bg-purple-50'
  },
  {
    name: 'Mechanical Keyboard',
    sku: 'MK-003',
    category: 'Accessories',
    price: '$75.00',
    stock: 9,
    status: 'Low Stock',
    icon: '⌨️',
    iconBg: 'bg-orange-50'
  },
  {
    name: 'Laptop Stand',
    sku: 'LS-004',
    category: 'Accessories',
    price: '$65.00',
    stock: 0,
    status: 'Out of Stock',
    icon: '💻',
    iconBg: 'bg-emerald-50'
  }
]
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-4 sm:px-8 lg:px-10">
    <!-- Page Heading -->
    <div class="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div class="mb-3 flex items-center gap-2 text-sm font-medium text-[#2879D8]">
          <span class="h-2 w-2 rounded-full bg-blue-400" />
          Inventory Management
        </div>

        <h1 class="text-3xl font-bold tracking-tight text-[#173B63] sm:text-4xl">
          Products
        </h1>

        <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Manage your products, track inventory and keep your store organized.
        </p>
      </div>

      <NuxtLink
        to="/products/add"
        class="inline-flex w-fit items-center gap-2 rounded-xl bg-[#2879D8] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition duration-200 hover:-translate-y-0.5 hover:bg-[#174A78]">
        <span class="text-xl leading-none">+</span>
        Add Product
      </NuxtLink>
    </div>

    <!-- Statistics -->
    <div class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <!-- Total -->
      <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Total Products
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              186
            </h2>
          </div>

          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg text-[#2879D8]">
            ▦
          </div>
        </div>

        <p class="mt-4 text-xs font-medium text-blue-600">
          ↑ 8 added this month
        </p>
      </div>

      <!-- In Stock -->
      <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              In Stock
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              164
            </h2>
          </div>

          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600">
            ✓
          </div>
        </div>

        <p class="mt-4 text-xs font-medium text-emerald-600">
          88% of total products
        </p>
      </div>

      <!-- Low Stock -->
      <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Low Stock
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              14
            </h2>
          </div>

          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-lg text-orange-500">
            !
          </div>
        </div>

        <p class="mt-4 text-xs font-medium text-orange-600">
          Needs your attention
        </p>
      </div>

      <!-- Out of Stock -->
      <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">
              Out of Stock
            </p>

            <h2 class="mt-3 text-3xl font-bold text-[#173B63]">
              8
            </h2>
          </div>

          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-lg text-red-500">
            ×
          </div>
        </div>

        <p class="mt-4 text-xs font-medium text-red-500">
          Restocking required
        </p>
      </div>
    </div>

    <!-- Main Products Card -->
    <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <!-- Card Header -->
      <div class="border-b border-slate-100 px-6 py-6 sm:px-7">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 class="text-xl font-bold text-[#173B63]">
              Product Inventory
            </h2>

            <p class="mt-1.5 text-sm text-slate-500">
              View and manage all products in your store.
            </p>
          </div>

          <button
            class="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-[#2879D8] hover:text-[#2879D8]">
            <span>⇅</span>
            Sort Products
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
              placeholder="Search by product name or SKU..."
              class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400">
          </div>

          <select
            class="h-12 rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] focus:bg-white">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Furniture</option>
          </select>

          <select
            class="h-12 rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] focus:bg-white">
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-225">
          <thead>
            <tr class="border-b border-slate-100 bg-[#FAFBFD]">
              <th class="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Product
              </th>

              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category
              </th>

              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Price
              </th>

              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Stock
              </th>

              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>

              <th class="px-7 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="product in products"
              :key="product.sku"
              class="transition hover:bg-[#F8FAFD]">
              <!-- Product -->
              <td class="px-7 py-5">
                <div class="flex items-center gap-4">
                  <div
                    :class="[
                      'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl',
                      product.iconBg,
                    ]">
                    {{ product.icon }}
                  </div>

                  <div>
                    <p class="font-semibold text-[#173B63]">
                      {{ product.name }}
                    </p>

                    <p class="mt-1 text-xs text-slate-400">
                      {{ product.sku }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Category -->
              <td class="px-6 py-5">
                <span class="text-sm text-slate-600">
                  {{ product.category }}
                </span>
              </td>

              <!-- Price -->
              <td class="px-6 py-5">
                <span class="text-sm font-semibold text-[#173B63]">
                  {{ product.price }}
                </span>
              </td>

              <!-- Stock -->
              <td class="px-6 py-5">
                <span class="text-sm text-slate-600">
                  {{ product.stock }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-5">
                <span
                  v-if="product.status === 'In Stock'"
                  class="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                  In Stock
                </span>

                <span
                  v-else-if="product.status === 'Low Stock'"
                  class="inline-flex rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
                  Low Stock
                </span>

                <span
                  v-else
                  class="inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                  Out of Stock
                </span>
              </td>

              <!-- Actions -->
              <td class="px-7 py-5">
                <div class="flex justify-end gap-2">
                  <NuxtLink
                    :to="`/products/${product.sku}/edit`"
                    class="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#2879D8]">
                    Edit
                  </NuxtLink>

                  <button
                    class="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Bottom -->
      <div class="flex flex-col gap-4 border-t border-slate-100 px-7 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-slate-500">
          Showing
          <span class="font-semibold text-slate-700">1–4</span>
          of
          <span class="font-semibold text-slate-700">186</span>
          products
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
