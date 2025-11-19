export default ({ env }) => ({
  // Example plugin configuration
  documentation: {
    enabled: true,
    config: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'UNSA Connect API',
        description: 'API para la gestión de publicaciones, foros y noticias de la UNSA.',
        contact: {
          name: 'Equipo de Desarrollo UNSA Connect',
          email: 'soporte@unsa.edu.pe',
          url: 'https://unsa.edu.pe',
        },
        license: {
          name: 'Apache 2.0',
          url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        },
      },
      'x-strapi-config': {
        // Cambia esto a 'false' si quieres ocultar la ruta pública y solo acceder desde el Admin
        // O cámbialo a una ruta secreta como '/api-docs-secret'
        path: '/documentation', 
        showGeneratedExamples: true,
        plugins: ['upload', 'users-permissions'], // Plugins a documentar
      },
    },
  },
});
