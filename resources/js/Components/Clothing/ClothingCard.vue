<script setup lang="ts">
import { ClothingDto, DressingColor } from '@/types/generated';
import { dressingColorClasses } from '@/utils/dressing';
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';

const props = defineProps<{
    clothing: ClothingDto;
    color?: DressingColor;
}>();

const noImages = props.clothing.thumbUrls?.length === 0;
const imageError = ref(false);
</script>
<template>
    <article
        class="relative w-full overflow-hidden rounded-lg"
        :class="
            color
                ? dressingColorClasses(color).container
                : 'bg-neutral-50 text-neutral-500'
        "
    >
        <div class="flex gap-1">
            <template v-if="!imageError">
                <img
                    v-for="imageUrl in clothing.thumbUrls"
                    @error="imageError = true"
                    :src="imageUrl"
                    alt=""
                    class="rounded-md"
                />
            </template>
            <div
                v-if="noImages || imageError"
                class="w-full rounded-md bg-neutral-100 p-6"
            >
                <QuestionMarkCircleIcon
                    class="mx-auto size-12 text-neutral-200"
                />
            </div>
        </div>

        <p class="p-2 text-center text-xs" v-if="clothing.description">
            {{ clothing.description }}
        </p>
        <p class="p-2 text-center text-xs" v-else-if="noImages">
            {{ $t('aucune_description') }}
        </p>
    </article>
</template>
