# 🧠 Backend - Flutter + Gemini App

Backend desarrollado con **NestJS** que maneja la lógica del servidor, la comunicación con la API de **Google Gemini** (IA generativa) y la integración con el cliente **Flutter**.  
Este proyecto permite procesar peticiones de IA desde el frontend, centralizar la lógica de negocio y mantener una arquitectura escalable.

---

## 🚀 Tecnologías principales

- 🟢 [NestJS](https://nestjs.com/) — Framework backend basado en Node.js  
- 🧠 [Google Gemini API](https://ai.google.dev/) — Modelo de inteligencia artificial generativa  

---

## 🧩 Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [Nest CLI](https://docs.nestjs.com/cli/overview)
- Una **API Key** válida de Google Gemini

---

## ⚙️ Configuración del entorno

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/MiguelAngMolina/gemini_app_backend.git
   cd gemini_app_backend
    ```

2. **Instalar las dependencias**
   ```bash
    npm install
    ```


3. **Configurar variables de entorno**
    Crea un archivo `.env` basado en el archivo de plantilla `.env.template`:
   Luego, modifica las variables según tu entorno:
   ```env
     GEMINI_API_KEY = tu_api_key_de_gemini
     API_URL = http://localhost:3000
   ```

 4. **Iniciar el servidor en modo desarrollo**

   Una vez configuradas las variables de entorno, ejecuta el siguiente comando para iniciar el servidor:

   ```bash
   npm run start:dev
   ```

El backend se ejecutará en:

👉 [http://localhost:3000](http://localhost:3000)

---

## 🌐 Endpoints disponibles

El backend expone varios endpoints que interactúan con la API de **Google Gemini**, permitiendo realizar distintas tareas de inteligencia artificial desde el cliente Flutter. Todos los endpoints requieren un ```prompt``` y reciben opcionalmente ```files```.

| Endpoint | Método | Descripción | Entradas adicionales |
|-----------|---------|-------------| ------------- |
| `api/gemini/basic-prompt-stream` | `POST` | Realiza una consulta puntual a Gemini (respuesta tipo texto). | - |
| `api/gemini/chat-stream` | `POST` | Mantiene una conversación con contexto, basado en un ```ChatId```. | ```ChatId``` |
| `api/gemini/chat-history/:chatId` | `GET` | Retorna el historial de conversacion basado en el ```ChatID``` | ```ChatId``` |
| `api/gemini/image-generation` | `POST` | Integra la creación y edición de imágenes. | - |
| `api/gemini/trivia/question/:topic` | `GET` | Retorna un JSON con una pregunta y 4 posibles respuestas, basado en la categoría ```topic``` que se desee.  | - |


