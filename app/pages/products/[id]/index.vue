```vue
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()

const { products, loadProducts } = useProducts()

const productId = computed(() => Number(route.params.id))

onMounted(() => {
  loadProducts()
})

const product = computed(() => {
  return products.value.find(
    item => item.id === productId.value
  )
})

const productStatus = computed(() => {
  if (!product.value) {
    return ''
  }

  if (product.value.stock === 0) {
    return 'Out of Stock'
  }

  if (product.value.stock <= 10) {
    return 'Low Stock'
  }

  return 'In Stock'
})

const statusClass = computed(() => {
  if (productStatus.value === 'Out of Stock') {
    return 'bg-red-50 text-red-600'
  }

  if (productStatus.value === 'Low Stock') {
    return 'bg-orange-50 text-orange-600'
  }

  return 'bg-emerald-50 text-emerald-600'
})

const goBack = () => {
  router.push('/products')
}
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-6 sm:px-8 lg:px-10">
    <!-- Back Button -->
    <button
      type="button"
      class="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2879D8] transition hover:text-[#174A78]"
      @click="goBack">
      <span class="text-lg">←</span>
      Back to Products
    </button>

    <!-- Product Not Found -->
    <div
      v-if="!product"
      class="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <div class="text-5xl">
        🔍
      </div>

      <h1 class="mt-4 text-2xl font-bold text-[#173B63]">
        Product Not Found
      </h1>

      <p class="mt-2 text-sm text-slate-500">
        The product you are looking for does not exist.
      </p>

      <button
        type="button"
        class="mt-6 rounded-xl bg-[#2879D8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#174A78]"
        @click="goBack">
        Back to Products
      </button>
    </div>

    <!-- Product Details -->
    <div
      v-else
      class="mx-auto max-w-5xl">
      <!-- Header -->
      <div class="mb-6">
        <p class="text-sm font-medium text-[#2879D8]">
          Product Details
        </p>

        <h1 class="mt-2 text-3xl font-bold tracking-tight text-[#173B63]">
          {{ product.name }}
        </h1>

        <p class="mt-2 text-sm text-slate-500">
          View complete information about this product.
        </p>
      </div>

      <!-- Main Card -->
      <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <!-- Product Header -->
        <div class="border-b border-slate-100 p-6 sm:p-8">
          <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-5">
              <!-- Icon -->
              <div
                class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-4xl">
                {{ product.icon || '📦' }}
              </div>

              <div>
                <h2 class="text-2xl font-bold text-[#173B63]">
                  {{ product.name }}
                </h2>

                <p class="mt-1 text-sm text-slate-400">
                  SKU: {{ product.sku }}
                </p>
              </div>
            </div>

            <!-- Status -->
            <span
              class="w-fit rounded-full px-4 py-2 text-sm font-semibold"
              :class="statusClass">
              {{ productStatus }}
            </span>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-1 gap-px bg-slate-100 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Category -->
          <div class="bg-white p-6">
            <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
              Category
            </p>

            <p class="mt-2 text-lg font-bold text-[#173B63]">
              {{ product.category }}
            </p>
          </div>

          <!-- SKU -->
          <div class="bg-white p-6">
            <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
              SKU
            </p>

            <p class="mt-2 text-lg font-bold text-[#173B63]">
              {{ product.sku }}
            </p>
          </div>

          <!-- Price -->
          <div class="bg-white p-6">
            <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
              Price
            </p>

            <p class="mt-2 text-lg font-bold text-[#173B63]">
              ${{ product.price.toLocaleString() }}
            </p>
          </div>

          <!-- Stock -->
          <div class="bg-white p-6">
            <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
              Stock Quantity
            </p>

            <p class="mt-2 text-lg font-bold text-[#173B63]">
              {{ product.stock }}
            </p>
          </div>

          <!-- Inventory Value -->
          <div class="bg-white p-6">
            <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
              Inventory Value
            </p>

            <p class="mt-2 text-lg font-bold text-[#173B63]">
              ${{ (product.price * product.stock).toLocaleString() }}
            </p>
          </div>

          <!-- Status -->
          <div class="bg-white p-6">
            <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
              Stock Status
            </p>

            <p
              class="mt-2 text-lg font-bold"
              :class="{
                'text-emerald-600': productStatus === 'In Stock',
                'text-orange-500': productStatus === 'Low Stock',
                'text-red-500': productStatus === 'Out of Stock',
              }">
              {{ productStatus }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col-reverse gap-3 border-t border-slate-100 p-6 sm:flex-row sm:justify-end">
          <NuxtLink
            to="/products"
            class="inline-flex justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
            Back
          </NuxtLink>

          <NuxtLink
            :to="`/products/${product.id}/edit`"
            class="inline-flex justify-center rounded-xl bg-[#2879D8] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-[#174A78]">
            Edit Product
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
```
