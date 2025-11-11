/**
 * publicacion controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::publicacion.publicacion', ({ strapi }) => ({
    async find(ctx) {
        // Allow callers to control population via query string but restrict to a whitelist
        // to avoid unintentionally exposing internal relations (e.g. full user records with password hashes).
        const rawPopulate = ctx.query && ctx.query.populate ? ctx.query.populate : null;

        // Whitelist of relations we allow to populate for public endpoints
        const ALLOWED = ['portada', 'categorias', 'contenido', 'createdBy', 'updatedBy'];

        const buildPopulate = (raw) => {
            // default
            if (!raw) return { categorias: true, portada: true };

            // if client asked for '*' we only expand to the ALLOWED set (not everything)
            if (raw === '*') {
                const obj = {};
                ALLOWED.forEach(k => {
                    if (k === 'contenido') obj[k] = { populate: '*' };
                    else obj[k] = true;
                });
                return obj;
            }

            // try JSON
            if (typeof raw === 'string') {
                try {
                    const parsed = JSON.parse(raw);
                    return parsed;
                } catch (e) {
                    // not JSON
                }

                // support comma separated list: portada,categorias
                if (raw.indexOf(',') !== -1) {
                    const arr = raw.split(',').map(s => s.trim()).filter(Boolean);
                    const obj = {};
                    arr.forEach(k => {
                        if (!ALLOWED.includes(k)) return; // ignore non-whitelisted
                        if (k === 'contenido') obj[k] = { populate: '*' };
                        else obj[k] = true;
                    });
                    return obj;
                }

                // single field - only allow if whitelisted
                if (ALLOWED.includes(raw)) {
                    return raw === 'contenido' ? { [raw]: { populate: '*' } } : { [raw]: true };
                }
                // not allowed -> default
                return { categorias: true, portada: true };
            }

            return { categorias: true, portada: true };
        };

        const populate = buildPopulate(rawPopulate);

        // Usa DB QUERY para saltar filtros automaticos de Strapi que ocultan publishedAt
        const entities = await strapi.db.query('api::publicacion.publicacion').findMany({
            where: {
                publishedAt: { $notNull: true },
            },
            populate,
        });

        // sanitize: remove sensitive fields from any user objects that may be present
        const sensitiveKeys = ['password', 'resetPasswordToken', 'confirmationToken', 'registrationToken'];

        const traverseAndSanitize = (obj) => {
            if (!obj || typeof obj !== 'object') return;
            if (Array.isArray(obj)) {
                obj.forEach(item => traverseAndSanitize(item));
                return;
            }
            // if object has a password field, strip sensitive keys
            if ('password' in obj) {
                sensitiveKeys.forEach(k => delete obj[k]);
            }
            // also sanitize common user arrays (users_permissions_users)
            if (Array.isArray(obj.users_permissions_users)) {
                obj.users_permissions_users.forEach(u => {
                    sensitiveKeys.forEach(k => delete u[k]);
                });
            }

            // recurse into properties
            Object.keys(obj).forEach(k => {
                try {
                    traverseAndSanitize(obj[k]);
                } catch (e) {
                    // ignore recursion errors
                }
            });
        };

        traverseAndSanitize(entities);
        return entities;
    },

    async findOne(ctx) {
        const { id } = ctx.params;

        // Respect client-provided populate if present but restrict to allowed relations
        const rawPopulate = ctx.query && ctx.query.populate ? ctx.query.populate : null;

        const ALLOWED = ['portada', 'categorias', 'contenido', 'createdBy', 'updatedBy'];

        const buildPopulate = (raw) => {
            if (!raw) return { categorias: true, contenido: { populate: '*' }, portada: true };
            if (raw === '*') {
                const obj = {};
                ALLOWED.forEach(k => {
                    if (k === 'contenido') obj[k] = { populate: '*' };
                    else obj[k] = true;
                });
                return obj;
            }
            if (typeof raw === 'string') {
                try {
                    const parsed = JSON.parse(raw);
                    return parsed;
                } catch (e) {
                    // not JSON
                }
                if (raw.indexOf(',') !== -1) {
                    const arr = raw.split(',').map(s => s.trim()).filter(Boolean);
                    const obj = {};
                    arr.forEach(k => {
                        if (!ALLOWED.includes(k)) return;
                        if (k === 'contenido') obj[k] = { populate: '*' };
                        else obj[k] = true;
                    });
                    return obj;
                }
                if (ALLOWED.includes(raw)) return raw === 'contenido' ? { [raw]: { populate: '*' } } : { [raw]: true };
                return { categorias: true, contenido: { populate: '*' }, portada: true };
            }
            return { categorias: true, contenido: { populate: '*' }, portada: true };
        };

        const populate = buildPopulate(rawPopulate);

        // Usa DB QUERY para saltar filtros automaticos de Strapi que ocultan publishedAt
        const entity = await strapi.db.query('api::publicacion.publicacion').findOne({
            where: {
                id: id,
                publishedAt: { $notNull: true },
            },
            populate,
        });

        if (!entity) {
            return ctx.notFound('Publicacion not found');
        }

        // sanitize user sensitive fields
        const sensitiveKeys = ['password', 'resetPasswordToken', 'confirmationToken', 'registrationToken'];
        const traverseAndSanitize = (obj) => {
            if (!obj || typeof obj !== 'object') return;
            if (Array.isArray(obj)) {
                obj.forEach(item => traverseAndSanitize(item));
                return;
            }
            if ('password' in obj) {
                sensitiveKeys.forEach(k => delete obj[k]);
            }
            if (Array.isArray(obj.users_permissions_users)) {
                obj.users_permissions_users.forEach(u => {
                    sensitiveKeys.forEach(k => delete u[k]);
                });
            }
            Object.keys(obj).forEach(k => {
                try {
                    traverseAndSanitize(obj[k]);
                } catch (e) {}
            });
        };

        traverseAndSanitize(entity);
        return entity;
    },
}));
