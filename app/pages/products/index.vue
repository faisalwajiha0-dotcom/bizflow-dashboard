<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const {
  products,
  loadProducts,
  deleteProduct,
  totalProducts,
  inStockProducts,
  lowStockProducts,
  outOfStockProducts
} = useProducts()

const searchQuery = ref('')
const selectedCategory = ref('All Categories')
const selectedStatus = ref('All Status')
const currentPage = ref(1)

const itemsPerPage = 4

onMounted(() => {
  loadProducts()
})

const filteredProducts = computed(() => {
  let result = products.value

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()

    result = result.filter(product =>
      product.name.toLowerCase().includes(query)
      || product.sku.toLowerCase().includes(query)
      || product.category.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value !== 'All Categories') {
    result = result.filter(
      product => product.category === selectedCategory.value
    )
  }

  if (selectedStatus.value !== 'All Status') {
    result = result.filter(product => {
      if (selectedStatus.value === 'In Stock') {
        return product.stock > 10
      }

      if (selectedStatus.value === 'Low Stock') {
        return product.stock > 0 && product.stock <= 10
      }

      if (selectedStatus.value === 'Out of Stock') {
        return product.stock === 0
      }

      return true
    })
  }

  return result
})

const totalPages = computed(() => {
  return Math.max(
    1,
    Math.ceil(filteredProducts.value.length / itemsPerPage)
  )
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage

  return filteredProducts.value.slice(
    start,
    start + itemsPerPage
  )
})

const showingFrom = computed(() => {
  if (filteredProducts.value.length === 0) {
    return 0
  }

  return (currentPage.value - 1) * itemsPerPage + 1
})

const showingTo = computed(() => {
  return Math.min(
    currentPage.value * itemsPerPage,
    filteredProducts.value.length
  )
})

const categories = computed(() => {
  return [
    'All Categories',
    ...new Set(products.value.map(product => product.category))
  ]
})

const getStatus = (stock: number) => {
  if (stock === 0) {
    return 'Out of Stock'
  }

  if (stock <= 10) {
    return 'Low Stock'
  }

  return 'In Stock'
}

const successMessage = ref('')

const confirmDelete = (id: number, name: string) => {
  successMessage.value = ''

  deleteProduct(id)

  successMessage.value = `${name} deleted successfully!`

  setTimeout(() => {
    successMessage.value = ''
  }, 3500)
}
watch(
  [searchQuery, selectedCategory, selectedStatus],
  () => {
    currentPage.value = 1
  }
)

watch(totalPages, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }
})
</script>

<template>
  <div class="space-y-7">
    <!-- Page Header -->
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p class="text-sm font-medium text-[#2879D8]">
          Inventory Management
        </p>

        <h1 class="mt-1 text-3xl font-bold text-[#173B63]">
          Products
        </h1>

        <p class="mt-2 text-sm text-slate-500">
          Manage your products, inventory and pricing.
        </p>
      </div>

      <NuxtLink
        to="/products/add"
        class="inline-flex items-center justify-center rounded-xl bg-[#2879D8] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-[#174A78]">
        <span class="mr-2 text-lg">+</span>
        Add Product
      </NuxtLink>
    </div>
    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
      ✓ {{ successMessage }}
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <!-- Total -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">
          Total Products
        </p>

        <div class="mt-2 flex items-end justify-between">
          <h2 class="text-3xl font-bold text-[#173B63]">
            {{ totalProducts }}
          </h2>

          <span class="rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            Products
          </span>
        </div>
      </div>

      <!-- In Stock -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">
          In Stock
        </p>

        <div class="mt-2 flex items-end justify-between">
          <h2 class="text-3xl font-bold text-[#173B63]">
            {{ inStockProducts }}
          </h2>

          <span class="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
            Healthy
          </span>
        </div>
      </div>

      <!-- Low Stock -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">
          Low Stock
        </p>

        <div class="mt-2 flex items-end justify-between">
          <h2 class="text-3xl font-bold text-[#173B63]">
            {{ lowStockProducts }}
          </h2>

          <span class="rounded-lg bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
            Attention
          </span>
        </div>
      </div>

      <!-- Out of Stock -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">
          Out of Stock
        </p>

        <div class="mt-2 flex items-end justify-between">
          <h2 class="text-3xl font-bold text-[#173B63]">
            {{ outOfStockProducts }}
          </h2>

          <span class="rounded-lg bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
            Restock
          </span>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <!-- Toolbar -->
      <div class="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
        <!-- Search -->
        <div
          class="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 lg:max-w-md">
          <span class="text-slate-400">
            ⌕
          </span>

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400">
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-3">
          <select
            v-model="selectedCategory"
            class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-[#2879D8]">
            <option
              v-for="category in categories"
              :key="category"
              :value="category">
              {{ category }}
            </option>
          </select>

          <select
            v-model="selectedStatus"
            class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-[#2879D8]">
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="paginatedProducts.length === 0"
        class="px-6 py-16 text-center">
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
          🔍
        </div>

        <h3 class="mt-4 text-lg font-bold text-[#173B63]">
          No products found
        </h3>

        <p class="mt-1 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>

      <!-- Table -->
      <div
        v-else
        class="overflow-x-auto">
        <table class="w-full min-w-212.5 text-left">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Product
              </th>

              <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>

              <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Price
              </th>

              <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Stock
              </th>

              <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="product in paginatedProducts"
              :key="product.id"
              class="transition hover:bg-slate-50">
              <!-- Product -->
              <td class="px-6 py-5">
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    {{ product.icon }}
                  </div>

                  <div>
                    <p class="font-semibold text-[#173B63]">
                      {{ product.name }}
                    </p>

                    <p class="mt-1 text-xs text-slate-400">
                      SKU: {{ product.sku }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Category -->
              <td class="px-6 py-5 text-sm text-slate-600">
                {{ product.category }}
              </td>

              <!-- Price -->
              <td class="px-6 py-5 text-sm font-semibold text-[#173B63]">
                ${{ product.price.toFixed(2) }}
              </td>

              <!-- Stock -->
              <td class="px-6 py-5 text-sm text-slate-600">
                {{ product.stock }}
              </td>

              <!-- Status -->
              <td class="px-6 py-5">
                <span
                  v-if="getStatus(product.stock) === 'In Stock'"
                  class="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                  In Stock
                </span>

                <span
                  v-else-if="getStatus(product.stock) === 'Low Stock'"
                  class="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
                  Low Stock
                </span>

                <span
                  v-else
                  class="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                  Out of Stock
                </span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-5">
                <div class="flex justify-end gap-2">
                  <NuxtLink
                    :to="`/products/${product.id}`"
                    class="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#2879D8]">
                    View
                  </NuxtLink>
                  <NuxtLink
                    :to="`/products/${product.id}/edit`"
                    class="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                    Edit
                  </NuxtLink>

                  <button
                    type="button"
                    class="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                    @click="confirmDelete(product.id, product.name)">
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
        v-if="filteredProducts.length > 0"
        class="flex flex-col gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-slate-500">
          Showing
          <span class="font-semibold text-slate-700">
            {{ showingFrom }}–{{ showingTo }}
          </span>
          of
          <span class="font-semibold text-slate-700">
            {{ filteredProducts.length }}
          </span>
          products
        </p>

        <div class="flex items-center gap-2">
          <button
            type="button"
            :disabled="currentPage === 1"
            class="rounded-lg border border-slate-200 px-3 py-2 text-sm transition"
            :class="
              currentPage === 1
                ? 'cursor-not-allowed text-slate-300'
                : 'text-slate-600 hover:bg-slate-50'
            "
            @click="currentPage--">
            Previous
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            type="button"
            class="rounded-lg px-3 py-2 text-sm font-semibold transition"
            :class="
              currentPage === page
                ? 'bg-[#2879D8] text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            "
            @click="currentPage = page">
            {{ page }}
          </button>

          <button
            type="button"
            :disabled="currentPage === totalPages"
            class="rounded-lg border border-slate-200 px-3 py-2 text-sm transition"
            :class="
              currentPage === totalPages
                ? 'cursor-not-allowed text-slate-300'
                : 'text-slate-600 hover:bg-slate-50'
            "
            @click="currentPage++">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
