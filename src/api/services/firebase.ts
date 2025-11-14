/**
 * Firebase Cloud Messaging Service
 * Servicio para enviar notificaciones push usando Firebase Admin SDK
 */

import * as admin from 'firebase-admin';

class FirebaseService {
  private initialized: boolean = false;

  /**
   * Inicializa Firebase Admin SDK con las credenciales del .env
   */
  initialize() {
    if (this.initialized) return;

    try {
      console.log('🔥 [DEBUG Firebase] Inicializando Firebase Admin SDK...');
      console.log('🔥 [DEBUG Firebase] Variable FIREBASE_SERVICE_ACCOUNT existe:', !!process.env.FIREBASE_SERVICE_ACCOUNT);
      
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });

      this.initialized = true;
      console.log('✅ Firebase Admin SDK initialized successfully');
    } catch (error: any) {
      console.error('❌ Error initializing Firebase Admin SDK:', error.message);
      console.error('❌ Stack:', error.stack);
      throw error;
    }
  }

  /**
   * Envía una notificación push a un topic (todos los dispositivos suscritos)
   */
  async sendNotificationToTopic(title: string, body: string, data: Record<string, string> = {}) {
    if (!this.initialized) {
      this.initialize();
    }

    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: data,
      topic: 'publicaciones-urgentes',
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('✅ Notificación enviada exitosamente:', response);
      return response;
    } catch (error: any) {
      console.error('❌ Error al enviar notificación:', error);
      throw error;
    }
  }

  /**
   * Envía una notificación push a todos los dispositivos (usando multicast)
   */
  async sendNotificationToDevices(title: string, body: string, tokens: string[], data: Record<string, string> = {}) {
    if (!this.initialized) {
      this.initialize();
    }

    if (!tokens || tokens.length === 0) {
      console.warn('⚠️ No hay tokens de dispositivos para enviar notificación');
      return;
    }

    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: data,
      tokens: tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log(`✅ Notificación enviada: ${response.successCount} exitosas, ${response.failureCount} fallidas`);
      return response;
    } catch (error: any) {
      console.error('❌ Error al enviar notificación:', error);
      throw error;
    }
  }
}

// Exportar una instancia única (Singleton)
export default new FirebaseService();