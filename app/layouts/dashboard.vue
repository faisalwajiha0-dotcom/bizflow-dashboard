<template>
  <div class="min-h-screen bg-[#F4F8FC]">
    <AppSidebar />

    <AppNavbar />

    <main class="ml-64 pt-20">
      <div class="p-8">
        <slot />
      </div>
    </main>
  </div>
</template>
