<script setup lang="ts"></script>

<template>
    <div class="relative flex min-h-dvh flex-col">
        <header class="border-b bg-white" v-if="$slots.header">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <slot name="header" />
            </div>
        </header>

        <div
            class="mx-auto flex h-full w-full max-w-7xl grow flex-col px-4 py-6 sm:px-6 lg:px-8"
        >
            <slot />
        </div>

        <slot name="footer"></slot>
    </div>
</template>
