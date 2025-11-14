import firebaseService from '../../../services/firebase';

export default {
  async afterCreate(event: any) {
    console.log('🔥 [LIFECYCLE] ===== afterCreate ejecutado =====');
    const { result } = event;

    console.log('🔥 [DEBUG] esUrgente:', result.esUrgente);
    console.log('🔥 [DEBUG] enviarNotificacion:', result.enviarNotificacion);
    console.log('🔥 [DEBUG] titulo:', result.titulo);
    console.log('🔥 [DEBUG] publishedAt:', result.publishedAt);

    if (result.publishedAt && result.esUrgente && result.enviarNotificacion) {
      try {
        console.log(`📢 [afterCreate] Enviando notificación: "${result.titulo}"`);
        
        await firebaseService.sendNotificationToTopic(
          result.titulo || 'Nueva Publicación Urgente',
          'Se ha publicado un aviso importante. Revisa la app para más detalles.',
          {
            publicacionId: result.id.toString(),
            documentId: result.documentId,
            tipo: 'urgente'
          }
        );

        console.log('✅ [afterCreate] Notificación enviada exitosamente');
      } catch (error: any) {
        console.error('❌ [afterCreate] Error:', error.message);
      }
    } else {
      console.log('⚠️ [afterCreate] No se envía (draft o no urgente)');
    }
  },

  async afterUpdate(event: any) {
    console.log('🔥 [LIFECYCLE] ===== afterUpdate ejecutado =====');
    const { result, params } = event;

    console.log('🔥 [DEBUG] params.data:', JSON.stringify(params.data));
    console.log('🔥 [DEBUG] result.esUrgente:', result.esUrgente);
    console.log('🔥 [DEBUG] result.enviarNotificacion:', result.enviarNotificacion);
    console.log('🔥 [DEBUG] result.publishedAt:', result.publishedAt);

    // Si se publicó O si cambió a urgente
    const wasPublished = params.data.publishedAt !== undefined;
    const changedToUrgent = params.data.esUrgente === true;
    
    if (result.publishedAt && result.esUrgente && result.enviarNotificacion) {
      if (wasPublished || changedToUrgent) {
        try {
          console.log(`📢 [afterUpdate] Enviando notificación: "${result.titulo}"`);
          
          await firebaseService.sendNotificationToTopic(
            result.titulo || 'Publicación Urgente',
            'Se ha publicado un aviso importante. Revisa la app para más detalles.',
            {
              publicacionId: result.id.toString(),
              documentId: result.documentId,
              tipo: 'urgente'
            }
          );

          console.log('✅ [afterUpdate] Notificación enviada');
        } catch (error: any) {
          console.error('❌ [afterUpdate] Error:', error.message);
        }
      }
    } else {
      console.log('⚠️ [afterUpdate] No se envía notificación');
    }
  },
};