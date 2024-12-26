import { usePage } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';

const UNCATEGORIZED_NAME = 'uncategorized';
export const useClothesCategories = () => {
    const page = usePage();
    const { t } = useI18n();

    const UNCATEGORIZED_TRANSLATION = t('non_categorises');
    const translatedName = (name?: string) =>
        !name || name === 'uncategorized' ? UNCATEGORIZED_TRANSLATION : name;

    const all = (page.props.clothesCategories ?? []).map((category) => ({
        ...category,
        name: translatedName(category.name),
    }));

    const allWithoutUncategorized = all.filter(
        (category) => category.name !== UNCATEGORIZED_TRANSLATION,
    );

    const categoryFromId = (categoryId?: number) =>
        categoryId ? all.find(({ id }) => id === categoryId) : undefined;

    const nameFromId = (categoryId?: number) =>
        translatedName(categoryFromId(categoryId)?.name);

    const options = all.map(({ id, name }) => ({
        value: id,
        label: name,
    }));
    const optionsWithoutUncategorized = allWithoutUncategorized.map(
        ({ id, name }) => ({
            value: id,
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
