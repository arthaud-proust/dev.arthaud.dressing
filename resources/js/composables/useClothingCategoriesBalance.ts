import { ClothesCategoryDto, ClothingDto } from '@/types/generated';
import { MaybeRefOrGetter } from '@vueuse/core';
import { computed, ref, toValue } from 'vue';

export type ClothesCountByCategoryId = Record<string, number>;
export type ClothesIdsByCategoryId = Record<
    ClothesCategoryDto['id'],
    Set<ClothingDto['id']>
>;

export const useClothingCategoriesBalance = ({
    min,
    current,
    available,
}: {
    min: MaybeRefOrGetter<ClothesCountByCategoryId>;
    current: MaybeRefOrGetter<ClothesCountByCategoryId>;
    available: MaybeRefOrGetter<ClothesCountByCategoryId>;
}) => {
    const selectedClothesId = ref<ClothesIdsByCategoryId>({});

    const isClothingSelected = (
        clothing: Pick<ClothingDto, 'id' | 'clothes_category_id'>,
    ) =>
        toValue(selectedClothesId)[clothing.clothes_category_id]?.has(
            clothing.id,
        );

    const toggleClothingSelection = (
        clothing: Pick<ClothingDto, 'id' | 'clothes_category_id'>,
    ) => {
        toValue(selectedClothesId)[clothing.clothes_category_id] ??= new Set();

        isClothingSelected(clothing)
            ? toValue(selectedClothesId)[clothing.clothes_category_id].delete(
                  clothing.id,
              )
            : toValue(selectedClothesId)[clothing.clothes_category_id].add(
                  clothing.id,
              );
    };

    const selectedCountForCategory = (categoryId: ClothesCategoryDto['id']) =>
        toValue(selectedClothesId)[categoryId]?.size ?? 0;

    const computeSelectedClothesId = () =>
        Object.values(toValue(selectedClothesId)).flatMap((set) => [...set]);

    const categoryFromString = (str: string) => Number.parseInt(str);

    const missingCountForCategory = (categoryId: ClothesCategoryDto['id']) =>
        toValue(min)[categoryId] - (toValue(current)[categoryId] ?? 0);

    const isCategoryIncomplete = (categoryId: ClothesCategoryDto['id']) =>
        missingCountForCategory(categoryId) > 0;

    const canCategoryBeCompleted = (categoryId: ClothesCategoryDto['id']) =>
        toValue(available)[categoryId] >= missingCountForCategory(categoryId);

    const isCategoryCompletedWithSelection = (
        categoryId: ClothesCategoryDto['id'],
    ) => {
        if (canCategoryBeCompleted(categoryId)) {
            return (
                selectedCountForCategory(categoryId) >=
                missingCountForCategory(categoryId)
            );
        }

        return (
            selectedCountForCategory(categoryId) ===
            toValue(available)[categoryId]
        );
    };

    const canAllCategoriesBeCompleted = computed(() =>
        Object.keys(toValue(min)).map((categoryStr) =>
            canCategoryBeCompleted(categoryFromString(categoryStr)),
        ),
    );

    const incompleteCategories = computed(() =>
        Object.keys(toValue(min))
            .map((categoryStr) => categoryFromString(categoryStr))
            .filter((category) => isCategoryIncomplete(category)),
    );

    const missingCountByCategory = computed(() =>
        Object.keys(toValue(min)).map((categoryStr) =>
            missingCountForCategory(categoryFromString(categoryStr)),
        ),
    );

    const percentageOfMinNotDefined = computed(() => {
        let nCategoriesToZero = 0;
        let nCategories = 0;

        Object.values(toValue(min)).forEach((v: number) => {
            nCategories++;
            if (v === 0) {
                nCategoriesToZero++;
            }
        });

        return (100 * nCategoriesToZero) / Math.max(nCategories, 1);
    });

    return {
        selectedClothesId,
        isClothingSelected,
        toggleClothingSelection,
        computeSelectedClothesId,
        selectedCountForCategory,
        categoryFromString,
        missingCountForCategory,
        isCategoryIncomplete,
        isCategoryCompletedWithSelection,
        canCategoryBeCompleted,
        canAllCategoriesBeCompleted,
        missingCountByCategory,
        incompleteCategories,
        percentageOfMinNotDefined,
    };
};
