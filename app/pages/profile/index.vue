```vue
```vue
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

interface Profile {
  name: string
  email: string
  phone: string
  role: string
  location: string
  joined: string
  about: string
}

interface Activity {
  title: string
  time: string
  color: string
}

const defaultProfile: Profile = {
  name: 'Wajiha Faisal',
  email: 'wajiha@example.com',
  phone: '+92 300 1234567',
  role: 'Administrator',
  location: 'Pakistan',
  joined: 'January 2026',
  about:
    'Business administrator managing products, orders, customers and daily business operations through BizFlow.'
}

/* --------------------------------
   PROFILE
-------------------------------- */

const profile = reactive<Profile>({
  ...defaultProfile
})

const editingProfile = reactive<Profile>({
  ...defaultProfile
})

const isEditing = ref(false)

/* --------------------------------
   PASSWORD
-------------------------------- */

const showPasswordModal = ref(false)

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordError = ref('')
const passwordSuccess = ref(false)

/* --------------------------------
   ACTIVITY
-------------------------------- */

const activities = ref<Activity[]>([
  {
    title: 'Profile updated',
    time: 'Today at 9:42 AM',
    color: 'bg-[#2879D8]'
  },
  {
    title: 'Account verified',
    time: 'January 15, 2026',
    color: 'bg-emerald-500'
  },
  {
    title: 'Account created',
    time: 'January 10, 2026',
    color: 'bg-purple-500'
  }
])

const toast = useToast()

/* --------------------------------
   AVATAR INITIALS
-------------------------------- */

const avatarInitials = computed(() => {
  return profile.name
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
})

/* --------------------------------
   EDIT PROFILE
-------------------------------- */

const openEditProfile = () => {
  Object.assign(editingProfile, profile)

  isEditing.value = true

  nextTick(() => {
    document
      .getElementById('personal-information')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
  })
}

const cancelEditing = () => {
  Object.assign(editingProfile, profile)

  isEditing.value = false
}

const saveProfile = () => {
  if (!editingProfile.name.trim()) {
    toast.add({
      title: 'Name Required',
      description: 'Please enter your full name.',
      color: 'error'
    })

    return
  }

  if (!editingProfile.email.trim()) {
    toast.add({
      title: 'Email Required',
      description: 'Please enter your email address.',
      color: 'error'
    })

    return
  }

  Object.assign(profile, editingProfile)

  if (import.meta.client) {
    localStorage.setItem(
      'dashboard-profile',
      JSON.stringify(profile)
    )
  }

  activities.value.unshift({
    title: 'Profile updated',
    time: 'Just now',
    color: 'bg-[#2879D8]'
  })

  isEditing.value = false

  toast.add({
    title: 'Profile Updated',
    description:
      'Your profile information has been updated successfully.',
    color: 'success'
  })
}

/* --------------------------------
   PASSWORD MODAL
-------------------------------- */

const openPasswordModal = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''

  passwordError.value = ''
  passwordSuccess.value = false

  showPasswordModal.value = true
}

const closePasswordModal = () => {
  showPasswordModal.value = false
  passwordError.value = ''
  passwordSuccess.value = false
}

const changePassword = () => {
  passwordError.value = ''
  passwordSuccess.value = false

  if (!passwordForm.currentPassword) {
    passwordError.value
      = 'Please enter your current password.'
    return
  }

  if (!passwordForm.newPassword) {
    passwordError.value
      = 'Please enter a new password.'
    return
  }

  if (passwordForm.newPassword.length < 6) {
    passwordError.value
      = 'New password must be at least 6 characters.'
    return
  }

  if (
    passwordForm.newPassword
    !== passwordForm.confirmPassword
  ) {
    passwordError.value
      = 'New password and confirm password do not match.'
    return
  }

  if (import.meta.client) {
    localStorage.setItem(
      'dashboard-password',
      passwordForm.newPassword
    )
  }

  passwordSuccess.value = true

  toast.add({
    title: 'Password Changed',
    description:
      'Your account password has been updated successfully.',
    color: 'success'
  })

  setTimeout(() => {
    closePasswordModal()
  }, 1200)
}

/* --------------------------------
   LOAD SAVED PROFILE
-------------------------------- */

onMounted(() => {
  if (!import.meta.client) {
    return
  }

  const savedProfile = localStorage.getItem(
    'dashboard-profile'
  )

  if (savedProfile) {
    try {
      const parsedProfile = JSON.parse(savedProfile)

      Object.assign(profile, {
        ...defaultProfile,
        ...parsedProfile
      })

      Object.assign(editingProfile, profile)
    }
    catch {
      Object.assign(profile, defaultProfile)
      Object.assign(editingProfile, defaultProfile)
    }
  }
})
</script>

<template>
  <div class="min-h-full bg-[#F5F8FC] px-4 py-4 sm:px-8 lg:px-10">
    <!-- Page Header -->
    <div class="mb-6">
      <div
        class="mb-3 flex items-center gap-2 text-sm font-medium text-[#2879D8]">
        <span class="h-2 w-2 rounded-full bg-[#4D93E8]" />
        Account Management
      </div>

      <h1
        class="text-3xl font-bold tracking-tight text-[#173B63] sm:text-4xl">
        Profile
      </h1>

      <p
        class="mt-1.5 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
        Manage your personal information and account details.
      </p>
    </div>

    <!-- Profile Header -->
    <div
      class="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm sm:px-6">
      <div
        class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <!-- Avatar + Name -->
        <div class="flex items-center gap-4 rounded-2xl px-5 py-4">
          <div
            class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#DCEBFA] bg-[#4D93E8] text-lg font-bold text-white shadow-md">
            {{ avatarInitials }}
          </div>

          <div>
            <h2
              class="text-xl font-bold text-[#173B63] sm:text-2xl">
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
          class="inline-flex items-center justify-center rounded-xl border border-[#2879D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#2879D8] transition hover:bg-blue-50"
          @click="openEditProfile">
          <span>✎</span>
          Edit Profile
        </button>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-3">
      <!-- Personal Information -->
      <div
        id="personal-information"
        class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7 xl:col-span-2">
        <!-- Heading -->
        <div
          class="mb-8 flex items-start justify-between">
          <div>
            <h2
              class="text-xl font-bold text-[#173B63]">
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
        <div
          class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <!-- Name -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-600">
              Full Name
            </label>

            <input
              v-model="editingProfile.name"
              type="text"
              :disabled="!isEditing"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-[#F8FAFD]">
          </div>

          <!-- Email -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-600">
              Email Address
            </label>

            <input
              v-model="editingProfile.email"
              type="email"
              :disabled="!isEditing"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-[#F8FAFD]">
          </div>

          <!-- Phone -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-600">
              Phone Number
            </label>

            <input
              v-model="editingProfile.phone"
              type="text"
              :disabled="!isEditing"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-[#F8FAFD]">
          </div>

          <!-- Location -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-600">
              Location
            </label>

            <input
              v-model="editingProfile.location"
              type="text"
              :disabled="!isEditing"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-[#F8FAFD]">
          </div>
        </div>

        <!-- About -->
        <div class="mt-7">
          <label
            class="mb-2 block text-sm font-semibold text-slate-600">
            About
          </label>

          <textarea
            v-model="editingProfile.about"
            rows="4"
            :disabled="!isEditing"
            class="w-full resize-none rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-[#F8FAFD]"
            placeholder="Write something about yourself..." />
        </div>

        <!-- Buttons -->
        <div
          class="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">
          <button
            v-if="isEditing"
            type="button"
            class="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            @click="cancelEditing">
            Cancel
          </button>

          <button
            type="button"
            :disabled="!isEditing"
            class="inline-flex items-center gap-2 rounded-xl bg-[#2879D8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-[#174A78] disabled:cursor-not-allowed disabled:opacity-50"
            @click="saveProfile">
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
            <h2
              class="text-lg font-bold text-[#173B63]">
              Account Status
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              Overview of your account.
            </p>
          </div>

          <div class="space-y-5">
            <div
              class="flex items-center justify-between border-b border-slate-100 pb-4">
              <span class="text-sm text-slate-500">
                Status
              </span>

              <span
                class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                <span
                  class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

            <div
              class="flex items-center justify-between border-b border-slate-100 pb-4">
              <span class="text-sm text-slate-500">
                Role
              </span>

              <span
                class="text-sm font-semibold text-[#173B63]">
                {{ profile.role }}
              </span>
            </div>

            <div
              class="flex items-center justify-between">
              <span class="text-sm text-slate-500">
                Member Since
              </span>

              <span
                class="text-sm font-semibold text-[#173B63]">
                {{ profile.joined }}
              </span>
            </div>
          </div>
        </div>

        <!-- Profile Activity -->
        <div
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="mb-6">
            <h2
              class="text-lg font-bold text-[#173B63]">
              Profile Activity
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              Recent account activity.
            </p>
          </div>

          <div class="space-y-6">
            <div
              v-for="(activity, index) in activities"
              :key="`${activity.title}-${index}`"
              class="flex gap-3">
              <div
                class="relative flex flex-col items-center">
                <span
                  class="mt-1.5 h-3 w-3 rounded-full"
                  :class="activity.color" />

                <span
                  v-if="index < activities.length - 1"
                  class="absolute top-5 h-12 w-px bg-slate-200" />
              </div>

              <div>
                <p
                  class="text-sm font-semibold text-[#173B63]">
                  {{ activity.title }}
                </p>

                <p
                  class="mt-1 text-xs text-slate-400">
                  {{ activity.time }}
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
      <div
        class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-start gap-4">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2879D8]">
            🔒
          </div>

          <div>
            <h2
              class="text-lg font-bold text-[#173B63]">
              Password & Security
            </h2>

            <p
              class="mt-1.5 text-sm text-slate-500">
              Keep your account secure by using a strong password.
            </p>
          </div>
        </div>

        <button
          type="button"
          class="w-fit rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-[#2879D8] hover:bg-blue-50 hover:text-[#2879D8]"
          @click="openPasswordModal">
          Change Password
        </button>
      </div>
    </div>

    <!-- Password Modal -->
    <div
      v-if="showPasswordModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
      @click.self="closePasswordModal">
      <div
        class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div class="mb-6">
          <h2
            class="text-xl font-bold text-[#173B63]">
            Change Password
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Update your account password.
          </p>
        </div>

        <div class="space-y-4">
          <!-- Current Password -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-600">
              Current Password
            </label>

            <input
              v-model="passwordForm.currentPassword"
              type="password"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm outline-none focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50"
              placeholder="Enter current password">
          </div>

          <!-- New Password -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-600">
              New Password
            </label>

            <input
              v-model="passwordForm.newPassword"
              type="password"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm outline-none focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50"
              placeholder="Enter new password">
          </div>

          <!-- Confirm Password -->
          <div>
            <label
              class="mb-2 block text-sm font-semibold text-slate-600">
              Confirm New Password
            </label>

            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              class="h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 text-sm outline-none focus:border-[#2879D8] focus:bg-white focus:ring-4 focus:ring-blue-50"
              placeholder="Confirm new password">
          </div>

          <!-- Error -->
          <p
            v-if="passwordError"
            class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {{ passwordError }}
          </p>

          <!-- Success -->
          <p
            v-if="passwordSuccess"
            class="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-600">
            Password changed successfully.
          </p>
        </div>

        <!-- Modal Buttons -->
        <div
          class="mt-6 flex justify-end gap-3">
          <button
            type="button"
            class="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            @click="closePasswordModal">
            Cancel
          </button>

          <button
            type="button"
            class="rounded-xl bg-[#2879D8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#174A78]"
            @click="changePassword">
            Change Password
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
```
