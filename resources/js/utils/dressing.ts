import { DressingColor } from '@/types/generated';

export const dressingColorClasses = (color: DressingColor) => {
    switch (color) {
        case DressingColor.RED:
            return {
                container: 'bg-red-100 text-red-950',
                title: 'text-red-800',
            };
        case DressingColor.AMBER:
            return {
                container: 'bg-amber-100 text-amber-950',
                title: 'text-amber-800',
            };
        case DressingColor.LIME:
            return {
                container: 'bg-lime-100 text-lime-950',
                title: 'text-lime-800',
            };
        case DressingColor.EMERALD:
            return {
                container: 'bg-emerald-100 text-emerald-950',
                title: 'text-emerald-800',
            };
        case DressingColor.CYAN:
            return {
                container: 'bg-cyan-100 text-cyan-950',
                title: 'text-cyan-800',
            };
        case DressingColor.BLUE:
            return {
                container: 'bg-blue-100 text-blue-950',
                title: 'text-blue-800',
            };
        case DressingColor.VIOLET:
            return {
                container: 'bg-violet-100 text-violet-950',
                title: 'text-violet-800',
            };
        case DressingColor.FUCHSIA:
            return {
                container: 'bg-fuchsia-100 text-fuchsia-950',
                title: 'text-fuchsia-800',
            };
    }
};
