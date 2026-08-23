<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const notifications = [
  {
    title: 'New order received',
    message: 'Order #ORD-1048 has been placed by Ayesha Khan.',
    time: '5 minutes ago',
    type: 'order',
    unread: true
  },
  {
    title: 'Low stock alert',
    message: 'Mechanical Keyboard is running low. Only 9 items left.',
    time: '28 minutes ago',
    type: 'warning',
    unread: true
  },
  {
    title: 'Payment received',
    message: 'Payment of $189.00 has been successfully received.',
    time: '1 hour ago',
    type: 'payment',
    unread: true
  },
  {
    title: 'Order shipped',
    message: 'Order #ORD-1046 has been shipped to Sara Ahmed.',
    time: '2 hours ago',
    type: 'shipping',
    unread: true
  },
  {
    title: 'New customer registered',
    message: 'Maham Fatima has created a new customer account.',
    time: '4 hours ago',
    type: 'customer',
    unread: false
  },
  {
    title: 'Weekly report is ready',
    message: 'Your weekly business performance report is now available.',
    time: 'Yesterday',
    type: 'report',
    unread: false
  },
  {
    title: 'Product updated',
    message: 'Wireless Headphones product information was updated.',
    time: 'Yesterday',
    type: 'product',
    unread: false
  }
]
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-4 sm:px-8 lg:px-10">
    <!-- Page Header -->
    <div
      class="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div class="mb-3 flex items-center gap-2 text-sm font-medium text-[#2879D8]">
          <span class="h-2 w-2 rounded-full bg-[#4D93E8]" />
          Stay Updated
        </div>

        <h1 class="text-3xl font-bold tracking-tight text-[#173B63] sm:text-4xl">
          Notifications
        </h1>

        <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Stay informed about orders, customers, products and business activity.
        </p>
      </div>

      <button
        class="w-fit rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#2879D8] hover:text-[#2879D8]">
        Mark all as read
      </button>
    </div>

    <!-- Notification Summary -->
    <div class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <!-- Unread -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div class="flex items-center gap-4">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2879D8]">
            ●
          </div>

          <div>
            <p class="text-sm font-medium text-slate-500">
              Unread
            </p>

            <h2 class="mt-1 text-2xl font-bold text-[#173B63]">
              4
            </h2>
          </div>
        </div>
      </div>

      <!-- Today -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div class="flex items-center gap-4">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            ◷
          </div>

          <div>
            <p class="text-sm font-medium text-slate-500">
              Today
            </p>

            <h2 class="mt-1 text-2xl font-bold text-[#173B63]">
              5
            </h2>
          </div>
        </div>
      </div>

      <!-- Total -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div class="flex items-center gap-4">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            ✓
          </div>

          <div>
            <p class="text-sm font-medium text-slate-500">
              Total Notifications
            </p>

            <h2 class="mt-1 text-2xl font-bold text-[#173B63]">
              24
            </h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications Card -->
    <div
      class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <!-- Card Header -->
      <div
        class="flex flex-col gap-4 border-b border-slate-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <h2 class="text-xl font-bold text-[#173B63]">
            Recent Notifications
          </h2>

          <p class="mt-1.5 text-sm text-slate-500">
            Your latest account and business activity.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            class="rounded-lg bg-[#2879D8] px-4 py-2.5 text-xs font-semibold text-white">
            All
          </button>

          <button
            class="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-500 transition hover:border-[#2879D8] hover:text-[#2879D8]">
            Unread
          </button>
        </div>
      </div>

      <!-- Notification List -->
      <div class="divide-y divide-slate-100">
        <div
          v-for="notification in notifications"
          :key="notification.title + notification.time"
          :class="[
            'group flex gap-4 px-6 py-6 transition sm:px-7',
            notification.unread
              ? 'bg-[#F8FBFF]'
              : 'bg-white hover:bg-[#FAFBFD]',
          ]">
          <!-- Icon -->
          <div
            v-if="notification.type === 'order'"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2879D8]">
            #
          </div>

          <div
            v-else-if="notification.type === 'warning'"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            !
          </div>

          <div
            v-else-if="notification.type === 'payment'"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            $
          </div>

          <div
            v-else-if="notification.type === 'shipping'"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            →
          </div>

          <div
            v-else-if="notification.type === 'customer'"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
            +
          </div>

          <div
            v-else-if="notification.type === 'report'"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            ≡
          </div>

          <div
            v-else
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            ✓
          </div>

          <!-- Content -->
          <div class="min-w-0 flex-1">
            <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-bold text-[#173B63]">
                  {{ notification.title }}
                </h3>

                <span
                  v-if="notification.unread"
                  class="h-2 w-2 rounded-full bg-[#2879D8]" />
              </div>

              <span class="shrink-0 text-xs text-slate-400">
                {{ notification.time }}
              </span>
            </div>

            <p class="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {{ notification.message }}
            </p>

            <div class="mt-4 flex items-center gap-3">
              <button
                class="text-xs font-semibold text-[#2879D8] transition hover:text-[#174A78]">
                View details
              </button>

              <span class="text-slate-200">
                |
              </span>

              <button
                class="text-xs font-medium text-slate-400 transition hover:text-slate-600">
                Mark as read
              </button>
            </div>
          </div>

          <!-- More -->
          <button
            class="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 sm:flex">
            ⋮
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="flex items-center justify-center border-t border-slate-100 px-6 py-5">
        <button
          class="text-sm font-semibold text-[#2879D8] transition hover:text-[#174A78]">
          Load more notifications
        </button>
      </div>
    </div>

    <!-- Notification Preferences -->
    <div
      class="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 sm:p-7">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="text-base font-bold text-[#173B63]">
            Manage notification preferences
          </h3>

          <p class="mt-1 text-sm text-slate-500">
            Choose which updates you want to receive.
          </p>
        </div>

        <NuxtLink
          to="/settings"
          class="w-fit rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#2879D8] shadow-sm transition hover:bg-[#2879D8] hover:text-white">
          Notification Settings
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
