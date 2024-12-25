<script setup lang="ts">
import VButton from '@/Components/Base/VButton.vue';
import VInput from '@/Components/Base/VInput.vue';
import VNumberInput from '@/Components/Base/VNumberInput.vue';
import DressingColorSelector from '@/Components/Dressing/DressingColorSelector.vue';
import InputError from '@/Components/InputError.vue';
import VPageHeader from '@/Components/VPageHeader.vue';
import { useClothesCategories } from '@/composables/useClothesCategories';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { DressingColor } from '@/types/generated';
import { Head, useForm } from '@inertiajs/vue3';

const clothesCategories = useClothesCategories();

const form = useForm({
    name: '',
    color: DressingColor.AMBER,
    clothesMinByCategory: Object.fromEntries(
        Object.keys(clothesCategories.all).map((id) => [id, 0]),
    ),
});

const submit = () => {
    form.post(route('dressings.store'));
};
</script>

<template>
    <Head :title="$t('dashboard')" />

    <AuthenticatedLayout>
        <template #header>
            <VPageHeader
                :back-to="route('dashboard')"
                :title="$t('crer_un_dressing')"
            />
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
                    <div
                        v-for="(
                            name, categoryId
                        ) in clothesCategories.allWithoutUncategorized"
                    >
                        <label>{{ name }}</label>
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
                :loading="form.processing"
                :disabled="form.processing"
                >{{ $t('crer_le_dressing') }}
            </VButton>
        </form>
    </AuthenticatedLayout>
</template>
