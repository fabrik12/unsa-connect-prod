export default {
  register({ strapi }: { strapi: any }) {
    console.log('STRAPI REGISTRADO - SRC/INDEX.TS');
  },

  bootstrap({ strapi }: { strapi: any }) {
    console.log('STRAPI BOOTSTRAP - SRC/INDEX.TS');
  },
};