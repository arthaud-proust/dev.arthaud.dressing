<script setup lang="ts">
import VButton from '@/Components/Base/VButton.vue';
import VInput from '@/Components/Base/VInput.vue';
import VNumberInput from '@/Components/Base/VNumberInput.vue';
import InputError from '@/Components/InputError.vue';
import VPageHeader from '@/Components/VPageHeader.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { DressingDto } from '@/types/generated';
import { Head, useForm } from '@inertiajs/vue3';

const props = defineProps<{
    dressings: Array<DressingDto>;
}>();

const form = useForm({
    name: '',
    clothesMinByDressing: Object.fromEntries(
        props.dressings.map((dressing) => [dressing.id, 0]),
    ),
});

const submit = () => {
    form.post(route('clothes-categories.store'));
};

const dressingNameById = (id: string | number) =>
    props.dressings.find(
        (d) => d.id === (typeof id === 'number' ? id : Number.parseInt(id)),
    )?.name;
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

        <form
            class="mx-auto mt-auto flex w-full max-w-lg flex-col gap-8"
            @submit.prevent="submit"
        >
            <div>
                <label>{{ $t('nom') }}</label>
                <VInput v-model="form.name" class="w-full" />

                <InputError :message="form.errors.name" class="mt-2" />
            </div>

            <div>
                <p class="text-xl">
                    {{ $t('minimum_de_vtement_par_dressing') }}
                </p>
                <p class="mt-2">
                    {{
                        $t('dfinit_le_minimum_de_vtement_quil_te_faut_dans_ce')
                    }}
                </p>

                <div class="mt-4 grid grid-cols-2 gap-2">
                    <div v-for="(min, dressingId) in form.clothesMinByDressing">
                        <label class="text-sm">{{
                            dressingNameById(dressingId)
                        }}</label>
                        <VNumberInput
                            :min="0"
                            v-model="form.clothesMinByDressing[dressingId]"
                        />
                    </div>
                </div>
            </div>

            <VButton
                type="submit"
                :disabled="form.processing"
                :loading="form.processing"
            >
                {{ $t('creer') }}
            </VButton>
        </form>
    </AuthenticatedLayout>
</template>
