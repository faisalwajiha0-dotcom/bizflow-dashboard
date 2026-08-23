<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const emailNotifications = ref(true)
const orderNotifications = ref(true)
const lowStockAlerts = ref(true)
const marketingEmails = ref(false)
const darkMode = ref(false)

const saved = ref(false)

const saveSettings = () => {
  saved.value = true

  setTimeout(() => {
    saved.value = false
  }, 2500)
}
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
                class="w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-2.5 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] sm:w-44">
                <option>English</option>
                <option>Urdu</option>
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
                class="w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-2.5 text-sm text-slate-600 outline-none transition focus:border-[#2879D8] sm:w-52">
                <option>Pakistan Standard Time</option>
                <option>UTC</option>
                <option>Eastern Time</option>
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
                class="relative h-6 w-11 shrink-0 rounded-full transition"
                :class="darkMode ? 'bg-[#2879D8]' : 'bg-slate-200'"
                @click="darkMode = !darkMode">
                <span
                  class="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="darkMode ? 'left-6' : 'left-1'" />
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
                class="relative h-6 w-11 shrink-0 rounded-full transition"
                :class="emailNotifications ? 'bg-[#2879D8]' : 'bg-slate-200'"
                @click="emailNotifications = !emailNotifications">
                <span
                  class="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="emailNotifications ? 'left-6' : 'left-1'" />
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
                class="relative h-6 w-11 shrink-0 rounded-full transition"
                :class="orderNotifications ? 'bg-[#2879D8]' : 'bg-slate-200'"
                @click="orderNotifications = !orderNotifications">
                <span
                  class="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="orderNotifications ? 'left-6' : 'left-1'" />
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
                class="relative h-6 w-11 shrink-0 rounded-full transition"
                :class="lowStockAlerts ? 'bg-[#2879D8]' : 'bg-slate-200'"
                @click="lowStockAlerts = !lowStockAlerts">
                <span
                  class="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="lowStockAlerts ? 'left-6' : 'left-1'" />
              </button>
            </div>

            <!-- Marketing -->
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
                class="relative h-6 w-11 shrink-0 rounded-full transition"
                :class="marketingEmails ? 'bg-[#2879D8]' : 'bg-slate-200'"
                @click="marketingEmails = !marketingEmails">
                <span
                  class="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition"
                  :class="marketingEmails ? 'left-6' : 'left-1'" />
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

              <span class="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                Active
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
            type="button"
            class="mt-5 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50">
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
