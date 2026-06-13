# WORKPLAN — Refactorización y Limpieza de Código

## Metodología

Cada fase sigue este proceso:

1. **5 Porqués** → identificar causa raíz del problema
2. **Principio de Pareto** → atacar el 20% que causa el 80% de los problemas
3. **Solución Atómica** → dividir en commits de <50 caracteres en español
4. **Checklist Pre-Commit** → validación obligatoria:
   - ¿El cambio es DRY+SOLID+LEAN+KISS? Si no, mejorarlo
   - `npx tsc --noEmit` → 0 errores
   - `npm run lint` → 0 errores (warnings preexistentes tolerados)
   - Revisar que no se expongan secrets en el diff
5. **Post-Commit** → verificar que el log se vea limpio

---

## Fase 0: Seguridad — Fuga de API Key

### 5 Porqués

1. La API key está en `.env` y se subió al repo → **fuga**
2. Porque `.env` no estaba en `.gitignore` cuando se creó el primer commit
3. Porque el template original no incluía `.env` en `.gitignore`
4. Porque se asumió que `create-vite` lo agrega automáticamente (no es así)
5. Porque no hubo revisión de seguridad antes del primer push

### Causa Raíz

`.env` sin `.gitignore` desde el commit inicial. La key `sk-or-v1-b69f...` está en el historial de git.

### Solución

1. Revocar la key actual en https://openrouter.ai/keys
2. Generar una nueva key
3. Actualizar `.env` local con la nueva key
4. **No se puede borrar del historial sin force push**, pero se minimiza el daño revocándola

### Tareas

| # | Tarea | Archivos | Commit |
|---|-------|----------|--------|
| 0.1 | Revocar API key en OpenRouter | — (manual en openrouter.ai) | — |
| 0.2 | Regenerar key y actualizar .env local | `.env` | — |

---

## Fase 1: Código Muerto — Dependencias y Componentes shadcn No Utilizados

### 5 Porqués

1. El bundle pesa 445 kB JS + 77 kB CSS → demasiado para una landing page
2. Porque hay 33 componentes shadcn/ui en `src/components/ui/` pero solo ~10 se usan
3. Porque shadcn/ui se instaló completo con `npx shadcn@latest init` y nunca se limpió
4. Porque se priorizó tener componentes disponibles "por si acaso"
5. Porque no se estableció una política de "solo lo que se importa"

### Causa Raíz

Instalación masiva de shadcn sin verificar qué se usa realmente.

### Pareto

Eliminar ~23 componentes muertos + 9 dependencias no utilizadas = 80% de reducción de peso muerto.

### Tareas

| # | Tarea | Archivos | Commit |
|---|-------|----------|--------|
| 1.1 | Identificar componentes shadcn NO importados en src/ | — (grep) | — |
| 1.2 | Eliminar componentes shadcn no utilizados | `src/components/ui/*` | `refactor: purga shadcn no usado` |
| 1.3 | Identificar dependencias npm NO importadas en src/ | — (depcheck) | — |
| 1.4 | Eliminar dependencias npm no utilizadas | `package.json` | `refactor: purga dependencias muertas` |
| 1.5 | Ejecutar `npm install` para limpiar node_modules | `package-lock.json` | (incluido en 1.4) |

### Checklist Pre-Commit

- [ ] `git diff --stat` muestra solo los archivos esperados
- [ ] `npx tsc --noEmit` → 0 errores
- [ ] `npm run lint` → 0 errores
- [ ] No hay imports rotos (verificar build)
- [ ] DRY+KISS: no se elimina nada que se importe en otro archivo
- [ ] LEAN: cada archivo eliminado es código muerto confirmado

---

## Fase 2: Código Muerto — Tipos y Archivos Huérfanos

### 5 Porqués

1. `MensajeHistorial` duplica a `ChatMessage` → confusión y mantenimiento duplicado
2. Porque se creó antes de definir `ChatMessage` en `types/ai.ts`
3. Porque no se unificaron los tipos de chat cuando se refactorizó
4. Porque la refactorización fue incremental y nadie revisó tipos viejos
5. Porque no hay una política de "un type, un lugar"

### Causa Raíz

Refactorización incompleta que dejó tipos huérfanos.

### Pareto

Eliminar 3 tipos duplicados/muertos + 1 archivo de hook muerto = 100% del problema.

### Tareas

| # | Tarea | Archivos | Commit |
|---|-------|----------|--------|
| 2.1 | Eliminar `MensajeHistorial` (duplicado de `ChatMessage`) | `src/types/index.ts` | `refactor: elimina tipo duplicado MensajeHistorial` |
| 2.2 | Eliminar `ToastActionElement` (no usado) | `src/types/index.ts` | (incluido en 2.1) |
| 2.3 | Eliminar `NavItem` (no usado, la definición está en Header) | `src/types/index.ts` | (incluido en 2.1) |
| 2.4 | Eliminar `src/components/ui/toaster.tsx` (duplicado de sonner) | `src/components/ui/toaster.tsx` | `refactor: elimina toaster duplicado` |
| 2.5 | Verificar que no haya otros imports rotos | — | — |

### Checklist Pre-Commit

- [ ] `npx tsc --noEmit` → 0 errores
- [ ] `npm run lint` → 0 errores
- [ ] `grep -r "MensajeHistorial\|ToastActionElement\|NavItem" src/` → 0 resultados
- [ ] DRY: cada tipo vive en un solo lugar
- [ ] SOLID-I: interfaces pequeñas y específicas

---

## Fase 3: Error Handling — ErrorBoundary e Imágenes

### 5 Porqués

1. Si el chatbot lanza un error no capturado, la app se cae → pantalla blanca
2. Porque no hay un `ErrorBoundary` envolviendo la app
3. Porque React 18 no incluye ErrorBoundary por defecto (hay que crearlo)
4. Porque se asumió que los errores del chat se capturan en `try/catch` (pero errores de render no)
5. Porque no hay cultura de "defensa en profundidad" para errores de UI

### Causa Raíz

Falta de ErrorBoundary en la raíz de la aplicación y falta de manejo de errores en recursos externos (imágenes).

### Tareas

| # | Tarea | Archivos | Commit |
|---|-------|----------|--------|
| 3.1 | Crear componente `ErrorBoundary` genérico | `src/components/shared/ErrorBoundary.tsx` | `feat: agrega ErrorBoundary` |
| 3.2 | Envolver App con ErrorBoundary | `src/App.tsx` | (incluido en 3.1) |
| 3.3 | Agregar `onError` handler a imágenes externas | `HeroSection`, `TestimonialsSection`, `AboutSection`, `CtaSection` | `feat: agrega fallback a imagenes externas` |

### Checklist Pre-Commit

- [ ] `npx tsc --noEmit` → 0 errores
- [ ] `npm run lint` → 0 errores
- [ ] ErrorBoundary muestra UI alternativa (no pantalla blanca)
- [ ] Imágenes con error muestran placeholder (no broken image icon)
- [ ] DRY: el fallback de imagen es un componente o utilidad reutilizable
- [ ] KISS: ErrorBoundary es simple, sin dependencias externas

---

## Fase 4: Calidad — Hook de Scroll y Testimonios

### 5 Porqués

1. El carrusel de testimonios tiene un `useEffect` con closure stale
2. Porque `next()` se define fuera del `useEffect` pero se referencia dentro
3. Porque `setInterval` se crea una vez (dependencias vacías) pero `next()` cambia en cada render
4. Porque no se usó `useCallback` en `next()`
5. Porque no se siguió el patrón correcto de intervalos en React

### Causa Raíz

Patrón incorrecto de `setInterval` en React con dependencias stale.

### Tareas

| # | Tarea | Archivos | Commit |
|---|-------|----------|--------|
| 4.1 | Extraer hook `useScrollPosition` reusable | `src/hooks/use-scroll-position.ts` | `feat: extrae hook useScrollPosition` |
| 4.2 | Refactor Header para usar `useScrollPosition` | `src/components/layout/Header.tsx` | (incluido en 4.1) |
| 4.3 | Fix `setInterval` en TestimonialsSection con `useCallback` + ref | `src/components/TestimonialsSection.tsx` | `fix: corrige closure stale en carrusel` |
| 4.4 | Agregar `aria-label` a botones del carrusel | `src/components/TestimonialsSection.tsx` | (incluido en 4.3) |

### Checklist Pre-Commit

- [ ] `npx tsc --noEmit` → 0 errores
- [ ] `npm run lint` → 0 errores
- [ ] DRY: `useScrollPosition` reemplaza useEffect duplicado en Header
- [ ] KISS: el hook es ~10 líneas, sin dependencias
- [ ] SOLID-O: el hook se puede extender sin modificar Header
- [ ] El intervalo ya no tiene closure stale

---

## Fase 5: Rendimiento — Blur y Bundle

### 5 Porqués

1. Las burbujas `blur-[120px]` + `rounded-full` con tamaños de 500px causan jank en móviles
2. Porque CSS blur forces compositing en GPU, y tamaños grandes saturan el memory bandwidth
3. Porque framer-motion re-renderiza en cada frame de animación
4. Porque no se probó en dispositivos de gama baja
5. Porque el diseño priorizó el impacto visual sobre el rendimiento

### Causa Raíz

Uso excesivo de `blur` + `framer-motion` sin considerar rendering cost en móviles.

### Tareas

| # | Tarea | Archivos | Commit |
|---|-------|----------|--------|
| 5.1 | Agregar CSS `will-change: transform` a burbujas decorativas | `src/index.css` | `perf: optimiza burbujas decorativas` |
| 5.2 | Envolver blur rings con `media (prefers-reduced-motion)` | `HeroSection`, `TestimonialsSection` | (incluido en 5.1) |

### Checklist Pre-Commit

- [ ] `npx tsc --noEmit` → 0 errores
- [ ] `npm run lint` → 0 errores
- [ ] LEAN: no se agrega código innecesario, solo `will-change` y media queries
- [ ] KISS: cambios mínimos, máximo impacto

---

## Fase 6: SEO y Accesibilidad

### 5 Porqués

1. No hay meta tags, title ni Open Graph → el sitio es invisible para redes sociales
2. Porque se asumió que el `index.html` base de Vite es suficiente
3. Porque Vite solo genera un template mínimo
4. Porque nadie configuró `vite-plugin-html` o similar
5. Porque el SEO no fue un requisito en las fases iniciales

### Causa Raíz

Falta de configuración de meta tags en el entry point HTML.

### Tareas

| # | Tarea | Archivos | Commit |
|---|-------|----------|--------|
| 6.1 | Agregar meta tags (description, og:title, og:description, og:image, twitter:card) | `index.html` | `feat: agrega meta tags SEO y Open Graph` |
| 6.2 | Agregar `<title>` descriptivo | `index.html` | (incluido en 6.1) |
| 6.3 | Verificar `lang="es"` en `<html>` | `index.html` | (incluido en 6.1) |

### Checklist Pre-Commit

- [ ] `npx tsc --noEmit` → 0 errores
- [ ] `npm run lint` → 0 errores
- [ ] KISS: cambios solo en `index.html`, sin dependencias nuevas
- [ ] LEAN: solo las tags esenciales, sin generadores dinámicos

---

## Fase 7: Validación y Cierre

### Tareas

| # | Tarea | Archivos | Commit |
|---|-------|----------|--------|
| 7.1 | `npm run build` final — verificar bundle size | — | — |
| 7.2 | `npm audit` — documentar vulnerabilidades restantes | — | — |
| 7.3 | Merge a develop y push | — | — |

### Checklist Final

- [ ] `npx tsc --noEmit` → 0 errores
- [ ] `npm run lint` → 0 errores
- [ ] `npm run build` → exit 0
- [ ] `git log --oneline` muestra commits limpios y atómicos
- [ ] No hay secrets en el diff de ningún commit
- [ ] Cada commit sigue el principio de "un cambio lógico por commit"

---

## Progreso

| Fase | Estado | Commits |
|------|--------|---------|
| 0 — Seguridad API Key | Manual (revocar en openrouter.ai) | `—` |
| 1 — Purga shadcn + dependencias | ✅ Completa | `refactor: purga shadcn y dependencias muertas` |
| 2 — Tipos y archivos huérfanos | ✅ Completa | `refactor: elimina tipos duplicados y muertos` |
| 3 — ErrorBoundary + imágenes | ✅ Completa | `feat: ErrorBoundary y fallback de imagenes rotas` |
| 4 — Scroll hook + testimonios | ✅ Completa | `refactor: hook useScrollPosition + fix closure stale + a11y` |
| 5 — Rendimiento blur | ✅ Completa | `perf: will-change en burbujas decorativas + prefers-reduced-motion` |
| 6 — SEO y accesibilidad | ✅ Completa (pre-existente) | `—` |
| 7 — Validación y cierre | ✅ Completa | Build: 0 errors, Audit: 15 vulns (devDeps only) |
