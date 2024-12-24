<script setup lang="ts">
import VButton from '@/Components/Base/VButton.vue';
import ClothesCategoryForm from '@/Components/ClothesCategory/ClothesCategoryForm.vue';
import Modal from '@/Components/Modal.vue';
import VPageHeader from '@/Components/VPageHeader.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ClothesCategoryDto } from '@/types/generated';
import { TrashIcon } from '@heroicons/vue/24/outline';
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps<{
    clothesCategory: ClothesCategoryDto;
    clothesMinByDressing: Record<string, number>;
}>();

const confirmingDeletion = ref(false);
const confirmDeletion = () => {
    confirmingDeletion.value = true;
};
const deleteClothesCategory = () => {
    router.delete(route('clothes-categories.destroy', props.clothesCategory));
};
const closeModal = () => {
    confirmingDeletion.value = false;
};
</script>

<template>
    <Head :title="$t('dashboard')" />

    <AuthenticatedLayout>
        <template #header>
            <VPageHeader
                :back-to="route('clothes-categories.index')"
                :title="
                    $t('modifier_la_catgorie_name', {
                        name: clothesCategory.name,
                    })
                "
            >
                <VButton @click="confirmDeletion" variant="danger">
                    <TrashIcon class="size-5" />
                    {{ $t('supprimer') }}
                </VButton>
            </VPageHeader>
        </template>

        <ClothesCategoryForm
            :clothes-category="clothesCategory"
            :clothes-min-by-dressing="clothesMinByDressing"
        />

        <Modal v-if="confirmingDeletion" @close="closeModal">
            <form class="space-y-4" @submit.prevent="deleteClothesCategory">
                <h2 class="text-2xl">{{ $t('supprimer_la_catgorie') }}</h2>

                <div class="font-bold">
                    <p>{{ $t('tous_les_vtements_associs_seront_conservs') }}</p>
                    <p>{{ $t('il_seront_marqus_comme_noncatgoris') }}</p>
                </div>

                <div class="flex gap-2">
                    <VButton class="grow" @click="closeModal" variant="tertiary"
                        >{{ $t('annuler') }}
                    </VButton>
                    <VButton class="grow" variant="danger" type="submit"
                        >{{ $t('supprimer') }}
                    </VButton>
                </div>
            </form>
        </Modal>
    </AuthenticatedLayout>
</template>
