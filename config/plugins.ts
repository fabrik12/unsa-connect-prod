export default ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-upload-supabase-provider',
      providerOptions: {
        // Provide multiple key names so different provider implementations
        // (or versions) that expect different option names will work.
        // Primary names used by this project:
        supabaseUrl: env('SUPABASE_URL'),
        supabaseKey: env('SUPABASE_SERVICE_ROLE_KEY'),
  supabaseBucket: env('SUPABASE_BUCKET', 'uploads'),
  // Provide explicit 'bucket' alias expected by the provider implementation
  bucket: env('SUPABASE_BUCKET', 'uploads'),
        supabaseRegion: env('SUPABASE_REGION', 'us-east-1'),
  // Common alternative names some providers expect:
  url: env('SUPABASE_URL'),
  apiUrl: env('SUPABASE_URL'),
  key: env('SUPABASE_SERVICE_ROLE_KEY'),
  apiKey: env('SUPABASE_SERVICE_ROLE_KEY'),
  serviceRoleKey: env('SUPABASE_SERVICE_ROLE_KEY'),
        anonKey: env('SUPABASE_ANON_KEY'),
        supabaseOptions: {
            schema: 'public',
            publicUrl: true, // para URLs accesibles sin auth
        },
      },
    },
  },
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
