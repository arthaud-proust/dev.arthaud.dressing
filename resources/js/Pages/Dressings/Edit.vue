<script setup lang="ts">
import VButton from '@/Components/Base/VButton.vue';
import VInput from '@/Components/Base/VInput.vue';
import VNumberInput from '@/Components/Base/VNumberInput.vue';
import DressingColorSelector from '@/Components/Dressing/DressingColorSelector.vue';
import InputError from '@/Components/InputError.vue';
import Modal from '@/Components/Modal.vue';
import VPageHeader from '@/Components/VPageHeader.vue';
import { useClothesCategories } from '@/composables/useClothesCategories';
import { ClothesCountByCategoryId } from '@/composables/useClothingCategoriesBalance';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { DressingDto } from '@/types/generated';
import { TrashIcon } from '@heroicons/vue/24/outline';
import { Head, router, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps<{
    dressing: DressingDto;
    clothesMinByCategory: ClothesCountByCategoryId;
}>();

const clothesCategories = useClothesCategories();

const form = useForm({
    name: props.dressing.name,
    color: props.dressing.color,
    clothesMinByCategory: props.clothesMinByCategory,
});

const submit = () => {
    form.put(route('dressings.update', props.dressing));
};

const confirmingDressingDeletion = ref(false);
const confirmDressingDeletion = () => {
    confirmingDressingDeletion.value = true;
};
const deleteDressing = () => {
    router.delete(route('dressings.destroy', props.dressing));
};
const closeModal = () => {
    confirmingDressingDeletion.value = false;
};
</script>

<template>
    <Head :title="$t('dashboard')" />

    <AuthenticatedLayout>
        <template #header>
            <VPageHeader
                :back-to="route('dressings.show', dressing)"
                :title="
                    $t('modifier_le_dressing_name', { name: dressing.name })
                "
            >
                <VButton @click="confirmDressingDeletion" variant="danger">
                    <TrashIcon class="size-5" />
                    {{ $t('supprimer') }}
                </VButton>
            </VPageHeader>
        </template>

        <form
            class="mx-auto mt-auto flex w-full max-w-lg flex-col py-8"
            @submit.prevent="submit"
        >
            <div>
                <label>{{ $t('nom') }}</label>
                <VInput v-model="form.name" class="w-full" />

                <InputError :message="form.errors.name" class="mt-2" />
            </div>

            <div class="mt-4">
                <label>{{ $t('couleur') }}</label>
                <DressingColorSelector class="mt-1" v-model="form.color" />
            </div>

            <div class="mt-12">
                <p class="text-xl">
                    {{ $t('minimum_de_vtement_par_catgorie') }}
                </p>
                <p class="mt-2">
                    {{
                        $t('dfinit_le_minimum_de_vtement_quil_te_faut_dans_ce')
                    }}
                </p>

                <div class="mt-4 grid grid-cols-2 gap-2">
                    <div v-for="(name, categoryId) in clothesCategories.all">
                        <label class="text-sm">{{ name }}</label>
                        <VNumberInput
                            class="w-full"
                            :min="0"
                            v-model="form.clothesMinByCategory[categoryId]"
                        />
                    </div>
                </div>
            </div>

            <VButton
                class="mt-12"
                type="submit"
                :disabled="form.processing"
                :loading="form.processing"
                >{{ $t('modifier_le_dressing') }}
            </VButton>
        </form>

        <Modal :show="confirmingDressingDeletion" @close="closeModal">
            <h2 class="text-lg font-medium text-gray-900">
                {{ $t('supprimer_le_dressing', { name: dressing.name }) }}
            </h2>

            <p class="mt-2 font-bold text-gray-600">
                {{
                    $t(
                        'le_dressing_et_ses_n_vtements_seront_dfinitivement',
                        dressing.clothesCount,
                    )
                }}
            </p>

            <p class="mt-2 text-gray-600">
                {{ $t('si_vous_ne_souhaitez_pas_supprimer_ces_vtements_dp') }}
            </p>

            <div class="mt-6 flex justify-end">
                <VButton variant="tertiary" @click="closeModal">
                    {{ $t('annuler') }}
                </VButton>

                <VButton class="ms-3" @click="deleteDressing" variant="danger">
                    {{ $t('supprimer') }}
                </VButton>
            </div>
        </Modal>
    </AuthenticatedLayout>
</template>
