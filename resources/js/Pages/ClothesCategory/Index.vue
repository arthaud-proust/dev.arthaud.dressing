<script setup lang="ts">
import VButton from '@/Components/Base/VButton.vue';
import VStretchedButton from '@/Components/Base/VStretchedButton.vue';
import VPageHeader from '@/Components/VPageHeader.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ClothesCategoryDto } from '@/types/generated';
import { PencilIcon, PlusIcon } from '@heroicons/vue/24/solid';
import { Head } from '@inertiajs/vue3';

const props = defineProps<{
    clothesCategories: Array<ClothesCategoryDto>;
}>();
</script>

<template>
    <Head :title="$t('catgories_de_vtements')" />

    <AuthenticatedLayout>
        <template #header>
            <VPageHeader
                :back-to="route('dashboard')"
                :title="$t('catgories_de_vtements')"
            >
                <VButton :href="route('clothes-categories.create')">
                    <PlusIcon class="size-5" />
                    {{ $t('creer') }}
                </VButton>
            </VPageHeader>
        </template>

        <div class="mx-auto mt-auto flex w-full max-w-lg flex-col gap-2 py-16">
            <VStretchedButton
                v-for="clothesCategory in clothesCategories"
                :sr-text="clothesCategory.name"
                :href="route('clothes-categories.edit', clothesCategory)"
            >
                <article
                    class="flex items-center gap-2 rounded-lg bg-amber-50 p-4 font-bold text-amber-900"
                >
                    <h2 class="text-xl">{{ clothesCategory.name }}</h2>
                    <PencilIcon class="ml-auto size-5" />
                </article>
            </VStretchedButton>
        </div>
    </AuthenticatedLayout>
</template>
