```vue
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const router = useRouter()

const { addProduct } = useProducts()

const form = reactive({
  name: '',
  sku: '',
  category: '',
  price: null as number | null,
  stock: null as number | null,
  icon: '📦'
})

const errorMessage = ref('')
const successMessage = ref('')

const submitProduct = () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (
    !form.name.trim()
    || !form.sku.trim()
    || !form.category
    || form.price === null
    || form.stock === null
  ) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  if (form.price < 0 || form.stock < 0) {
    errorMessage.value = 'Price and stock cannot be negative.'
    return
  }

  const newProduct = addProduct({
    name: form.name.trim(),
    sku: form.sku.trim(),
    category: form.category,
    price: Number(form.price),
    stock: Number(form.stock),
    icon: form.icon || '📦'
  })

  successMessage.value = `${newProduct.name} saved successfully!`

  setTimeout(() => {
    router.push('/products')
  }, 1000)
}
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-4 sm:px-6 lg:px-8">
    <!-- Back -->
    <NuxtLink
      to="/products"
      class="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#2879D8]">
      ← Back to Products
    </NuxtLink>

    <!-- Header -->
    <div class="mb-4">
      <p class="text-sm font-medium text-[#2879D8]">
        Inventory Management
      </p>

      <h1 class="mt-1 text-3xl font-bold text-[#173B63] sm:text-4xl">
        Add New Product
      </h1>

      <p class="mb-3 text-sm text-slate-400 sm:text-base">
        Add a new product to your inventory.
      </p>
    </div>

    <!-- Form -->
    <div class="max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="border-b border-slate-100 px-6 py-5 sm:px-8">
        <h2 class="text-lg font-bold text-[#173B63]">
          Product Information
        </h2>

        <p class="mt-1 text-sm text-slate-500">
          Enter the details of your new product.
        </p>
      </div>

      <form
        class="p-6 sm:p-8"
        @submit.prevent="submitProduct">
        <!-- Error -->
        <div
          v-if="errorMessage"
          class="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {{ errorMessage }}
        </div>
        <!-- Success -->
        <div
          v-if="successMessage"
          class="mb-6 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
          ✓ {{ successMessage }}
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <!-- Product Name -->
          <div class="sm:col-span-2">
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Product Name
            </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="Enter product name"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <!-- SKU -->
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              SKU
            </label>

            <input
              v-model="form.sku"
              type="text"
              placeholder="Example: PR-001"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <!-- Category -->
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Category
            </label>

            <select
              v-model="form.category"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] focus:bg-white">
              <option value="">
                Select category
              </option>

              <option>Electronics</option>
              <option>Accessories</option>
              <option>Furniture</option>
              <option>Clothing</option>
              <option>Other</option>
            </select>
          </div>

          <!-- Price -->
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Price
            </label>

            <input
              v-model.number="form.price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <!-- Stock -->
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Stock Quantity
            </label>

            <input
              v-model.number="form.stock"
              type="number"
              min="0"
              placeholder="0"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <!-- Icon -->
          <div class="sm:col-span-2">
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Product Icon
            </label>

            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                {{ form.icon || '📦' }}
              </div>

              <input
                v-model="form.icon"
                type="text"
                placeholder="Example: 🎧"
                class="h-12 flex-1 rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
          <NuxtLink
            to="/products"
            class="inline-flex justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
            Cancel
          </NuxtLink>

          <button
            type="submit"
            class="inline-flex justify-center rounded-xl bg-[#2879D8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-[#174A78]">
            + Add Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
```
