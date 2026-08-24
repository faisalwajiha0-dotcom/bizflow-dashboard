<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()

const { orders, loadOrders } = useOrders()

onMounted(() => {
  loadOrders()
})

const orderId = computed(() => {
  return decodeURIComponent(String(route.params.id))
})

const order = computed(() => {
  return orders.value.find(
    item => item.id === orderId.value
  )
})

const goBack = () => {
  router.push('/orders')
}
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-6 sm:px-8 lg:px-10">
    <!-- Header -->
    <div class="mb-8">
      <button
        type="button"
        class="mb-4 text-sm font-semibold text-[#2879D8] hover:text-[#174A78]"
        @click="goBack">
        ← Back to Orders
      </button>

      <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-medium text-[#2879D8]">
            Order Details
          </p>

          <h1 class="mt-1 text-3xl font-bold tracking-tight text-[#173B63]">
            {{ order?.id }}
          </h1>

          <p class="mt-2 text-sm text-slate-500">
            View complete information about this order.
          </p>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div
      v-if="!order"
      class="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h2 class="text-xl font-bold text-[#173B63]">
        Order Not Found
      </h2>

      <p class="mt-2 text-sm text-slate-500">
        This order may have been deleted or does not exist.
      </p>

      <button
        type="button"
        class="mt-5 rounded-xl bg-[#2879D8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#174A78]"
        @click="goBack">
        Back to Orders
      </button>
    </div>

    <!-- Order Details -->
    <div
      v-else
      class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <!-- Main -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7 xl:col-span-2">
        <div class="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div
            :class="order.avatar"
            class="flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold">
            {{ order.initials }}
          </div>

          <div>
            <h2 class="text-xl font-bold text-[#173B63]">
              {{ order.customer }}
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              {{ order.email }}
            </p>
          </div>
        </div>

        <div class="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Product
            </p>

            <p class="mt-2 text-sm font-semibold text-[#173B63]">
              {{ order.product }}
            </p>
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Order Date
            </p>

            <p class="mt-2 text-sm font-semibold text-[#173B63]">
              {{ order.date }}
            </p>
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Amount
            </p>

            <p class="mt-2 text-lg font-bold text-[#2879D8]">
              {{ order.amount }}
            </p>
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Order ID
            </p>

            <p class="mt-2 text-sm font-semibold text-[#173B63]">
              {{ order.id }}
            </p>
          </div>
        </div>
      </div>

      <!-- Status -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 class="text-lg font-bold text-[#173B63]">
          Order Status
        </h2>

        <div class="mt-6">
          <span
            class="inline-flex rounded-full px-4 py-2 text-sm font-semibold"
            :class="{
              'bg-emerald-50 text-emerald-600': order.status === 'Delivered',
              'bg-blue-50 text-[#2879D8]': order.status === 'Processing',
              'bg-purple-50 text-purple-600': order.status === 'Shipped',
              'bg-orange-50 text-orange-600': order.status === 'Pending',
              'bg-red-50 text-red-600': order.status === 'Cancelled',
            }">
            {{ order.status }}
          </span>
        </div>

        <div class="mt-8 border-t border-slate-100 pt-6">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Customer
          </p>

          <p class="mt-2 text-sm font-semibold text-[#173B63]">
            {{ order.customer }}
          </p>

          <p class="mt-1 text-sm text-slate-500">
            {{ order.email }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
