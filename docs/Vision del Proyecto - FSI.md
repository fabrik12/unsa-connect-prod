# Documento de Visión del Proyecto (FSI): Sistema de Información "UNSA Connect"

**Versión:** 1.0 **Curso:** Fundamentos de Sistemas de Información (FSI) **Fecha:** 29 de Septiembre de 2025

---

### 1\. Visión del Sistema de Información

Diseñar y desarrollar el **núcleo de un Sistema de Información** que transforme la comunicación institucional de la UNSA, pasando de un modelo fragmentado a una plataforma centralizada, proactiva y medible, sentando las bases para futuros canales de comunicación como una aplicación móvil.

---

### 2\. Problemática Organizacional

La UNSA enfrenta una **problemática institucional** de alto impacto: su estrategia de comunicación digital es ineficiente. La información crítica se dispersa en múltiples canales (web, email, redes), lo que resulta en una comunicación reactiva y una baja participación de la comunidad. Este proyecto aborda la necesidad de un **sistema de información centralizado** que actúe como la única fuente de verdad para todas las comunicaciones oficiales, tal como se solicita en el enunciado del proyecto de FSI.

---

### 3\. Objetivos del Proyecto (Para el curso de FSI)

El objetivo de nuestro equipo es diseñar y construir el **prototipo funcional del backend** del sistema "UNSA Connect", aplicando los principios de la ingeniería de sistemas de información. Nuestros entregables se alinearán con la arquitectura de tres capas exigida por la rúbrica.

- **Diseñar la Capa de Datos:** Modelar e implementar una base de datos normalizada en MySQL que almacene de forma estructurada toda la información institucional.
- **Desarrollar la Capa de Lógica de Negocio:** Implementar una API REST (usando Python/JavaScript) que contenga las reglas de negocio para la gestión de contenido y usuarios.
- **Proveer la Interfaz para la Capa de Presentación:** Definir y construir los endpoints que una futura aplicación cliente (web o móvil) consumirá para mostrar la información.

---

### 4\. Alcance del MVP para FSI: El Sistema de Gestión de Contenidos (CMS)

El entregable funcional de nuestro equipo será el **prototipo del CMS y su API REST**. Este sistema permitirá a la administración de la UNSA gestionar el ciclo de vida de las comunicaciones.

**Funcionalidades a Desarrollar:**

1. **Gestión de Contenido:** Un conjunto de endpoints en la API para crear, leer, actualizar y eliminar publicaciones (CRUD).
2. **Autenticación de Administradores:** Un mecanismo de seguridad para garantizar que solo personal autorizado pueda gestionar el contenido.
3. **Servicio de Notificaciones:** Integración con un servicio en la nube (Firebase Cloud Messaging) para gestionar el envío de notificaciones push, cumpliendo con el requisito de "alta tecnología".

**Fuera del Alcance de FSI:**

- El desarrollo de la aplicación móvil cliente. Nuestro sistema será probado y demostrado usando herramientas profesionales como **Postman**.

---

### 5\. Entregables Clave del Equipo FSI

Para cumplir con la rúbrica, nuestro equipo producirá los siguientes artefactos:

1. **Informe Técnico:**
   - Documento de visión, justificación y antecedentes.
   - Especificación detallada de requerimientos (10 funcionales, 5 no funcionales).
   - Diagramas de la arquitectura de 3 capas.
   - Modelo Entidad-Relación y esquema físico de la base de datos MySQL.
2. **Prototipo Funcional:**
   - El código fuente del backend (API REST).
   - La base de datos implementada.
3. **Demostración Funcional:**
   - Una demostración en vivo del backend utilizando Postman para probar los endpoints de la API.
   - Un reporte de las pruebas de usabilidad realizadas sobre el prototipo (si aplica al CMS).

---

Este documento pretende establecer un plan de trabajo claro y realista que se alinea perfectamente con los objetivos del curso de FSI. Y asi posiciones al equipo para entender la diferencia entre diseñar un sistema de información robusto y desarrollar sistema para el cliente.
