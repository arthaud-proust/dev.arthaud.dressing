<script setup lang="ts">
import VButton from '@/Components/Base/VButton.vue';
import VInput from '@/Components/Base/VInput.vue';
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        min?: number;
        max?: number;
        stepBy?: number;
        disabled?: boolean;
    }>(),
    {
        stepBy: 1,
    },
);

const model = defineModel<number>({
    required: true,
});

const incremented = computed(() => model.value + props.stepBy);
const decremented = computed(() => model.value - props.stepBy);

const canIncrement = computed(
    () => props.max == undefined || incremented.value <= props.max,
);

const canDecrement = computed(
    () => props.min == undefined || decremented.value >= props.min,
);

const increment = () => {
    if (canIncrement) {
        model.value = incremented.value;
    }
};

const decrement = () => {
    if (canDecrement) {
        model.value = decremented.value;
    }
};
</script>
<template>
    <div class="flex gap-1">
        <VButton
            :disabled="disabled || !canDecrement"
            @click="decrement"
            icon
            :rounded="false"
            variant="secondary"
        >
            <MinusIcon class="size-4" />
            <span class="sr-only">{{ $t('enlever_step', { stepBy }) }}</span>
        </VButton>
        <VInput :disabled="disabled" v-model="model" class="w-16 text-center" />
        <VButton
            :disabled="disabled || !canIncrement"
            @click="increment"
            icon
            :rounded="false"
            variant="secondary"
        >
            <PlusIcon class="size-4" />
            <span class="sr-only">{{ $t('ajouter_step', { stepBy }) }}</span>
        </VButton>
    </div>
</template>
