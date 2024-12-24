<script setup lang="ts">
import { DressingDto } from '@/types/generated';
import { dressingColorClasses } from '@/utils/dressing';
import { computed } from 'vue';

const props = defineProps<{
    dressing: DressingDto;
}>();

const colorClasses = computed(() => dressingColorClasses(props.dressing.color));
</script>
<template>
    <div class="flex flex-col rounded-xl p-4" :class="colorClasses.container">
        <span>{{ $t('dressing') }}</span>
        <span class="text-2xl" :class="colorClasses.title">{{
            dressing.name
        }}</span>
        <span>{{ $t('vetements', dressing.clothesCount) }}</span>
    </div>
</template>
