import { usePage } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';

const UNCATEGORIZED_NAME = 'uncategorized';
export const useClothesCategories = () => {
    const page = usePage();
    const { t } = useI18n();

    const UNCATEGORIZED_TRANSLATION = t('non_categorises');
    const translatedName = (name?: string) =>
        !name || name === 'uncategorized' ? UNCATEGORIZED_TRANSLATION : name;

    const allArray = Object.entries(page.props.clothesCategories ?? {}).map(
        ([id, name]) => [id, translatedName(name)],
    ) as Array<[string, string]>;
    const allArrayWithoutUncategorized = allArray.filter(
        ([id, name]) => name !== UNCATEGORIZED_TRANSLATION,
    );

    const all = Object.fromEntries(allArray);
    const allWithoutUncategorized = Object.fromEntries(
        allArrayWithoutUncategorized,
    );

    const nameFromId = (categoryId?: number) =>
        translatedName(all[categoryId ?? '-1']);

    const options = allArray.map(([id, name]) => ({
        value: Number.parseInt(id),
        label: name,
    }));
    const optionsWithoutUncategorized = allArrayWithoutUncategorized.map(
        ([id, name]) => ({
            value: Number.parseInt(id),
            label: name,
        }),
    );

    return {
        all,
        allWithoutUncategorized,
        translatedName,
        nameFromId,
        options,
        optionsWithoutUncategorized,
    };
};
