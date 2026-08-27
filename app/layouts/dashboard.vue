<script setup lang="ts">
const isSidebarOpen = ref(false)

const openSidebar = () => {
  isSidebarOpen.value = true
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-[#F4F8FC]">
    <!-- Sidebar -->
    <AppSidebar
      :is-open="isSidebarOpen"
      :on-close="closeSidebar" />

    <!-- Navbar -->
    <AppNavbar
      @open-sidebar="openSidebar" />

    <!-- Main Content -->
    <main class="pt-20 md:ml-64">
      <div class="p-4 sm:p-6 lg:p-8">
        <slot />
      </div>
    </main>
  </div>
</template>
