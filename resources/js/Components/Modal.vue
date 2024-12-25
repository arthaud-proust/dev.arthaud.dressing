<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue';

const props = withDefaults(
    defineProps<{
        closeable?: boolean;
    }>(),
    {
        closeable: true,
    },
);

const emit = defineEmits(['close']);

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};
</script>

<template>
    <TransitionRoot appear show as="template">
        <Dialog as="div" @close="close" class="relative z-40">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full justify-center overflow-hidden text-center max-md:items-end md:items-center md:p-4"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-200 ease-out"
                        enter-from="opacity-0 max-md:translate-y-full md:scale-95"
                        enter-to="opacity-100 max-md:translate-y-0 md:scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 max-md:translate-y-0 md:scale-100"
                        leave-to="opacity-0 max-md:translate-y-full md:scale-95"
                    >
                        <DialogPanel
                            class="relative w-full max-w-2xl transform flex-col items-start overflow-hidden rounded-t-2xl bg-white p-4 text-left align-middle shadow-xl transition-all md:rounded-3xl md:p-6"
                        >
                            <slot />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
