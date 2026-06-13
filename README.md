# SmartLogix — Plataforma de Gestión Logística

Sitio web corporativo de SmartLogix, una plataforma SaaS de gestión logística para PYMEs chilenas. Construido con React 18, TypeScript, Tailwind CSS, y Vite.

## Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Componentes y Arquitectura](#componentes-y-arquitectura)
- [Sistema de Diseño y Modo Oscuro](#sistema-de-diseño-y-modo-oscuro)
- [Chatbot IA](#chatbot-ia)
- [Buenas Prácticas](#buenas-prácticas)
  - [DRY (Don't Repeat Yourself)](#dry)
  - [SOLID](#solid)
  - [LEAN](#lean)
  - [KISS (Keep It Simple, Stupid)](#kiss)
- [Variables de Entorno](#variables-de-entorno)
- [Comandos Disponibles](#comandos-disponibles)
- [Desarrollo](#desarrollo)

---

## Stack Tecnológico

| Capa | Tecnología | Propósito |
|------|-----------|-----------|
| Framework | React 18 + TypeScript | UI declarativa y tipado estático |
| Build | Vite 5 | Dev server rápido, HMR, build optimizado |
| Estilos | Tailwind CSS 3 | Utilidades atómicas + design system vía CSS vars |
| Animaciones | Framer Motion 12 | Animaciones de entrada, layout, y gestos |
| Componentes UI | shadcn/ui + Radix | Componentes accesibles y personalizables |
| Iconos | Lucide React | Iconos SVG livianos y consistentes |
| IA Chat | OpenRouter API | Gateway multi-modelo para el chatbot |
| Modo oscuro | next-themes | Toggle de tema con persistencia y detección del SO |
| Formularios | react-hook-form + Zod | Manejo de formularios con validación |
| Cache/Estado | TanStack React Query | Cache de datos y sincronización |
| Notificaciones | sonner | Toasts livianos y personalizables |

## Estructura del Proyecto

```
src/
├── components/
│   ├── auth/          # Modal de login/registro con SII search
│   ├── layout/        # Header (nav + theme toggle)
│   ├── shared/        # FormField, FormTextarea, SiiSearch
│   └── ui/            # shadcn/ui components + ChatBubble, chatbot
├── data/              # Datos estáticos (features, planes, FAQs, testimonios)
├── hooks/             # Custom hooks (useChat, useFadeInView)
├── lib/               # Utilidades (cn con tailwind-merge)
├── pages/             # Páginas (Index compone las secciones)
├── services/          # Servicios externos (OpenRouter chat)
└── types/             # Interfaces compartidas (ai.ts, index.ts)
```

Cada carpeta tiene una responsabilidad única y bien definida. Los componentes se dividen en:

- **`auth/`** — Lógica de autenticación (modal, hook de formulario)
- **`layout/`** — Estructura de la página (Header)
- **`shared/`** — Componentes reutilizables de formulario
- **`ui/`** — Componentes atómicos (botones, inputs, badge, etc.) + chatbot
- **`data/`** — Datos estáticos separados de la presentación

## Componentes y Arquitectura

### Patrón de Composición

Cada sección de la página es un componente independiente que recibe sus datos desde `src/data/`:

```
Index
├── HeroSection        (call-to-action principal)
├── AboutSection       (historia y valores)
├── FeaturesSection    (6 funcionalidades desde data/features.tsx)
├── TestimonialsSection(carrusel desde data/testimonials.tsx)
├── PricingSection     (3 planes desde data/plans.tsx)
├── CtaSection         (llamado a la acción)
├── FaqSection         (acordeón desde data/faqs.tsx)
├── ContactSection     (formulario de contacto)
└── Footer             (información corporativa)
```

### Componentes Reutilizables (`shared/`)

- **`FormField`** — Input con label, usa `forwardRef` y `cn()` para compatibilidad con react-hook-form
- **`FormTextarea`** — Mismo patrón que FormField pero para `<textarea>`
- **`SiiSearch`** — Búsqueda de códigos SII chilenos

### Hooks Personalizados

| Hook | Propósito |
|------|-----------|
| `useFadeInView` | Animación de entrada al hacer scroll. Unifica initial/whileInView/viewport/transition de framer-motion |
| `useChat` | Toda la lógica del chatbot (historial, envío, loading). El componente chatbot solo renderiza |
| `hoverLift` | Objeto estático para efecto de elevación en hover |

## Sistema de Diseño y Modo Oscuro

### Colores

El sistema de colores se define en `src/index.css` mediante variables CSS en formato HSL:

```css
:root {           /* Modo claro (default) */
  --saas-teal: 190 77% 19%;    /* #0B4654 */
  --saas-orange: 31 100% 50%;  /* #FF8400 */
  --saas-white: 0 0% 100%;
  --saas-darkGray: 0 0% 10%;
  /* ... */
}

.dark {           /* Modo oscuro (vía next-themes) */
  --saas-teal: 190 60% 55%;    /* más claro para contraste */
  --saas-white: 0 0% 6%;       /* fondo oscuro */
  --saas-darkGray: 0 0% 14%;
  /* ... */
}
```

Los colores se referencian en `tailwind.config.ts` como `hsl(var(--saas-*))`, lo que permite que todos los componentes cambien automáticamente de tema sin necesidad de importar variables de JavaScript.

### Mecanismo de Toggle

1. `next-themes` agrega/remueve la clase `.dark` en `<html>`
2. Tailwind `darkMode: ["class"]` y las CSS vars responden a esa clase
3. El Header tiene un botón con iconos `<Sun />` / `<Moon />` de Lucide
4. La preferencia se guarda en `localStorage` y respeta `prefers-color-scheme`

### Diseño de Variantes `dark:`

Para colores estándar de Tailwind (ej. `bg-white`, `text-slate-600`) se usan variantes explícitas:

```tsx
<section className="bg-white dark:bg-saas-darkGray">
  <p className="text-slate-600 dark:text-slate-300">...</p>
</section>
```

## Chatbot IA

### Arquitectura (basada en principios SOLID)

```
types/ai.ts                     ← Define IChatService (interface)
services/openrouter-chat.service.ts  ← Implementa IChatService
hooks/use-chat.ts               ← Consume IChatService, expone estado y handlers
components/ui/ChatBubble.tsx    ← Renderiza un mensaje (presentacional)
components/ui/chatbot.tsx       ← Compone hook + ChatBubble (UI pura)
```

### Cómo Cambiar de Proveedor

1. Crea un archivo en `src/services/` que implemente `IChatService`
2. En `src/hooks/use-chat.ts`, cambia la importación:

```ts
// import { chatService } from "@/services/openrouter-chat.service";
import { chatService } from "@/services/gemini-chat.service";
```

### Modelos Gratuitos Disponibles

Por defecto usa `nvidia/nemotron-3-nano-30b-a3b:free`. Otros modelos free:

- `deepseek/deepseek-chat-v3.1:free`
- `google/gemma-4-26b-a4b-it:free`
- `meta-llama/llama-4-scout:free`
- `liquid/lfm-2.5-1.2b-instruct:free`

## Buenas Prácticas

### DRY (Don't Repeat Yourself)

- **Hook `useFadeInView`**: Elimina la repetición de objetos `initial`/`whileInView`/`transition` de framer-motion en 6 componentes
- **Design System en CSS vars**: Los colores se definen UNA VEZ en `index.css` y se referencian desde `tailwind.config.ts` como `hsl(var(--saas-*))`. Para cambiar un color se edita un solo archivo, no 20 componentes
- **`FormField` / `FormTextarea`**: Encapsulan el patrón label + field + forwardRef + cn(). Sin ellos, cada formulario duplicaría ~15 líneas de clases y estructura HTML
- **Datos estáticos en `data/`**: Features, planes, FAQs, testimonios y nav-items viven en archivos separados. Los componentes solo mapean y renderizan

### SOLID

| Principio | Aplicación |
|-----------|-----------|
| **S** — Single Responsibility | Cada archivo hace una cosa: `useChat` maneja estado, `chatbot.tsx` renderiza, `openrouter-chat.service.ts` llama APIs |
| **O** — Open/Closed | Agregar un proveedor de IA no requiere modificar el hook. Solo crear un nuevo archivo que implemente `IChatService` |
| **L** — Liskov Substitution | Cualquier servicio que implemente `IChatService` puede reemplazar a otro sin cambiar el comportamiento esperado |
| **I** — Interface Segregation | `IChatService` tiene UN solo método (`sendMessage`). Las interfaces son pequeñas y específicas |
| **D** — Dependency Inversion | `useChat` depende de `IChatService` (abstracción), no de `OpenRouterChatService` (concreto). Se cambia el proveedor modificando una línea de importación |

### LEAN

- **Sin dependencias innecesarias**: Se eliminaron `react-router-dom` (se usan anclas HTML) y `@google/generative-ai` (reemplazado por OpenRouter vía fetch nativo)
- **Sin código muerto**: Se eliminaron `gemini-chat.service.ts`, `use-toast.ts` duplicado, `toaster.tsx` duplicado, y múltiples exports no utilizados de shadcn
- **Sin lógica duplicada**: El hook `useChat` centraliza toda la lógica del chatbot. El componente solo es una plantilla de renderizado

### KISS (Keep It Simple, Stupid)

- **Sin estado global innecesario**: El chatbot usa `useState` local. No se necesita Redux, Zustand ni Context para un widget de chat
- **Sin BrowserRouter**: La navegación usa anclas HTML (`href="#seccion"`) con scroll nativo. No se necesita un router para una landing page de una sola página
- **Sin capas de abstracción innecesarias**: Los servicios son clases simples con un método. No hay decoradores, metadata, ni DI containers
- **Nombres en español**: Los identificadores clave (`mensaje`, `handleEnviar`, `SALUDO_INICIAL`) usan español para que el equipo local entienda el código sin traducción mental

## Variables de Entorno

Copia `.env.example` como `.env`:

```bash
cp .env.example .env
```

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `VITE_OPENROUTER_API_KEY` | Sí (para el chat) | API key de OpenRouter |
| `VITE_OPENROUTER_MODEL` | No | Modelo a usar (default: nvidia/nemotron-3-nano-30b-a3b:free) |
| `VITE_DASHBOARD_URL` | No | URL del dashboard (default: http://localhost:5173) |
| `VITE_SITE_URL` | No | URL del sitio para OpenRouter analytics |

## Comandos Disponibles

```bash
npm run dev        # Inicia servidor de desarrollo (Vite)
npm run build      # Build de producción
npm run preview    # Previsualiza el build localmente
npm run lint       # ESLint en todo el proyecto
npm run build:dev  # Build en modo desarrollo
```

## Desarrollo

### Requisitos

- Node.js 18+
- npm 9+

### Instalación

```bash
git clone <repo-url>
cd smartlogix
npm install
npm run dev
```

### Build de Producción

```bash
npm run build
npm run preview
```

---

Proyecto desarrollado por estudiantes de **Duoc UC — Sede Antonio Varas**.
