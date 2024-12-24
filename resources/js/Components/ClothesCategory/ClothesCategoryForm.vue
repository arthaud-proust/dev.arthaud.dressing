<script setup lang="ts">
import VButton from '@/Components/Base/VButton.vue';
import VInput from '@/Components/Base/VInput.vue';
import VNumberInput from '@/Components/Base/VNumberInput.vue';
import InputError from '@/Components/InputError.vue';
import { useDressings } from '@/composables/useDressings';
import { ClothesCategoryDto } from '@/types/generated';
import { useForm } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps<{
    clothesCategory?: ClothesCategoryDto;
    clothesMinByDressing?: Record<string, number>;
}>();

const emit = defineEmits<{
    submitSuccess: [];
}>();

const isEditing = computed(
    () => props.clothesCategory && props.clothesMinByDressing,
);
const dressings = useDressings();

const form = useForm({
    name: props.clothesCategory?.name ?? '',
    clothesMinByDressing:
        props.clothesMinByDressing ??
        Object.fromEntries(
            Object.keys(dressings.all).map((dressingId) => [dressingId, 0]),
        ),
});

const submit = () => {
    if (isEditing.value) {
        form.put(route('clothes-categories.update', props.clothesCategory), {
            onSuccess: () => emit('submitSuccess'),
            preserveState: false,
        });
    } else {
        form.post(route('clothes-categories.store'), {
            onSuccess: () => emit('submitSuccess'),
            preserveState: false,
        });
    }
};
</script>

<template>
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
                {{ $t('dfinit_le_minimum_de_vtement_quil_te_faut_dans_ce') }}
            </p>

            <div class="mt-4 grid grid-cols-2 gap-2">
                <div v-for="(min, dressingId) in form.clothesMinByDressing">
                    <label class="text-sm">{{
                        dressings.name(
                            typeof dressingId === 'number'
                                ? dressingId
                                : Number.parseInt(dressingId),
                        )
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
            {{ isEditing ? $t('modifier_la_catgorie') : $t('creer') }}
        </VButton>
    </form>
</template>
