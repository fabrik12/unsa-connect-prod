/**
 * Rutas personalizadas para publicaciones
 */
export default {
  routes: [
    {
      method: 'GET',
      path: '/publicaciones',
      handler: 'api::publicacion.publicacion.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/publicaciones/:id',
      handler: 'api::publicacion.publicacion.findOne',
      config: {
        auth: false,
      },
    },
  ],
};
