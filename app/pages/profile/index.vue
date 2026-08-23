<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const profile = {
  name: 'Wajiha Faisal',
  email: 'wajiha@example.com',
  phone: '+92 300 1234567',
  role: 'Administrator',
  location: 'Pakistan',
  joined: 'January 2026'
}
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-4 sm:px-8 lg:px-10">
    <!-- Page Header -->
    <div class="mb-6">
      <div class="mb-3 flex items-center gap-2 text-sm font-medium text-[#2879D8]">
        <span class="h-2 w-2 rounded-full bg-[#4D93E8]" />
        Account Management
      </div>

      <h1 class="text-3xl font-bold tracking-tight text-[#173B63] sm:text-4xl">
        Profile
      </h1>

      <p class="mt-1.5 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
        Manage your personal information and account details.
      </p>
    </div>

    <!-- Profile Info -->
    <div class="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm sm:px-6">
      <div
        class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <!-- Left: Avatar + Name -->
        <div class="flex items-center gap-4 rounded-2xl  px-5 py-4 ">
          <!-- Avatar -->
          <div
            class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#DCEBFA] bg-[#4D93E8] text-lg font-bold text-white shadow-md">
            WF
          </div>

          <!-- Name -->
          <div>
            <h2 class="text-xl font-bold text-[#173B63] sm:text-2xl">
              {{ profile.name }}
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              {{ profile.email }}
            </p>

            <div class="mt-2 flex flex-wrap items-center gap-2">
              <span
                class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2879D8]">
                {{ profile.role }}
              </span>

              <span
                class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                Active
              </span>
            </div>
          </div>
        </div>

        <!-- Edit Profile -->
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-xl border border-[#2879D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#2879D8] transition hover:bg-blue-50">
          <span>✎</span>
          Edit Profile
        </button>
      </div>
    </div>
  </div>

  <!-- Main Grid -->
  <div class="grid grid-cols-1 gap-8 xl:grid-cols-3">
    <!-- Personal Information -->
    <div
      class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7 xl:col-span-2">
      <!-- Heading -->
      <div class="mb-8 flex items-start justify-between">
        <div>
          <h2 class="text-xl font-bold text-[#173B63]">
            Personal Information
          </h2>

          <p class="mt-1.5 text-sm text-slate-500">
            Your basic personal and contact information.
          </p>
        </div>

        <div
          class="hidden h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2879D8] sm:flex">
          ✦
        </div>
      </div>

      <!-- Form -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <!-- Name -->
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-600">
            Full Name
          </label>

          <input
            :value="profile.name"
            type="text"
            class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50">
        </div>

        <!-- Email -->
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-600">
            Email Address
          </label>

          <input
            :value="profile.email"
            type="email"
            class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50">
        </div>

        <!-- Phone -->
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-600">
            Phone Number
          </label>

          <input
            :value="profile.phone"
            type="text"
            class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50">
        </div>

        <!-- Location -->
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-600">
            Location
          </label>

          <input
            :value="profile.location"
            type="text"
            class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50">
        </div>
      </div>

      <!-- About -->
      <div class="mt-7">
        <label class="mb-2 block text-sm font-semibold text-slate-600">
          About
        </label>

        <textarea
          rows="4"
          class="w-full resize-none rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50"
          placeholder="Write something about yourself...">Business administrator managing products, orders, customers and daily business operations through BizFlow.</textarea>
      </div>

      <!-- Save -->
      <div class="mt-8 flex justify-end border-t border-slate-100 pt-6">
        <button
          class="inline-flex items-center gap-2 rounded-xl bg-[#2879D8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-[#174A78]">
          Save Changes
          <span>→</span>
        </button>
      </div>
    </div>

    <!-- Right Column -->
    <div class="space-y-8">
      <!-- Account Status -->
      <div
        class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-6">
          <h2 class="text-lg font-bold text-[#173B63]">
            Account Status
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Overview of your account.
          </p>
        </div>

        <div class="space-y-5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <span class="text-sm text-slate-500">
              Status
            </span>

            <span
              class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active
            </span>
          </div>

          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <span class="text-sm text-slate-500">
              Role
            </span>

            <span class="text-sm font-semibold text-[#173B63]">
              Administrator
            </span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-slate-500">
              Member Since
            </span>

            <span class="text-sm font-semibold text-[#173B63]">
              {{ profile.joined }}
            </span>
          </div>
        </div>
      </div>

      <!-- Profile Activity -->
      <div
        class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="mb-6">
          <h2 class="text-lg font-bold text-[#173B63]">
            Profile Activity
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Recent account activity.
          </p>
        </div>

        <div class="space-y-6">
          <!-- Activity 1 -->
          <div class="flex gap-3">
            <div class="relative flex flex-col items-center">
              <span class="mt-1.5 h-3 w-3 rounded-full bg-[#2879D8]" />
              <span class="absolute top-5 h-12 w-px bg-slate-200" />
            </div>

            <div>
              <p class="text-sm font-semibold text-[#173B63]">
                Profile updated
              </p>

              <p class="mt-1 text-xs text-slate-400">
                Today at 9:42 AM
              </p>
            </div>
          </div>

          <!-- Activity 2 -->
          <div class="flex gap-3">
            <div class="relative flex flex-col items-center">
              <span class="mt-1.5 h-3 w-3 rounded-full bg-emerald-500" />
              <span class="absolute top-5 h-12 w-px bg-slate-200" />
            </div>

            <div>
              <p class="text-sm font-semibold text-[#173B63]">
                Account verified
              </p>

              <p class="mt-1 text-xs text-slate-400">
                January 15, 2026
              </p>
            </div>
          </div>

          <!-- Activity 3 -->
          <div class="flex gap-3">
            <div class="flex flex-col items-center">
              <span class="mt-1.5 h-3 w-3 rounded-full bg-purple-500" />
            </div>

            <div>
              <p class="text-sm font-semibold text-[#173B63]">
                Account created
              </p>

              <p class="mt-1 text-xs text-slate-400">
                January 10, 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Security -->
  <div
    class="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
    <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-start gap-4">
        <div
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2879D8]">
          🔒
        </div>

        <div>
          <h2 class="text-lg font-bold text-[#173B63]">
            Password & Security
          </h2>

          <p class="mt-1.5 text-sm text-slate-500">
            Keep your account secure by using a strong password.
          </p>
        </div>
      </div>

      <button
        class="w-fit rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-[#2879D8] hover:bg-blue-50 hover:text-[#2879D8]">
        Change Password
      </button>
    </div>
  </div>
</template>
