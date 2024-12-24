<script setup lang="ts">
import { ClothingDto } from '@/types/generated';
import { DialogTitle } from '@headlessui/vue';

import VButton from '@/Components/Base/VButton.vue';
import VTagSelect from '@/Components/Base/VTagSelect.vue';
import VTextarea from '@/Components/Base/VTextarea.vue';
import HangerIcon from '@/Components/Icon/Outline/HangerIcon.vue';
import Modal from '@/Components/Modal.vue';
import { useClothesCategories } from '@/composables/useClothesCategories';
import { useDressings } from '@/composables/useDressings';
import { TagIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/solid';
import { router, useForm } from '@inertiajs/vue3';
import { useDebounceFn } from '@vueuse/core';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref, watch } from 'vue';

const props = defineProps<{
    clothing: ClothingDto;
}>();

const emit = defineEmits<{
    close: [];
}>();

const clothesCategories = useClothesCategories();
const dressings = useDressings();

const pagination = {
    clickable: true,
};

const form = useForm({
    dressing_id: props.clothing.dressing_id,
    clothes_category_id: props.clothing.clothes_category_id,
    description: props.clothing.description,
});

const saveForm = useDebounceFn(() => {
    router.put(route('clothes.update', props.clothing), {
        clothes_category_id: form.clothes_category_id,
        dressing_id: form.dressing_id,
        description: form.description,
    });
}, 1000);

watch(form, saveForm);

const confirmDeleteClothing = ref(false);
const deleteClothing = () => {
    if (!confirmDeleteClothing.value) {
        confirmDeleteClothing.value = true;
        return;
    }

    confirmDeleteClothing.value = false;
    router.delete(route('clothes.destroy', props.clothing));
    emit('close');
};
</script>
<template>
    <Modal @close="emit('close')">
        <Swiper
            v-if="clothing.imageUrls.length > 0"
            :modules="[Pagination, Mousewheel]"
            :pagination="pagination"
            mousewheel
            class="rounded-lg md:rounded-xl"
        >
            <SwiperSlide v-for="imageUrl in clothing.imageUrls">
                <img
                    :src="imageUrl"
                    alt=""
                    class="mx-auto rounded-lg md:rounded-xl"
                />
            </SwiperSlide>
        </Swiper>
        <div
            v-else
            class="flex aspect-video w-full items-center justify-center rounded-lg bg-neutral-100 md:rounded-xl"
        >
            <QuestionMarkCircleIcon class="mx-auto size-1/4 text-neutral-200" />
        </div>

        <DialogTitle
            as="h3"
            class="mt-4 text-xl font-medium leading-6 text-gray-900"
        >
            {{ $t('detail_du_vetement') }}
        </DialogTitle>

        <div class="mt-2 flex flex-wrap gap-2">
            <VTagSelect :options="dressings.options" v-model="form.dressing_id">
                <template #icon>
                    <HangerIcon class="size-5" />
                </template>
            </VTagSelect>

            <VTagSelect
                :options="clothesCategories.options"
                v-model="form.clothes_category_id"
            >
                <template #icon>
                    <TagIcon class="size-5" />
                </template>
            </VTagSelect>
        </div>

        <VTextarea
            v-model="form.description"
            :placeholder="$t('aucune_description')"
            class="mt-2 w-full"
        />

        <div class="mt-4 flex w-full max-w-sm gap-2">
            <VButton
                @click="deleteClothing"
                icon
                :rounded="false"
                variant="danger"
            >
                <TrashIcon class="size-5" />
                <span v-if="confirmDeleteClothing">
                    ({{ $t('confirmer') }})
                </span>
            </VButton>
            <VButton @click="emit('close')" variant="tertiary" class="flex-1">
                {{ $t('fermer') }}
            </VButton>
        </div>
    </Modal>
</template>
<style lang="postcss">
.swiper-pagination-bullet {
    @apply h-1 w-7 rounded-full bg-white;
}

.swiper-pagination-bullet-active {
    @apply bg-amber-200;
}
</style>
