<template>
  <header
    class="fixed left-64 right-0 top-0 z-30 h-20 border-b border-slate-200 bg-white px-8">
    <div class="flex h-full items-center justify-between">
      <!-- Heading -->
      <div>
        <h2 class="text-2xl font-bold text-[#173B63]">
          Dashboard
        </h2>

        <p class="text-sm text-slate-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <!-- Right Side -->
      <div class="flex items-center gap-5">
        <!-- Search -->
        <div
          class="hidden items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 md:flex">
          <span class="text-slate-400">⌕</span>

          <input
            type="text"
            placeholder="Search anything..."
            class="w-48 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400">
        </div>

        <!-- Notification -->
        <button
          class="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
          ♢

          <span
            class="absolute right-2 top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500" />
        </button>

        <!-- Profile -->
        <NuxtLink
          to="/profile"
          class="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-[#2879D8] text-sm font-bold text-white">
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

          <span class="text-slate-500" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
