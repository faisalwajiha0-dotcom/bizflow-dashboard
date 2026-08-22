<template>
  <aside
    class="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-[#174A78] text-white">
    <!-- Logo -->
    <div class="flex h-20 items-center gap-3 border-b border-white/10 px-6">
      <div
        class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl font-bold">
        B
      </div>

      <div>
        <h1 class="text-xl font-bold">
          BizFlow
        </h1>

        <p class="text-xs text-blue-100/70">
          Business Dashboard
        </p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-2 overflow-y-auto px-4 py-7">
      <NuxtLink
        to="/"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-blue-50 transition hover:bg-white/10"
        active-class="bg-blue-500 text-white shadow-lg">
        <span class="text-lg">⌂</span>
        Dashboard
      </NuxtLink>

      <NuxtLink
        to="/products"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-blue-50 transition hover:bg-white/10"
        active-class="bg-blue-500 text-white shadow-lg">
        <span class="text-lg">▣</span>
        Products
      </NuxtLink>

      <NuxtLink
        to="/orders"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-blue-50 transition hover:bg-white/10"
        active-class="bg-blue-500 text-white shadow-lg">
        <span class="text-lg">🛒</span>
        Orders
      </NuxtLink>

      <NuxtLink
        to="/customers"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-blue-50 transition hover:bg-white/10"
        active-class="bg-blue-500 text-white shadow-lg">
        <span class="text-lg">♙</span>
        Customers
      </NuxtLink>

      <NuxtLink
        to="/analytics"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-blue-50 transition hover:bg-white/10"
        active-class="bg-blue-500 text-white shadow-lg">
        <span class="text-lg">↗</span>
        Analytics
      </NuxtLink>

      <NuxtLink
        to="/notifications"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-blue-50 transition hover:bg-white/10"
        active-class="bg-blue-500 text-white shadow-lg">
        <span class="text-lg">♢</span>
        Notifications

        <span
          class="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1 text-[10px]">
          6
        </span>
      </NuxtLink>

      <!-- Divider -->
      <div class="my-6 border-t border-white/10" />

      <NuxtLink
        to="/profile"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-blue-50 transition hover:bg-white/10"
        active-class="bg-blue-500 text-white shadow-lg">
        <span class="text-lg">◎</span>
        Profile
      </NuxtLink>

      <NuxtLink
        to="/settings"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-blue-50 transition hover:bg-white/10"
        active-class="bg-blue-500 text-white shadow-lg">
        <span class="text-lg">⚙</span>
        Settings
      </NuxtLink>
    </nav>

    <!-- User -->
    <div class="border-t border-white/10 p-4">
      <div
        class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-full bg-[#4D93E8] font-bold">
          WF
        </div>

        <div class="min-w-0">
          <p class="truncate text-sm font-semibold">
            Wajiha Faisal
          </p>

          <p class="truncate text-xs text-blue-100/60">
            Administrator
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>
