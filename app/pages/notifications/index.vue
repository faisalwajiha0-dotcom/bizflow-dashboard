```vue
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

interface Notification {
  id: number
  title: string
  message: string
  time: string
  type: string
  unread: boolean
  details: string
}

const defaultNotifications: Notification[] = [
  {
    id: 1,
    title: 'New order received',
    message: 'Order #ORD-1048 has been placed by Ayesha Khan.',
    time: '5 minutes ago',
    type: 'order',
    unread: true,
    details:
      'Ayesha Khan placed a new order for Wireless Headphones. Order #ORD-1048 has been successfully created.'
  },
  {
    id: 2,
    title: 'Low stock alert',
    message: 'Mechanical Keyboard is running low. Only 9 items left.',
    time: '28 minutes ago',
    type: 'warning',
    unread: true,
    details:
      'Mechanical Keyboard is currently running low. There are only 9 items remaining in stock.'
  },
  {
    id: 3,
    title: 'Payment received',
    message: 'Payment of $189.00 has been successfully received.',
    time: '1 hour ago',
    type: 'payment',
    unread: true,
    details:
      'A payment of $189.00 has been successfully received for the recent order.'
  },
  {
    id: 4,
    title: 'Order shipped',
    message: 'Order #ORD-1046 has been shipped to Sara Ahmed.',
    time: '2 hours ago',
    type: 'shipping',
    unread: true,
    details:
      'Order #ORD-1046 has been shipped successfully and is now on its way to Sara Ahmed.'
  },
  {
    id: 5,
    title: 'New customer registered',
    message: 'Maham Fatima has created a new customer account.',
    time: '4 hours ago',
    type: 'customer',
    unread: false,
    details:
      'Maham Fatima has successfully created a new customer account.'
  },
  {
    id: 6,
    title: 'Weekly report is ready',
    message: 'Your weekly business performance report is now available.',
    time: 'Yesterday',
    type: 'report',
    unread: false,
    details:
      'Your weekly business performance report is now available to review.'
  },
  {
    id: 7,
    title: 'Product updated',
    message: 'Wireless Headphones product information was updated.',
    time: 'Yesterday',
    type: 'product',
    unread: false,
    details:
      'Wireless Headphones product information was successfully updated.'
  },
  {
    id: 8,
    title: 'New order received',
    message: 'Order #ORD-1044 has been placed by Usman Tariq.',
    time: 'Yesterday',
    type: 'order',
    unread: false,
    details:
      'Usman Tariq placed a new order. The order has been successfully added.'
  },
  {
    id: 9,
    title: 'Stock updated',
    message: 'Smart Watch stock quantity has been updated.',
    time: '2 days ago',
    type: 'product',
    unread: false,
    details:
      'The Smart Watch stock quantity has been successfully updated.'
  },
  {
    id: 10,
    title: 'Customer updated',
    message: 'Sara Ahmed customer information was updated.',
    time: '2 days ago',
    type: 'customer',
    unread: false,
    details:
      'Sara Ahmed customer information has been successfully updated.'
  }
]

const notifications = ref<Notification[]>([
  ...defaultNotifications
])

const activeFilter = ref<'all' | 'unread'>('all')

const visibleCount = ref(7)

const selectedNotification = ref<Notification | null>(null)

const isDetailsModalOpen = ref(false)

/* -----------------------------
   LOAD / SAVE
----------------------------- */

const loadNotifications = () => {
  if (!import.meta.client) {
    return
  }

  const saved = localStorage.getItem(
    'dashboard-notifications'
  )

  if (!saved) {
    localStorage.setItem(
      'dashboard-notifications',
      JSON.stringify(notifications.value)
    )

    return
  }

  try {
    notifications.value = JSON.parse(saved)
  }
  catch {
    notifications.value = [
      ...defaultNotifications
    ]
  }
}

const saveNotifications = () => {
  if (!import.meta.client) {
    return
  }

  localStorage.setItem(
    'dashboard-notifications',
    JSON.stringify(notifications.value)
  )
}

onMounted(() => {
  loadNotifications()
})

/* -----------------------------
   COUNTS
----------------------------- */

const unreadCount = computed(() => {
  return notifications.value.filter(
    notification => notification.unread
  ).length
})

const totalCount = computed(() => {
  return notifications.value.length
})

const todayCount = computed(() => {
  return notifications.value.filter(
    notification =>
      notification.time.includes('minutes')
      || notification.time.includes('hour')
  ).length
})

/* -----------------------------
   FILTER
----------------------------- */

const filteredNotifications = computed(() => {
  let result = notifications.value

  if (activeFilter.value === 'unread') {
    result = result.filter(
      notification => notification.unread
    )
  }

  return result.slice(
    0,
    visibleCount.value
  )
})

const hasMoreNotifications = computed(() => {
  const total = activeFilter.value === 'unread'
    ? notifications.value.filter(
      notification => notification.unread
    ).length
    : notifications.value.length

  return visibleCount.value < total
})

/* -----------------------------
   MARK AS READ
----------------------------- */

const markAsRead = (id: number) => {
  const notification = notifications.value.find(
    item => item.id === id
  )

  if (!notification) {
    return
  }

  notification.unread = false

  saveNotifications()

  /*
   * If the notification is currently open
   * in the modal, update it there too.
   */
  if (
    selectedNotification.value?.id === id
  ) {
    selectedNotification.value = {
      ...notification
    }
  }
}

/* -----------------------------
   MARK ALL AS READ
----------------------------- */

const markAllAsRead = () => {
  notifications.value.forEach(
    notification => {
      notification.unread = false
    }
  )

  saveNotifications()
}

/* -----------------------------
   VIEW DETAILS
----------------------------- */

const viewDetails = (
  notification: Notification
) => {
  selectedNotification.value = {
    ...notification
  }

  isDetailsModalOpen.value = true

  /*
   * Opening the notification marks it as read.
   */
  if (notification.unread) {
    notification.unread = false
    saveNotifications()
  }
}

/* -----------------------------
   CLOSE MODAL
----------------------------- */

const closeDetails = () => {
  isDetailsModalOpen.value = false

  setTimeout(() => {
    selectedNotification.value = null
  }, 200)
}

/* -----------------------------
   FILTER BUTTONS
----------------------------- */

const setFilter = (
  filter: 'all' | 'unread'
) => {
  activeFilter.value = filter

  /*
   * Start from the first notifications
   * whenever the filter changes.
   */
  visibleCount.value = 7
}

/* -----------------------------
   LOAD MORE
----------------------------- */

const loadMoreNotifications = () => {
  visibleCount.value += 3
}
const openMenuId = ref<number | null>(null)

const toggleNotificationMenu = (id: number) => {
  openMenuId.value
    = openMenuId.value === id ? null : id
}

const deleteNotification = (id: number) => {
  notifications.value = notifications.value.filter(
    notification => notification.id !== id
  )

  saveNotifications()

  openMenuId.value = null

  if (selectedNotification.value?.id === id) {
    closeDetails()
  }
}

const toggleReadStatus = (id: number) => {
  const notification = notifications.value.find(
    item => item.id === id
  )

  if (!notification) {
    return
  }

  notification.unread = !notification.unread

  saveNotifications()

  openMenuId.value = null

  if (selectedNotification.value?.id === id) {
    selectedNotification.value = {
      ...notification
    }
  }
}
</script>

<template>
  <div
    class="min-h-full bg-[#F5F8FC] px-4 py-4 sm:px-8 lg:px-10">
    <!-- Page Header -->
    <div
      class="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div
          class="mb-3 flex items-center gap-2 text-sm font-medium text-[#2879D8]">
          <span
            class="h-2 w-2 rounded-full bg-[#4D93E8]" />

          Stay Updated
        </div>

        <h1
          class="text-3xl font-bold tracking-tight text-[#173B63] sm:text-4xl">
          Notifications
        </h1>

        <p
          class="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Stay informed about orders, customers, products and business activity.
        </p>
      </div>

      <!-- Mark all -->
      <button
        type="button"
        class="w-fit rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#2879D8] hover:text-[#2879D8]"
        @click="markAllAsRead">
        Mark all as read
      </button>
    </div>

    <!-- Summary -->
    <div
      class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <!-- Unread -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div class="flex items-center gap-4">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2879D8]">
            ●
          </div>

          <div>
            <p
              class="text-sm font-medium text-slate-500">
              Unread
            </p>

            <h2
              class="mt-1 text-2xl font-bold text-[#173B63]">
              {{ unreadCount }}
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
            <p
              class="text-sm font-medium text-slate-500">
              Today
            </p>

            <h2
              class="mt-1 text-2xl font-bold text-[#173B63]">
              {{ todayCount }}
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
            <p
              class="text-sm font-medium text-slate-500">
              Total Notifications
            </p>

            <h2
              class="mt-1 text-2xl font-bold text-[#173B63]">
              {{ totalCount }}
            </h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications Card -->
    <div
      class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <!-- Header -->
      <div
        class="flex flex-col gap-4 border-b border-slate-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <h2
            class="text-xl font-bold text-[#173B63]">
            Recent Notifications
          </h2>

          <p
            class="mt-1.5 text-sm text-slate-500">
            Your latest account and business activity.
          </p>
        </div>

        <!-- Filters -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-lg px-4 py-2.5 text-xs font-semibold transition"
            :class="
              activeFilter === 'all'
                ? 'bg-[#2879D8] text-white'
                : 'border border-slate-200 bg-white text-slate-500 hover:border-[#2879D8] hover:text-[#2879D8]'
            "
            @click="setFilter('all')">
            All
          </button>

          <button
            type="button"
            class="rounded-lg px-4 py-2.5 text-xs font-semibold transition"
            :class="
              activeFilter === 'unread'
                ? 'bg-[#2879D8] text-white'
                : 'border border-slate-200 bg-white text-slate-500 hover:border-[#2879D8] hover:text-[#2879D8]'
            "
            @click="setFilter('unread')">
            Unread
          </button>
        </div>
      </div>

      <!-- List -->
      <div
        v-if="filteredNotifications.length"
        class="divide-y divide-slate-100">
        <div
          v-for="notification in filteredNotifications"
          :key="notification.id"
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
            <div
              class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center gap-2">
                <h3
                  class="text-sm font-bold text-[#173B63]">
                  {{ notification.title }}
                </h3>

                <span
                  v-if="notification.unread"
                  class="h-2 w-2 rounded-full bg-[#2879D8]" />
              </div>

              <span
                class="shrink-0 text-xs text-slate-400">
                {{ notification.time }}
              </span>
            </div>

            <p
              class="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {{ notification.message }}
            </p>

            <!-- Actions -->
            <div
              class="mt-4 flex items-center gap-3">
              <button
                type="button"
                class="text-xs font-semibold text-[#2879D8] transition hover:text-[#174A78]"
                @click="viewDetails(notification)">
                View details
              </button>

              <span class="text-slate-200">
                |
              </span>

              <button
                v-if="notification.unread"
                type="button"
                class="text-xs font-medium text-slate-400 transition hover:text-slate-600"
                @click="markAsRead(notification.id)">
                Mark as read
              </button>

              <span
                v-else
                class="text-xs font-medium text-emerald-500">
                Read
              </span>
            </div>
          </div>

          <!-- More -->
          <div class="relative shrink-0">
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              @click.stop="toggleNotificationMenu(notification.id)">
              ⋮
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="openMenuId === notification.id"
              class="absolute right-0 top-10 z-30 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
              <!-- View -->
              <button
                type="button"
                class="flex w-full items-center px-4 py-2.5 text-left text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#2879D8]"
                @click="
                  viewDetails(notification);
                  openMenuId = null
                ">
                View details
              </button>

              <!-- Read / Unread -->
              <button
                type="button"
                class="flex w-full items-center px-4 py-2.5 text-left text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#2879D8]"
                @click="toggleReadStatus(notification.id)">
                {{
                  notification.unread
                    ? 'Mark as read'
                    : 'Mark as unread'
                }}
              </button>

              <!-- Delete -->
              <button
                type="button"
                class="flex w-full items-center px-4 py-2.5 text-left text-xs font-medium text-red-500 transition hover:bg-red-50"
                @click="deleteNotification(notification.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty unread -->
      <div
        v-else
        class="px-6 py-16 text-center">
        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
          ✓
        </div>

        <h3
          class="mt-4 text-lg font-bold text-[#173B63]">
          No unread notifications
        </h3>

        <p
          class="mt-2 text-sm text-slate-500">
          You're all caught up!
        </p>
      </div>

      <!-- Load more -->
      <div
        class="flex items-center justify-center border-t border-slate-100 px-6 py-5">
        <button
          v-if="hasMoreNotifications"
          type="button"
          class="text-sm font-semibold text-[#2879D8] transition hover:text-[#174A78]"
          @click="loadMoreNotifications">
          Load more notifications
        </button>

        <span
          v-else
          class="text-sm text-slate-400">
          No more notifications
        </span>
      </div>
    </div>

    <!-- Settings -->
    <div
      class="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 sm:p-7">
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3
            class="text-base font-bold text-[#173B63]">
            Manage notification preferences
          </h3>

          <p
            class="mt-1 text-sm text-slate-500">
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

    <!-- View Details Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isDetailsModalOpen && selectedNotification"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
          @click.self="closeDetails">
          <div
            class="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <!-- Modal Header -->
            <div
              class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p
                  class="text-xs font-semibold uppercase tracking-wider text-[#2879D8]">
                  Notification Details
                </p>

                <h2
                  class="mt-1 text-xl font-bold text-[#173B63]">
                  {{ selectedNotification.title }}
                </h2>
              </div>

              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                @click="closeDetails">
                ×
              </button>
            </div>

            <!-- Modal Body -->
            <div class="px-6 py-6">
              <div
                class="rounded-xl bg-[#F8FAFD] p-4">
                <p
                  class="text-sm leading-6 text-slate-600">
                  {{ selectedNotification.details }}
                </p>
              </div>

              <div
                class="mt-5 grid grid-cols-2 gap-4">
                <div
                  class="rounded-xl border border-slate-100 p-4">
                  <p
                    class="text-xs font-medium text-slate-400">
                    Time
                  </p>

                  <p
                    class="mt-1 text-sm font-semibold text-[#173B63]">
                    {{ selectedNotification.time }}
                  </p>
                </div>

                <div
                  class="rounded-xl border border-slate-100 p-4">
                  <p
                    class="text-xs font-medium text-slate-400">
                    Status
                  </p>

                  <p
                    class="mt-1 text-sm font-semibold"
                    :class="
                      selectedNotification.unread
                        ? 'text-[#2879D8]'
                        : 'text-emerald-500'
                    ">
                    {{
                      selectedNotification.unread
                        ? 'Unread'
                        : 'Read'
                    }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div
              class="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-5">
              <button
                type="button"
                class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                @click="closeDetails">
                Close
              </button>

              <button
                v-if="selectedNotification.unread"
                type="button"
                class="rounded-xl bg-[#2879D8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#174A78]"
                @click="markAsRead(selectedNotification.id)">
                Mark as read
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```
