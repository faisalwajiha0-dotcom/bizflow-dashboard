```vue
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

interface Settings {
  language: string
  timezone: string
  darkMode: boolean
  emailNotifications: boolean
  orderNotifications: boolean
  lowStockAlerts: boolean
  marketingEmails: boolean
}

const defaultSettings: Settings = {
  language: 'English',
  timezone: 'Pakistan Standard Time',
  darkMode: false,
  emailNotifications: true,
  orderNotifications: true,
  lowStockAlerts: true,
  marketingEmails: false
}

const settings = reactive<Settings>({
  ...defaultSettings
})

const saved = ref(false)
const showDeactivateModal = ref(false)
const deactivated = ref(false)

const saveSettings = () => {
  if (import.meta.client) {
    localStorage.setItem(
      'dashboard-settings',
      JSON.stringify(settings)
    )
  }

  saved.value = true

  setTimeout(() => {
    saved.value = false
  }, 2500)
}

const loadSettings = () => {
  if (!import.meta.client) {
    return
  }

  const savedSettings = localStorage.getItem('dashboard-settings')

  if (!savedSettings) {
    return
  }

  try {
    Object.assign(settings, JSON.parse(savedSettings))
  }
  catch {
    Object.assign(settings, defaultSettings)
  }
}

const toggleSetting = (
  setting:
    | 'darkMode'
    | 'emailNotifications'
    | 'orderNotifications'
    | 'lowStockAlerts'
    | 'marketingEmails'
) => {
  settings[setting] = !settings[setting]
}

const deactivateAccount = () => {
  deactivated.value = true
  showDeactivateModal.value = false

  if (import.meta.client) {
    localStorage.setItem(
      'account-status',
      'deactivated'
    )
  }
}

const cancelDeactivate = () => {
  showDeactivateModal.value = false
}

onMounted(() => {
  loadSettings()

  if (import.meta.client) {
    const accountStatus = localStorage.getItem('account-status')

    if (accountStatus === 'deactivated') {
      deactivated.value = true
    }
  }
})
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-4 sm:px-8 lg:px-10">
    <!-- Page Header -->
    <div class="mb-6">
      <div class="mb-2 flex items-center gap-2 text-sm font-medium text-[#2879D8]">
        <span class="h-2 w-2 rounded-full bg-[#4D93E8]" />
        System Preferences
      </div>

      <h1 class="text-3xl font-bold tracking-tight text-[#173B63] sm:text-4xl">
        Settings
      </h1>

      <p class="mt-1.5 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
        Manage your account preferences, notifications and dashboard settings.
      </p>
    </div>

    <!-- Settings Layout -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <!-- Main Settings -->
      <div class="space-y-6 xl:col-span-2">
        <!-- General Settings -->
        <div class="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div class="border-b border-slate-100 px-6 py-5 sm:px-7">
            <h2 class="text-lg font-bold text-[#173B63]">
              General Settings
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              Manage your basic dashboard preferences.
            </p>
          </div>

          <div class="divide-y divide-slate-100">
            <!-- Language -->
            <div class="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <p class="text-sm font-semibold text-[#173B63]">
                  Language
                </p>

                <p class="mt-1 text-xs text-slate-400">
                  Choose your preferred dashboard language.
                </p>
              </div>

              <select
                v-model="settings.language"
                class="w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-2.5 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] sm:w-44">
                <option value="English">
                  English
                </option>

                <option value="Urdu">
                  Urdu
                </option>
              </select>
            </div>

            <!-- Time Zone -->
            <div class="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <p class="text-sm font-semibold text-[#173B63]">
                  Time Zone
                </p>

                <p class="mt-1 text-xs text-slate-400">
                  Set the timezone used throughout BizFlow.
                </p>
              </div>

              <select
                v-model="settings.timezone"
                class="w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-2.5 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] sm:w-52">
                <option value="Pakistan Standard Time">
                  Pakistan Standard Time
                </option>

                <option value="UTC">
                  UTC
                </option>

                <option value="Eastern Time">
                  Eastern Time
                </option>
              </select>
            </div>

            <!-- Dark Mode -->
            <div class="flex items-center justify-between gap-4 px-6 py-5 sm:px-7">
              <div>
                <p class="text-sm font-semibold text-[#173B63]">
                  Dark Mode
                </p>

                <p class="mt-1 text-xs text-slate-400">
                  Use a darker appearance for your dashboard.
                </p>
              </div>

              <button
                type="button"
                :aria-pressed="settings.darkMode"
                class="relative h-6 w-11 shrink-0 rounded-full transition"
                :class="settings.darkMode ? 'bg-[#2879D8]' : 'bg-slate-200'"
                @click="toggleSetting('darkMode')">
                <span
                  class="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="settings.darkMode ? 'left-6' : 'left-1'" />
              </button>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div class="border-b border-slate-100 px-6 py-5 sm:px-7">
            <h2 class="text-lg font-bold text-[#173B63]">
              Notifications
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              Choose which notifications you want to receive.
            </p>
          </div>

          <div class="divide-y divide-slate-100">
            <!-- Email Notifications -->
            <div class="flex items-center justify-between gap-4 px-6 py-5 sm:px-7">
              <div>
                <p class="text-sm font-semibold text-[#173B63]">
                  Email Notifications
                </p>

                <p class="mt-1 text-xs text-slate-400">
                  Receive important account updates by email.
                </p>
              </div>

              <button
                type="button"
                :aria-pressed="settings.emailNotifications"
                class="relative h-6 w-11 shrink-0 rounded-full transition"
                :class="settings.emailNotifications ? 'bg-[#2879D8]' : 'bg-slate-200'"
                @click="toggleSetting('emailNotifications')">
                <span
                  class="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="settings.emailNotifications ? 'left-6' : 'left-1'" />
              </button>
            </div>

            <!-- Order Notifications -->
            <div class="flex items-center justify-between gap-4 px-6 py-5 sm:px-7">
              <div>
                <p class="text-sm font-semibold text-[#173B63]">
                  Order Notifications
                </p>

                <p class="mt-1 text-xs text-slate-400">
                  Get notified when a new order is placed.
                </p>
              </div>

              <button
                type="button"
                :aria-pressed="settings.orderNotifications"
                class="relative h-6 w-11 shrink-0 rounded-full transition"
                :class="settings.orderNotifications ? 'bg-[#2879D8]' : 'bg-slate-200'"
                @click="toggleSetting('orderNotifications')">
                <span
                  class="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="settings.orderNotifications ? 'left-6' : 'left-1'" />
              </button>
            </div>

            <!-- Low Stock -->
            <div class="flex items-center justify-between gap-4 px-6 py-5 sm:px-7">
              <div>
                <p class="text-sm font-semibold text-[#173B63]">
                  Low Stock Alerts
                </p>

                <p class="mt-1 text-xs text-slate-400">
                  Get an alert when products are running low.
                </p>
              </div>

              <button
                type="button"
                :aria-pressed="settings.lowStockAlerts"
                class="relative h-6 w-11 shrink-0 rounded-full transition"
                :class="settings.lowStockAlerts ? 'bg-[#2879D8]' : 'bg-slate-200'"
                @click="toggleSetting('lowStockAlerts')">
                <span
                  class="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="settings.lowStockAlerts ? 'left-6' : 'left-1'" />
              </button>
            </div>

            <!-- Product Updates -->
            <div class="flex items-center justify-between gap-4 px-6 py-5 sm:px-7">
              <div>
                <p class="text-sm font-semibold text-[#173B63]">
                  Product Updates
                </p>

                <p class="mt-1 text-xs text-slate-400">
                  Receive news and updates about BizFlow.
                </p>
              </div>

              <button
                type="button"
                :aria-pressed="settings.marketingEmails"
                class="relative h-6 w-11 shrink-0 rounded-full transition"
                :class="settings.marketingEmails ? 'bg-[#2879D8]' : 'bg-slate-200'"
                @click="toggleSetting('marketingEmails')">
                <span
                  class="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="settings.marketingEmails ? 'left-6' : 'left-1'" />
              </button>
            </div>
          </div>
        </div>

        <!-- Save Changes -->
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            v-if="saved"
            class="text-sm font-medium text-emerald-600">
            ✓ Settings saved successfully
          </p>

          <div v-else />

          <button
            type="button"
            class="inline-flex w-fit items-center justify-center rounded-xl bg-[#2879D8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-[#174A78]"
            @click="saveSettings">
            Save Changes
          </button>
        </div>
      </div>

      <!-- Right Side -->
      <div class="space-y-6">
        <!-- Account Card -->
        <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-bold text-[#173B63]">
            Account
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Your current account information.
          </p>

          <div class="mt-6 space-y-5">
            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
                Account Name
              </p>

              <p class="mt-1 text-sm font-semibold text-[#173B63]">
                Wajiha Faisal
              </p>
            </div>

            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
                Role
              </p>

              <span class="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#2879D8]">
                Administrator
              </span>
            </div>

            <div>
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
                Account Status
              </p>

              <span
                v-if="!deactivated"
                class="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                Active
              </span>

              <span
                v-else
                class="mt-2 inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                Deactivated
              </span>
            </div>
          </div>
        </div>

        <!-- Security Card -->
        <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl text-[#2879D8]">
            🔒
          </div>

          <h2 class="mt-5 text-lg font-bold text-[#173B63]">
            Security
          </h2>

          <p class="mt-1.5 text-sm leading-6 text-slate-500">
            Keep your account secure with a strong password and regular security checks.
          </p>

          <NuxtLink
            to="/profile"
            class="mt-5 inline-flex items-center text-sm font-semibold text-[#2879D8] transition hover:text-[#174A78]">
            Manage security
            <span class="ml-2">→</span>
          </NuxtLink>
        </div>

        <!-- Danger Zone -->
        <div class="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-bold text-red-600">
            Danger Zone
          </h2>

          <p class="mt-1.5 text-sm leading-6 text-slate-500">
            These actions can affect your account permanently.
          </p>

          <button
            v-if="!deactivated"
            type="button"
            class="mt-5 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
            @click="showDeactivateModal = true">
            Deactivate Account
          </button>

          <button
            v-else
            type="button"
            disabled
            class="mt-5 cursor-not-allowed rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-400">
            Account Deactivated
          </button>
        </div>
      </div>
    </div>

    <!-- Deactivate Confirmation Modal -->
    <div
      v-if="showDeactivateModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
      @click.self="cancelDeactivate">
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div class="flex items-start gap-4">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl">
            ⚠️
          </div>

          <div>
            <h2 class="text-xl font-bold text-[#173B63]">
              Deactivate Account?
            </h2>

            <p class="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to deactivate your account?
              This will mark your account as deactivated.
            </p>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button
            type="button"
            class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            @click="cancelDeactivate">
            Cancel
          </button>

          <button
            type="button"
            class="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
            @click="deactivateAccount">
            Yes, Deactivate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
```
