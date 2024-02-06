# ChallengeSmartUp 🚀

### Funcionalidades Destacadas
- **Gestión de Tareas:** Agrega, edita y filtra tareas para mejorar la organización diaria.
- **Asistencia mediante ChatBot:** Utiliza la inteligencia artificial de GPT-3.5 Turbo para brindar respuestas inteligentes y asistencia personalizada.

## Descripción de Componentes:

### ChatBot Component (Automatización de Soporte) 🤖
Un asistente virtual que emplea la API de OpenAI GPT-3.5 Turbo para respuestas inteligentes.

### Companion Component (Interacción Amigable) 🎉
Un compañero animado que realiza un salto interactivo, proporcionando una experiencia amigable y divertida.

### Home Component (Bienvenida y Descripción) 🏠
La página de inicio que da la bienvenida y describe las capacidades de la plataforma, invitando a los usuarios a iniciar sesión.

### Login Component (Autenticación de Usuario) 🔒
Un formulario de inicio de sesión con lógica simple de autenticación y redirección a la vista del usuario.

### User Component (Gestión de Tareas y Chat Integrado) 📝💬
La interfaz principal que permite a los usuarios agregar, editar y filtrar tareas, con una sección de chat integrada para asistencia.

#### Funcionalidades Adicionales en User Component:
- **Prioridades:** Las tareas pueden ser asignadas con prioridad baja (🔵), media (🟡) o alta (🔴).
- **Colores Representativos:** Se utilizan colores para visualizar la prioridad: 🔵 azul para baja, 🟡 amarillo para media y 🔴 rojo para alta.

### API Key Handling (Seguridad y Acceso a OpenAI) 🔑
Manejo seguro de la clave de API para acceder a la API de OpenAI, utilizando `import.meta.env.VITE_OPENAI_API_KEY`.

## Tecnologías Utilizadas

- **React**
- **Vite**
- **Axios**
- **Bootstrap**
- **React Bootstrap**
- **React Router**
- **React Query**
- **React Datepicker**
- **ESLint**
- **dotenv**

## Cómo Ejecutar

```bash
npm install
```
```bash
npm run dev
```
