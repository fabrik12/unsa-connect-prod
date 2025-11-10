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
});
