import { usePage } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';

export const useDressings = () => {
    const page = usePage();
    const { t } = useI18n();

    const dressings = page.props.dressings ?? [];

    const name = (dressingId?: number) =>
        (dressingId ? dressings[dressingId] : undefined) ??
        t('dressing_inconnu');

    const options = Object.entries(dressings).map(([id, name]) => ({
        value: Number.parseInt(id),
        label: name,
    }));

    const defaultMinForEachDressing = () =>
        Object.fromEntries(
            Object.keys(dressings).map((dressingId) => [dressingId, 0]),
        );

    return {
        all: dressings,
        defaultMinForEachDressing,
        name,
        options,
    };
};
