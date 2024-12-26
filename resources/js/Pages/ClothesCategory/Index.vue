<script setup lang="ts">
import VButton from '@/Components/Base/VButton.vue';
import VStretchedButton from '@/Components/Base/VStretchedButton.vue';
import VPageHeader from '@/Components/VPageHeader.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ClothesCategoryDto } from '@/types/generated';
import {
    ArrowsUpDownIcon,
    Bars2Icon,
    CheckIcon,
    PencilIcon,
    PlusIcon,
    XMarkIcon,
} from '@heroicons/vue/24/solid';
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import Draggable from 'vuedraggable';

const props = defineProps<{
    clothesCategories: Array<ClothesCategoryDto>;
}>();

const isReordering = ref(false);
const editableClothesCategories = ref(props.clothesCategories);

const startReordering = () => {
    isReordering.value = true;
};
const saveReordering = () => {
    router.post(route('clothes-categories.reorder'), {
        ids: editableClothesCategories.value.map((category) => category.id),
    });
};
const cancelReordering = () => {
    isReordering.value = false;
    editableClothesCategories.value = props.clothesCategories;
};
</script>

<template>
    <Head :title="$t('catgories_de_vtements')" />

    <AuthenticatedLayout>
        <template #header>
            <VPageHeader
                :back-to="route('dashboard')"
                :title="$t('catgories_de_vtements')"
            >
                <template v-if="isReordering">
                    <VButton variant="success" @click="saveReordering">
                        <CheckIcon class="size-5" />
                        {{ $t('enregistrer') }}
                    </VButton>
                    <VButton variant="tertiary" @click="cancelReordering">
                        <XMarkIcon class="size-5" />
                        {{ $t('annuler') }}
                    </VButton>
                </template>
                <template v-else>
                    <VButton :href="route('clothes-categories.create')">
                        <PlusIcon class="size-5" />
                        {{ $t('creer') }}
                    </VButton>
                    <VButton variant="secondary" @click="startReordering">
                        <ArrowsUpDownIcon class="size-5" />
                        {{ $t('rordonner') }}
                    </VButton>
                </template>
            </VPageHeader>
        </template>

        <Draggable
            v-if="isReordering"
            v-model="editableClothesCategories"
            item-key="id"
            class="mx-auto flex w-full max-w-lg flex-col gap-2 py-10"
        >
            <template #item="{ element: clothesCategory }">
                <article
                    class="flex items-center gap-2 rounded-lg bg-amber-50 p-4 font-bold text-amber-900"
                >
                    <h2 class="text-xl">{{ clothesCategory.name }}</h2>
                    <Bars2Icon class="ml-auto size-5" />
                </article>
            </template>
        </Draggable>

        <div v-else class="mx-auto flex w-full max-w-lg flex-col gap-2 py-10">
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
