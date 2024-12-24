<script setup lang="ts" generic="T">
import VTag from '@/Components/Base/VTag.vue';

export type Option<T> = {
    label: string;
    value: T;
};

const props = defineProps<{
    options: Array<Option<T>>;
    disabled?: boolean;
}>();

const model = defineModel<T>();

const labelForValue = (value: T | undefined) =>
    value && props.options.find((option) => option.value === value)?.label;
</script>
<template>
    <label class="relative">
        <VTag>
            <slot name="icon" />
            {{ labelForValue(model) }}
        </VTag>
        <select v-model="model" class="absolute inset-0 opacity-0">
            <option v-for="{ value, label } in options" :value="value">
                {{ label }}
            </option>
        </select>
    </label>
</template>
