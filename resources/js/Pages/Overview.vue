<script setup lang="ts">
import VButton from '@/Components/Base/VButton.vue';
import VStretchedButton from '@/Components/Base/VStretchedButton.vue';
import ClothingCard from '@/Components/Clothing/ClothingCard.vue';
import ClothingDetails from '@/Components/Clothing/ClothingDetails.vue';
import VPageHeader from '@/Components/VPageHeader.vue';
import { useClothesCategories } from '@/composables/useClothesCategories';
import NoLayout from '@/Layouts/NoLayout.vue';
import { ClothesCategoryOverviewDto, ClothingDto } from '@/types/generated';
import { dressingColorClasses } from '@/utils/dressing';
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/vue/24/outline';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps<{
    categories: Array<ClothesCategoryOverviewDto>;
}>();

const selectedClothing = ref<ClothingDto | null>(null);
const showDetailed = ref(false);
const clothesCategories = useClothesCategories();
</script>
<template>
    <Head :title="$t('vue_densemble')" />

    <NoLayout>
        <template #header>
            <VPageHeader
                :back-to="route('dashboard')"
                :title="$t('vue_densemble')"
            >
                <VButton
                    v-if="showDetailed"
                    @click="showDetailed = false"
                    variant="secondary"
                >
                    <ListBulletIcon class="size-5" />
                    {{ $t('afficher_le_rsum') }}
                </VButton>
                <VButton
                    v-if="!showDetailed"
                    @click="showDetailed = true"
                    variant="secondary"
                >
                    <Squares2X2Icon class="size-5" />
                    {{ $t('afficher_les_images') }}
                </VButton>
            </VPageHeader>
        </template>

        <div
            v-show="!showDetailed"
            class="my-8 grid grid-cols-1 gap-20 md:grid-cols-2"
        >
            <article
                v-for="{ clothesCount, category, dressings } in categories"
            >
                <h2 class="mb-2 text-xl">
                    {{ clothesCategories.translatedName(category.name) }} ({{
                        clothesCount
                    }})
                </h2>

                <ul class="flex flex-row gap-1 py-6">
                    <li
                        v-for="({ dressing, clothes }, index) in dressings"
                        class="relative"
                        :style="{ flex: clothes.length + 1 }"
                    >
                        <div
                            class="flex items-center justify-center rounded-md p-1 text-lg"
                            :class="
                                dressingColorClasses(dressing.color).container
                            "
                        >
                            {{ clothes.length }}
                        </div>
                        <span
                            class="absolute min-w-full whitespace-nowrap p-0.5 text-center text-sm"
                            :class="[
                                {
                                    'bottom-full': index % 2 === 0,
                                    'right-0': index === dressings.length - 1,
                                },
                                dressingColorClasses(dressing.color).title,
                            ]"
                        >
                            {{ dressing.name }}
                        </span>
                    </li>
                </ul>
            </article>
        </div>
        <div v-show="showDetailed" class="my-8 flex flex-col gap-24">
            <div v-for="{ clothesCount, category, dressings } in categories">
                <h2 class="col-span-s sticky top-0 mb-2 text-2xl">
                    {{ clothesCategories.translatedName(category.name) }} ({{
                        clothesCount
                    }})
                </h2>

                <div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <template
                        v-for="({ dressing, clothes }, index) in dressings"
                    >
                        <VStretchedButton
                            v-for="clothing in clothes"
                            :sr-text="$t('voir_le_dtail')"
                            @click="selectedClothing = clothing"
                        >
                            <ClothingCard
                                :clothing="clothing"
                                :color="dressing.color"
                            />
                        </VStretchedButton>
                    </template>
                </div>
            </div>
        </div>

        <ClothingDetails
            v-if="selectedClothing"
            :clothing="selectedClothing"
            @close="selectedClothing = null"
        />
    </NoLayout>
</template>
