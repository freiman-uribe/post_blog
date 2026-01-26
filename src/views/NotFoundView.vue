<template>
    <div class="flex-grow flex items-center justify-center px-6 py-20 relative">
        <div class="max-w-[960px] w-full flex flex-col items-center text-center">
            <div class="relative group">
                <div class="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150 group-hover:bg-primary/20 transition-all duration-700">
                </div>
                <div
                    class="glass-card rounded-3xl p-8 md:p-16 mb-8 transform transition-transform hover:scale-[1.02] duration-500">
                    <h1
                        class="text-primary dark:text-white tracking-tighter text-[100px] md:text-[180px] font-black leading-none text-glow select-none">
                        404
                    </h1>
                </div>
            </div>
            <h2 class="text-slate-900 dark:text-white text-[28px] md:text-[40px] font-extrabold leading-tight tracking-[-0.025em] pb-4">
                Página no encontrada
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-normal leading-relaxed max-w-xl mx-auto mb-10">
                La página que estás buscando no existe o ha sido movida.
            </p>
            <div>
                <RouterLink to="/"
                    class="flex min-w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 border-2 border-slate-200 dark:border-[#2b2839] bg-transparent text-slate-900 dark:text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-slate-100 dark:hover:bg-[#2b2839] transition-all">
                    <span class="material-symbols-outlined mr-2">home</span>
                    <span class="truncate">Volver al inicio</span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1)
}

.text-glow {
    text-shadow: 0 0 40px rgba(55, 19, 236, 0.4)
}
</style>