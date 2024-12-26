<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        variant?: 'default' | 'unstyled';
    }>(),
    {
        variant: 'default',
    },
);
</script>
<template>
    <span
        class="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-bold"
        :class="{
            'bg-neutral-100 text-neutral-700': variant === 'default',
        }"
    >
        <slot />
    </span>
</template>
