```vue
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()

const {
  loadProducts,
  getProduct,
  updateProduct
} = useProducts()

const productId = Number(route.params.id)

const form = reactive({
  name: '',
  sku: '',
  category: '',
  price: 0,
  stock: 0,
  icon: '📦'
})

const errorMessage = ref('')
const productFound = ref(true)

const loadProductData = () => {
  const product = getProduct(productId)

  if (!product) {
    productFound.value = false
    return
  }

  form.name = product.name
  form.sku = product.sku
  form.category = product.category
  form.price = product.price
  form.stock = product.stock
  form.icon = product.icon
}

onMounted(() => {
  loadProducts()
  loadProductData()
})

const submitEdit = () => {
  errorMessage.value = ''

  if (
    !form.name.trim()
    || !form.sku.trim()
    || !form.category
  ) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  if (form.price < 0 || form.stock < 0) {
    errorMessage.value = 'Price and stock cannot be negative.'
    return
  }

  const updated = updateProduct(productId, {
    name: form.name.trim(),
    sku: form.sku.trim(),
    category: form.category,
    price: Number(form.price),
    stock: Number(form.stock),
    icon: form.icon || '📦'
  })

  if (!updated) {
    errorMessage.value = 'Product could not be found.'
    return
  }

  router.push('/products')
}
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-4 sm:px-6 lg:px-8">
    <NuxtLink
      to="/products"
      class="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#2879D8]">
      ← Back to Products
    </NuxtLink>

    <div class="mb-4">
      <p class="text-sm  font-medium text-[#2879D8]">
        Inventory Management
      </p>

      <h1 class="mt-1 text-3xl font-bold text-[#173B63] sm:text-4xl">
        Edit Product
      </h1>

      <p class="mb-3 text-sm text-slate-400 sm:text-base">
        Update your product information and inventory details.
      </p>
    </div>

    <!-- Product Not Found -->
    <div
      v-if="!productFound"
      class="max-w-4xl rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
      <div class="text-4xl">
        📦
      </div>

      <h2 class="mt-4 text-xl font-bold text-[#173B63]">
        Product Not Found
      </h2>

      <p class="mt-2 text-sm text-slate-500">
        This product does not exist or may have been deleted.
      </p>

      <NuxtLink
        to="/products"
        class="mt-6 inline-flex rounded-xl bg-[#2879D8] px-5 py-3 text-sm font-semibold text-white">
        Back to Products
      </NuxtLink>
    </div>

    <!-- Form -->
    <div
      v-else
      class="max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="border-b border-slate-100 px-6 py-5 sm:px-8">
        <h2 class="text-lg font-bold text-[#173B63]">
          Product Information
        </h2>

        <p class="mt-1 text-sm text-slate-500">
          Make changes to the selected product.
        </p>
      </div>

      <form
        class="p-6 sm:p-8"
        @submit.prevent="submitEdit">
        <div
          v-if="errorMessage"
          class="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {{ errorMessage }}
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Product Name
            </label>

            <input
              v-model="form.name"
              type="text"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              SKU
            </label>

            <input
              v-model="form.sku"
              type="text"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Category
            </label>

            <select
              v-model="form.category"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] focus:bg-white">
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Furniture</option>
              <option>Clothing</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Price
            </label>

            <input
              v-model.number="form.price"
              type="number"
              min="0"
              step="0.01"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-600">
              Stock Quantity
            </label>

            <input
              v-model.number="form.stock"
              type="number"
              min="0"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
          </div>

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
                class="h-12 flex-1 rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white">
            </div>
          </div>
        </div>

        <div class="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
          <NuxtLink
            to="/products"
            class="inline-flex justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
            Cancel
          </NuxtLink>

          <button
            type="submit"
            class="inline-flex justify-center rounded-xl bg-[#2879D8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-[#174A78]">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
```
