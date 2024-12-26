<script setup lang="ts">
import VStretchedButton from '@/Components/Base/VStretchedButton.vue';
import DressingCard from '@/Components/Dressing/DressingCard.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { DressingDto } from '@/types/generated';
import { Head, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

import VPageHeader from '@/Components/VPageHeader.vue';
import { ArrowRightIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
    dressings: Array<DressingDto>;
}>();

const destinationDressings = computed(() =>
    props.dressings.filter(
        (dressing) => dressing.id !== originDressing.value?.id,
    ),
);

const originDressing = ref<DressingDto | null>(null);
const destinationDressing = ref<DressingDto | null>(null);

const selectOrigin = (dressing: DressingDto) =>
    (originDressing.value = dressing);
const selectDestination = (dressing: DressingDto) => {
    destinationDressing.value = dressing;
    router.visit(
        route('suitcase.show', [
            originDressing.value,
            destinationDressing.value,
        ]),
    );
};
</script>

<template>
    <Head :title="$t('faire_ma_valise')" />

    <AuthenticatedLayout>
        <template #header>
            <VPageHeader :title="$t('faire_ma_valise')">
                <div>
                    <p>
                        On t'aide à faire ta valise en listant ce qu'il te
                        manque là où tu vas.
                    </p>

                    <!--                    <ol class="list-inside list-decimal">-->
                    <!--                        <li>Sélectionne où tu es et là où tu vas</li>-->
                    <!--                        <li>-->
                    <!--                            Configure le minimum de vêtement qu'il te faut pour-->
                    <!--                            chaque catégorie-->
                    <!--                        </li>-->
                    <!--                        <li>-->
                    <!--                            Ajoute tes vêtements à ta valise catégorie par-->
                    <!--                            catégorie !-->
                    <!--                        </li>-->
                    <!--                    </ol>-->
                </div>
            </VPageHeader>
        </template>

        <div class="mx-auto mt-auto w-full max-w-lg">
            <template v-if="!originDressing">
                <h3 class="text-xl">{{ $t('o_estu') }}</h3>

                <div class="mt-2 flex flex-col justify-end gap-2">
                    <VStretchedButton
                        v-for="dressing in dressings"
                        :sr-text="dressing.name"
                        @click="selectOrigin(dressing)"
                    >
                        <DressingCard :dressing="dressing" />
                        <ArrowRightIcon
                            class="absolute right-8 top-1/2 size-6 -translate-y-1/2"
                        />
                    </VStretchedButton>
                </div>
            </template>
            <template v-else>
                <h3 class="text-xl">{{ $t('o_estu') }}</h3>
                <VStretchedButton
                    :sr-text="$t('modifier_o_tu_es')"
                    @click="originDressing = null"
                    class="mt-2"
                >
                    <DressingCard :dressing="originDressing" />
                    <XMarkIcon
                        class="absolute right-8 top-1/2 size-6 -translate-y-1/2"
                    />
                </VStretchedButton>

                <h3 class="mt-12 text-xl">{{ $t('o_vastu') }}</h3>

                <div class="mt-2 flex flex-col justify-end gap-2">
                    <VStretchedButton
                        v-for="dressing in destinationDressings"
                        :sr-text="dressing.name"
                        @click="selectDestination(dressing)"
                    >
                        <DressingCard :dressing="dressing" />
                        <ArrowRightIcon
                            class="absolute right-8 top-1/2 size-6 -translate-y-1/2"
                        />
                    </VStretchedButton>
                </div>
            </template>
        </div>
    </AuthenticatedLayout>
</template>
