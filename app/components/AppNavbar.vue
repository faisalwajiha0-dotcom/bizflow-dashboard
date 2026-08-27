```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits<{
  openSidebar: []
}>()

const searchQuery = ref('')
const showNotifications = ref(false)

const notifications = ref([
  {
    id: 1,
    title: 'New Order Received',
    message: 'A new order #BF-1024 has been placed.',
    time: '5 min ago',
    type: 'order',
    read: false,
  },
  {
    id: 2,
    title: 'Low Stock Alert',
    message: 'Wireless Headphones are running low.',
    time: '20 min ago',
    type: 'stock',
    read: false,
  },
  {
    id: 3,
    title: 'New Order Received',
    message: 'A new order #BF-1023 has been placed.',
    time: '1 hour ago',
    type: 'order',
    read: false,
  },
])

const unreadCount = ref(
  notifications.value.filter(notification => !notification.read).length
)

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const markAsRead = (id: number) => {
  const notification = notifications.value.find(
    item => item.id === id
  )

  if (notification) {
    notification.read = true

    unreadCount.value = notifications.value.filter(
      item => !item.read
    ).length
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })

  unreadCount.value = 0
}

const clearSearch = () => {
  searchQuery.value = ''
}

const handleOutsideClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  if (!target.closest('.notification-wrapper')) {
    showNotifications.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <header
    class="fixed left-0 right-0 top-0 z-20 h-20 border-b border-slate-200 bg-white px-4 sm:px-6 md:left-64 md:px-8">
    <div class="flex h-full items-center justify-between gap-3">
      <!-- Left Side -->
      <div class="flex min-w-0 items-center gap-3">
        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl text-[#173B63] transition hover:bg-slate-50 md:hidden"
          aria-label="Open menu"
          @click="emit('openSidebar')">
          ☰
        </button>

        <!-- Heading -->
        <div class="min-w-0">
          <h2
            class="truncate text-lg font-bold text-[#173B63] sm:text-2xl">
            Dashboard
          </h2>

          <p class="hidden text-sm text-slate-500 sm:block">
            Welcome back! Here's what's happening today.
          </p>
        </div>
      </div>

      <!-- Right Side -->
      <div class="flex items-center gap-2 sm:gap-5">
        <!-- Search -->
        <div
          class="hidden items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 lg:flex">
          <span class="text-slate-400">
            ⌕
          </span>

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search anything..."
            class="w-48 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400">

          <button
            v-if="searchQuery"
            type="button"
            class="text-sm text-slate-400 transition hover:text-slate-700"
            @click="clearSearch">
            ×
          </button>
        </div>

        <!-- Search Result -->
        <div
          v-if="searchQuery"
          class="absolute right-20 top-18 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg lg:right-36">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Search
          </p>

          <p class="mt-2 text-sm text-[#173B63]">
            Searching for:

            <span class="font-semibold">
              {{ searchQuery }}
            </span>
          </p>

          <div class="mt-3 space-y-2">
            <NuxtLink
              v-if="searchQuery.toLowerCase().includes('product')"
              to="/products"
              class="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50">
              📦 Products
            </NuxtLink>

            <NuxtLink
              v-if="searchQuery.toLowerCase().includes('order')"
              to="/orders"
              class="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50">
              🛍 Orders
            </NuxtLink>

            <NuxtLink
              v-if="searchQuery.toLowerCase().includes('analytic')"
              to="/analytics"
              class="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50">
              📊 Analytics
            </NuxtLink>

            <NuxtLink
              v-if="searchQuery.toLowerCase().includes('setting')"
              to="/settings"
              class="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50">
              ⚙ Settings
            </NuxtLink>

            <p
              v-if="
                !searchQuery.toLowerCase().includes('product')
                  && !searchQuery.toLowerCase().includes('order')
                  && !searchQuery.toLowerCase().includes('analytic')
                  && !searchQuery.toLowerCase().includes('setting')
              "
              class="text-sm text-slate-400">
              No matching page found.
            </p>
          </div>
        </div>

        <!-- Notification -->
        <div class="notification-wrapper relative">
          <button
            type="button"
            class="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 sm:h-11 sm:w-11"
            @click.stop="toggleNotifications">
            ♢

            <!-- Notification Badge -->
            <span
              v-if="unreadCount > 0"
              class="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 text-[9px] font-bold text-white">
              {{ unreadCount }}
            </span>
          </button>

          <!-- Notification Panel -->
          <div
            v-if="showNotifications"
            class="absolute right-0 top-14 w-[calc(100vw-2rem)] max-w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <!-- Panel Header -->
            <div
              class="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 class="font-bold text-[#173B63]">
                  Notifications
                </h3>

                <p class="text-xs text-slate-400">
                  {{ unreadCount }} unread notification<span
                    v-if="unreadCount !== 1">s</span>
                </p>
              </div>

              <button
                v-if="unreadCount > 0"
                type="button"
                class="text-xs font-semibold text-blue-600 hover:text-blue-800"
                @click="markAllAsRead">
                Mark all read
              </button>
            </div>

            <!-- Notifications -->
            <div class="max-h-80 overflow-y-auto">
              <button
                v-for="notification in notifications"
                :key="notification.id"
                type="button"
                class="flex w-full gap-3 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
                :class="
                  !notification.read
                    ? 'bg-blue-50/40'
                    : 'bg-white'
                "
                @click="markAsRead(notification.id)">
                <!-- Icon -->
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  :class="
                    notification.type === 'order'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-orange-50 text-orange-500'
                  ">
                  <span v-if="notification.type === 'order'">
                    🛍
                  </span>

                  <span v-else>
                    ⚠
                  </span>
                </div>

                <!-- Content -->
                <div class="min-w-0 flex-1">
                  <div class="flex items-start justify-between gap-2">
                    <p class="text-sm font-semibold text-[#173B63]">
                      {{ notification.title }}
                    </p>

                    <span
                      v-if="!notification.read"
                      class="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  </div>

                  <p class="mt-1 text-xs leading-5 text-slate-500">
                    {{ notification.message }}
                  </p>

                  <p class="mt-1 text-[11px] text-slate-400">
                    {{ notification.time }}
                  </p>
                </div>
              </button>
            </div>

            <!-- Empty State -->
            <div
              v-if="notifications.length === 0"
              class="px-5 py-8 text-center">
              <p class="text-sm text-slate-400">
                No notifications
              </p>
            </div>
          </div>
        </div>

        <!-- Profile -->
        <NuxtLink
          to="/profile"
          class="flex items-center gap-2 rounded-xl px-1 py-1.5 transition hover:bg-slate-50 sm:gap-3 sm:px-2">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2879D8] text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm">
            WF
          </div>

          <div class="hidden text-left sm:block">
            <p class="text-sm font-bold text-[#173B63]">
              Wajiha Faisal
            </p>

            <p class="text-xs text-slate-400">
              Administrator
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
```
