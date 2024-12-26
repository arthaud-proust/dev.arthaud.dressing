<script setup lang="ts">
import VAlert from '@/Components/Base/VAlert.vue';
import VButton from '@/Components/Base/VButton.vue';
import VNumberInput from '@/Components/Base/VNumberInput.vue';
import VStretchedButton from '@/Components/Base/VStretchedButton.vue';
import ClothingCard from '@/Components/Clothing/ClothingCard.vue';
import DressingTag from '@/Components/Dressing/DressingTag.vue';
import { useClothesCategories } from '@/composables/useClothesCategories';
import {
    ClothesCountByCategoryId,
    useClothingCategoriesBalance,
} from '@/composables/useClothingCategoriesBalance';
import NoLayout from '@/Layouts/NoLayout.vue';
import {
    ClothesCategoryDto,
    ClothingDto,
    DressingDto,
} from '@/types/generated';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    PencilIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline';
import { Head, Link, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

const props = defineProps<{
    originDressing: DressingDto;
    destinationDressing: DressingDto;
    clothesCountByCategoryInDestination: ClothesCountByCategoryId;
    clothesMinByCategoryInDestination: ClothesCountByCategoryId;
    clothesByCategoryAtOrigin: Record<
        ClothesCategoryDto['id'],
        Array<ClothingDto>
    >;
}>();

const isEditingMinByCategory = ref(false);
const clothesMinByCategory = ref(props.clothesMinByCategoryInDestination);

const saveMinByCategory = () => {
    isEditingMinByCategory.value = false;
};
const resetMinByCategory = () => {
    isEditingMinByCategory.value = false;
    clothesMinByCategory.value = props.clothesMinByCategoryInDestination;
};

const clothesCategories = useClothesCategories();

const availableByCategory = computed(
    () =>
        Object.fromEntries(
            Object.entries(props.clothesByCategoryAtOrigin).map(
                ([category, clothes]) => [category, clothes.length],
            ),
        ) as ClothesCountByCategoryId,
);

const {
    computeSelectedClothesId,
    incompleteCategories,
    missingCountForCategory,
    canCategoryBeCompleted,
    toggleClothingSelection,
    isClothingSelected,
    selectedCountForCategory,
    isCategoryCompletedWithSelection,
    percentageOfMinNotDefined,
} = useClothingCategoriesBalance({
    min: clothesMinByCategory,
    current: props.clothesCountByCategoryInDestination,
    available: availableByCategory,
});

const send = () => {
    router.post(
        route('clothes.move.store', [
            props.originDressing,
            props.destinationDressing,
        ]),
        {
            clothes_id: computeSelectedClothesId(),
        },
    );
};

const nextStep = () => {
    if (step.value === 'setup') {
        step.value = 'recap-start';
    } else if (step.value === 'recap-start') {
        step.value = 0;
    } else if (step.value === incompleteCategories.value.length - 1) {
        step.value = 'recap-end';
    } else if (step.value !== 'recap-end') {
        step.value++;
    }
};
const previousStep = () => {
    if (step.value === 'recap-end') {
        step.value = incompleteCategories.value.length - 1;
    } else if (step.value === 0) {
        step.value = 'recap-start';
    } else if (step.value === 'recap-start') {
        step.value = 'setup';
    } else if (step.value == 'setup') {
        router.visit(route('suitcase.index'));
    } else {
        step.value--;
    }
};

const step = ref<'setup' | 'recap-start' | number | 'recap-end'>('setup');

const stepClothingInfos = computed(() => {
    if (
        step.value === 'setup' ||
        step.value === 'recap-start' ||
        step.value === 'recap-end'
    ) {
        return null;
    }

    const category = incompleteCategories.value[step.value];
    if (!category) {
        throw new Error('undefined category');
    }

    return {
        step: step.value + 1,
        totalSteps: incompleteCategories.value.length,
        category,
        clothes: props.clothesByCategoryAtOrigin[category],
        canBeCompleted: canCategoryBeCompleted(category),
        missingCount: missingCountForCategory(category),
    };
});
</script>

<template>
    <Head :title="$t('dplacer_des_vtements')" />

    <NoLayout>
        <template #header>
            <div class="mb-4 flex text-sm">
                <button
                    @click="previousStep"
                    class="-m-2 flex items-center gap-1 p-2"
                >
                    <ArrowLeftIcon class="size-4" />
                    {{ $t('prcdent') }}
                </button>
                <Link
                    :href="route('suitcase.index')"
                    class="-m-2 ml-auto flex items-center gap-1 p-2"
                >
                    <span class="sr-only">{{ $t('quitter') }}</span>
                    <XMarkIcon class="size-5" />
                </Link>
            </div>

            <template v-if="stepClothingInfos">
                <p class="text-sm text-neutral-500">
                    {{
                        $t('etape_n_sur_total', {
                            n: stepClothingInfos.step,
                            total: stepClothingInfos.totalSteps,
                        })
                    }}
                    -
                    {{
                        clothesCategories.nameFromId(stepClothingInfos.category)
                    }}
                </p>
                <h3 class="text-xl">
                    {{
                        $t('slectionne_n_clothing', {
                            n: stepClothingInfos.missingCount,
                            clothing: clothesCategories
                                .nameFromId(stepClothingInfos.category)
                                .toLowerCase(),
                        })
                    }}
                </h3>
                <VAlert
                    v-if="!stepClothingInfos.canBeCompleted"
                    type="warning"
                    class="mt-2"
                >
                    <p>
                        {{
                            $t(
                                'il_ny_a_pas_assez_de_clothing_dans_ce_dressing',
                                {
                                    clothing: clothesCategories
                                        .nameFromId(stepClothingInfos.category)
                                        .toLowerCase(),
                                },
                            )
                        }}
                    </p>
                    <p class="mt-2 font-bold">
                        {{
                            $t(
                                'si_tous_tes_vtements_sont_bien_sur_lapplication_pr',
                            )
                        }}
                    </p>
                </VAlert>
            </template>
            <template v-else>
                <h2 class="text-xl font-semibold leading-tight text-gray-800">
                    {{ $t('faire_ma_valise') }}
                </h2>

                <VStretchedButton
                    :href="route('suitcase.index')"
                    :sr-text="$t('modifier_lorigine_ou_la_destination')"
                >
                    <div class="mt-2 flex items-center gap-2">
                        <DressingTag :dressing="originDressing" />

                        <ArrowRightIcon class="size-5" />

                        <DressingTag :dressing="destinationDressing" />
                    </div>
                </VStretchedButton>
            </template>
        </template>

        <div class="mx-auto mt-auto flex w-full max-w-lg flex-col">
            <template v-if="step === 'setup'">
                <h3 class="text-xl">
                    {{ $t('ce_quil_faut_l_o_tu_vas_auminimum') }}
                </h3>

                <div
                    v-if="isEditingMinByCategory"
                    class="mb-32 mt-4 flex flex-col gap-4"
                >
                    <label
                        class="flex items-center gap-2"
                        v-for="{
                            name,
                            id,
                        } in clothesCategories.allWithoutUncategorized"
                    >
                        <VNumberInput
                            :min="0"
                            v-model="clothesMinByCategory[id]"
                        />
                        <span>{{ name }}</span>
                    </label>
                </div>
                <ul
                    v-else
                    class="mb-32 mt-4 list-inside list-disc space-y-2 pl-2"
                >
                    <li
                        v-for="{
                            name,
                            id,
                        } in clothesCategories.allWithoutUncategorized"
                    >
                        <span>{{ clothesMinByCategory[id] }} {{ name }}</span>
                    </li>
                </ul>

                <div
                    class="fixed bottom-0 left-0 flex w-full flex-col gap-2 rounded-t-2xl bg-white px-4 py-4 shadow-2xl"
                >
                    <template v-if="isEditingMinByCategory">
                        <VButton variant="tertiary" @click="resetMinByCategory">
                            <XMarkIcon class="size-5" />
                            {{ $t('annuler') }}
                        </VButton>
                        <VButton variant="success" @click="saveMinByCategory">
                            <CheckIcon class="size-5" />
                            {{ $t('enregistrer') }}
                        </VButton>
                    </template>
                    <template v-else>
                        <VButton
                            variant="secondary"
                            @click="isEditingMinByCategory = true"
                        >
                            {{ $t('modifier_pour_cette_foisci') }}
                            <PencilIcon class="size-5" />
                        </VButton>

                        <VButton @click="nextStep">
                            {{ $t('continuer_avec_a') }}
                            <ArrowRightIcon class="size-5" />
                        </VButton>
                    </template>
                </div>
            </template>
            <template v-else-if="step === 'recap-start'">
                <template v-if="incompleteCategories.length">
                    <h3 class="text-xl">
                        {{ $t('ce_quil_faut_mettre_dans_ta_valise') }}
                    </h3>

                    <p
                        class="mt-2"
                        v-html="
                            $t(
                                'selon_le_minimum_par_catgorie_que_tu_as_configur_i',
                            )
                        "
                    ></p>

                    <ul class="mt-4 list-inside list-disc space-y-2 pl-2">
                        <li v-for="category in incompleteCategories">
                            <span
                                :class="
                                    canCategoryBeCompleted(category) ||
                                    'font-bold text-orange-600'
                                "
                            >
                                <ExclamationTriangleIcon
                                    v-if="!canCategoryBeCompleted(category)"
                                    class="me-1 inline size-5 stroke-2 align-text-bottom"
                                />
                                <span
                                    >{{ missingCountForCategory(category) }}
                                    {{
                                        clothesCategories.nameFromId(category)
                                    }}</span
                                >
                                <span v-if="!canCategoryBeCompleted(category)">
                                    ({{
                                        $t(
                                            'tu_nen_as_que_n',
                                            clothesByCategoryAtOrigin[category]
                                                ?.length ?? 0,
                                        )
                                    }})
                                </span>
                            </span>
                        </li>
                    </ul>

                    <VButton class="mt-4" @click="nextStep">
                        {{ $t('je_commence_ma_valise') }}
                    </VButton>
                </template>
                <template v-else>
                    <h3 class="text-xl">
                        {{ $t('tu_as_dj_tout_ce_quil_faut_lbas') }}
                    </h3>

                    <ul
                        class="mt-4 list-inside list-disc space-y-2 pl-2"
                        v-if="
                            Object.entries(clothesCountByCategoryInDestination)
                                .length
                        "
                    >
                        <li
                            v-for="[category, count] in Object.entries(
                                clothesCountByCategoryInDestination,
                            )"
                        >
                            {{ count }}
                            {{
                                clothesCategories.nameFromId(
                                    Number.parseInt(category),
                                )
                            }}
                        </li>
                    </ul>

                    <VButton
                        class="mt-4"
                        :href="route('dressings.show', destinationDressing)"
                    >
                        {{ $t('voir_le_dressing') }}
                    </VButton>
                </template>
            </template>
            <template v-else-if="step === 'recap-end'">
                <h3 class="mt-auto text-xl">
                    {{ $t('ce_quil_y_a_dans_ta_valise') }}
                </h3>

                <ul class="ms-1 mt-2 list-inside list-disc">
                    <li v-for="category in incompleteCategories">
                        <span
                            :class="
                                canCategoryBeCompleted(category) ||
                                'font-bold text-orange-600'
                            "
                        >
                            {{ selectedCountForCategory(category) }}
                            {{ clothesCategories.nameFromId(category) }}
                        </span>
                    </li>
                </ul>

                <VButton class="mt-4" @click="send">
                    {{ $t('terminer_la_valise') }}
                    <CheckIcon class="size-5" />
                </VButton>
            </template>
            <template v-else-if="stepClothingInfos">
                <div class="mt-2 grid grid-cols-2 gap-2 pb-8">
                    <VStretchedButton
                        v-for="clothing in stepClothingInfos.clothes"
                        :sr-text="$t('voir_le_dtail')"
                        @click="toggleClothingSelection(clothing)"
                        class="shrink-0 overflow-hidden rounded-xl border-4"
                        :class="
                            isClothingSelected(clothing)
                                ? 'border-amber-500'
                                : 'border-transparent'
                        "
                    >
                        <ClothingCard :clothing="clothing" />
                        <div
                            class="absolute right-1 top-1 size-6 rounded-full border p-0.5"
                            :class="
                                isClothingSelected(clothing)
                                    ? 'border-amber-500 bg-amber-500 text-amber-100'
                                    : 'border-neutral-200 bg-neutral-100'
                            "
                        >
                            <CheckIcon
                                v-if="isClothingSelected(clothing)"
                                class="size-full"
                            />
                        </div>
                    </VStretchedButton>
                </div>

                <div class="sticky bottom-0 z-20 mt-auto w-full pb-4">
                    <VButton
                        v-if="!stepClothingInfos.clothes?.length"
                        class="w-full"
                        @click="nextStep"
                    >
                        {{ $t('suivant') }}
                        <ArrowRightIcon class="size-5" />
                    </VButton>
                    <VButton
                        v-else
                        :disabled="
                            !isCategoryCompletedWithSelection(
                                stepClothingInfos.category,
                            )
                        "
                        class="w-full"
                        @click="nextStep"
                    >
                        {{ $t('cest_dans_ma_valise') }}
                        <CheckIcon class="size-5" />
                    </VButton>
                </div>
            </template>
        </div>
    </NoLayout>
</template>
