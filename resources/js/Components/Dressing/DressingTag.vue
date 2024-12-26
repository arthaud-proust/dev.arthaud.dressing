<script setup lang="ts">
import VTag from '@/Components/Base/VTag.vue';
import HangerIcon from '@/Components/Icon/Outline/HangerIcon.vue';
import { DressingDto } from '@/types/generated';
import { dressingColorClasses } from '@/utils/dressing';

const props = defineProps<{
    dressing: DressingDto;
}>();
</script>

<template>
    <VTag
        variant="unstyled"
        :class="dressingColorClasses(dressing.color).container"
    >
        <HangerIcon class="size-5" />

        {{ dressing.name }}
    </VTag>
</template>
