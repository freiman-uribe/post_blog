# 📝 Blog Vue

Una aplicación moderna de blog construida con Vue 3, TypeScript y Vite que consume la API de JSONPlaceholder para mostrar y gestionar posts de manera elegante y eficiente.

![Vue 3](https://img.shields.io/badge/Vue-3.5.24-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.18-38B2AC.svg)

## ✨ Características

- 🎨 **Interfaz Moderna**: Diseño limpio y responsive con Tailwind CSS 4
- 🔍 **Búsqueda en Tiempo Real**: Filtra posts por título instantáneamente
- 📄 **Paginación**: Navegación eficiente a través de múltiples páginas de posts
- 🔗 **Routing Dinámico**: Navegación fluida con Vue Router
- 💾 **Gestión de Estado**: Manejo centralizado con Pinia
- 🎯 **TypeScript**: Código type-safe para mayor confiabilidad
- 🧩 **Arquitectura Atómica**: Componentes organizados en átomos, moléculas y views
- ⚡ **Optimizado**: Construcción rápida con Vite

## 🛠️ Tecnologías

- **Frontend Framework**: [Vue 3](https://vuejs.org/) con Composition API
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **Estado**: [Pinia](https://pinia.vuejs.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## 📁 Estructura del Proyecto

```
blog-vue/
├── public/              # Archivos estáticos
├── src/
│   ├── api/            # Servicios de API
│   │   └── posts.api.ts
│   ├── assets/         # Recursos (imágenes, fuentes, etc.)
│   ├── components/     # Componentes Vue
│   │   ├── atoms/     # Componentes básicos
│   │   │   ├── BaseButton.vue
│   │   │   └── BaseInput.vue
│   │   └── molecules/ # Componentes compuestos
│   │       ├── BaseAlert.vue
│   │       ├── BaseCard.vue
│   │       ├── BaseFooter.vue
│   │       ├── BaseHeader.vue
│   │       ├── BaseLoader.vue
│   │       ├── BasePagination.vue
│   │       └── BaseSearch.vue
│   ├── config/         # Configuración de la app
│   │   └── api.ts
│   ├── router/         # Configuración de rutas
│   │   └── index.ts
│   ├── stores/         # Stores de Pinia
│   │   └── posts.store.ts
│   ├── types/          # Definiciones de tipos TypeScript
│   │   ├── componets.type.ts
│   │   └── post.type.ts
│   ├── views/          # Vistas/Páginas
│   │   ├── NotFoundView.vue
│   │   ├── PostDetailView.vue
│   │   └── PostsListView.vue
│   ├── App.vue         # Componente raíz
│   ├── main.ts         # Punto de entrada
│   └── style.css       # Estilos globales
├── .env.example        # Variables de entorno de ejemplo
├── index.html          # HTML principal
├── package.json        # Dependencias y scripts
├── tsconfig.json       # Configuración TypeScript
└── vite.config.ts      # Configuración de Vite
```

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js**: v21.x

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/freiman-uribe/post_blog.git
cd post_blog
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env
```

Contenido del archivo `.env`:

```env
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
VITE_API_TIMEOUT=10000
```

4. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Previsualiza la construcción de producción |

## 🌐 Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | PostsListView | Lista principal de posts con búsqueda y paginación |
| `/posts/:id` | PostDetailView | Vista detallada de un post específico |
| `*` | NotFoundView | Página 404 para rutas no encontradas |

## 🎨 Componentes Principales

### Átomos
- **BaseButton**: Botón reutilizable con variantes de estilo
- **BaseInput**: Campo de entrada personalizado

### Moléculas
- **BaseAlert**: Componente de alertas con diferentes tipos
- **BaseCard**: Tarjeta para mostrar contenido de posts
- **BaseFooter**: Pie de página de la aplicación
- **BaseHeader**: Encabezado de navegación
- **BaseLoader**: Indicador de carga
- **BasePagination**: Componente de paginación
- **BaseSearch**: Barra de búsqueda con debounce

## 🔧 Configuración

### Alias de Rutas

El proyecto usa alias `@` para importaciones absolutas:

```typescript
import BaseButton from '@/components/atoms/BaseButton.vue';
```

### Configuración de TypeScript

Configuración estricta habilitada para mayor seguridad de tipos:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`

## 🎯 Características de la Store

La store de Pinia (`posts.store.ts`) maneja:
- Listado de posts con paginación
- Búsqueda y filtrado de posts
- Carga de detalles de posts individuales
- Estados de carga y error
- Caché de posts ya cargados

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia correspondiente.

## 👨‍💻 Autor

Freiman Uribe

---

**Nota**: Este proyecto utiliza JSONPlaceholder como API de prueba. Para uso en producción, reemplaza la URL de la API en el archivo `.env` con tu backend real.
