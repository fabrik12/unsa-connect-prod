import type { Schema, Struct } from '@strapi/strapi';

export interface ContenidoParrafo extends Struct.ComponentSchema {
  collectionName: 'components_contenido_parrafos';
  info: {
    displayName: 'parrafo';
  };
  attributes: {
    texto: Schema.Attribute.Blocks;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contenido.parrafo': ContenidoParrafo;
    }
  }
}
