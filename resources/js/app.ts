import '../css/app.css';
import './bootstrap';

import { messages } from '@/i18n';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, DefineComponent, h } from 'vue';
import { createI18n } from 'vue-i18n';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

import { register as registerSwiper } from 'swiper/element/bundle';

registerSwiper();

type MessageSchema = (typeof messages)['fr'];

const locale = () =>
    ('userLanguage' in navigator
        ? (navigator.userLanguage as string)
        : navigator.language
    ).split('-')[0];

const i18n = createI18n<[MessageSchema], keyof typeof messages>({
    legacy: false,
    globalInjection: true,
    locale: locale(),
    fallbackLocale: 'fr',
    messages,
});
export const t = i18n.global.t;

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(i18n)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
