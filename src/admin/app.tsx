import type { StrapiApp } from '@strapi/strapi/admin';

import logoAuth from './extensions/logo-auth.png';
import logoMenu from './extensions/logo-menu.png';

export default {
    config: {
        locales: ['es'],
        translations: {
            es: {
                'Auth.form.welcome.title': 'Bienvenido a UNSA Connect',
                'Auth.form.welcome.subtitle': 'Panel de Administración',
                'app.components.LeftMenu.navbrand.title': 'UNSA Dashboard',
            },
            en: {
                'Auth.form.welcome.title': 'Welcome to UNSA Connect',
                'Auth.form.welcome.subtitle': 'Admin Panel',
                'app.components.LeftMenu.navbrand.title': 'UNSA Dashboard',
            }
        },
        // Cambiar logos
        auth: {
            logo: logoAuth,
        },
        menu: {
            logo: logoMenu,
        },

        theme: {
            colors: {
                // Color primario (Botones, links activos) - Escala de Ginda
                primary100: '#fcecec', // Fondo muy claro
                primary200: '#f5cdcd',
                primary500: '#b91c1c', // Color principal (aprox)
                primary600: '#991b1b', // Hover
                primary700: '#7f1d1d', // Active

                danger700: '#b72b1a'
            },
        },
    },
    bootstrap(app: StrapiApp) {
        console.log(app);
    },
};