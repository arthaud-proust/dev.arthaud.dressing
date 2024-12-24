<script setup lang="ts">
import ClothesCategoryForm from '@/Components/ClothesCategory/ClothesCategoryForm.vue';
import VPageHeader from '@/Components/VPageHeader.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { DressingDto } from '@/types/generated';
import { Head } from '@inertiajs/vue3';

const props = defineProps<{
    dressings: Array<DressingDto>;
}>();
</script>

<template>
    <Head :title="$t('dashboard')" />

    <AuthenticatedLayout>
        <template #header>
            <VPageHeader
                :back-to="route('clothes-categories.index')"
                :title="$t('crer_une_catgorie')"
            >
            </VPageHeader>
        </template>

        <ClothesCategoryForm />
    </AuthenticatedLayout>
</template>
