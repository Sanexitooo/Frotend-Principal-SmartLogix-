/*
 * ============================================
 * App — Raíz de la aplicación
 * ============================================
 *
 * Orden de los providers (de afuera hacia adentro):
 *   1. QueryClientProvider  → React Query (cache de datos, retry, refetch)
 *   2. ThemeProvider         → next-themes (modo oscuro/claro vía clase .dark)
 *   3. TooltipProvider       → shadcn/ui (tooltips globales)
 *   4. Toaster               → shadcn/ui (notificaciones toast)
 *   5. Index                 → página principal
 *   6. Chatbot               → widget flotante de chat
 *
 * ThemeProvider:
 *   - attribute="class" → agrega/remueve la clase "dark" en <html>
 *   - defaultTheme="light" → carga en modo claro por defecto
 *   - enableSystem → respeta prefers-color-scheme del SO si no hay preferencia guardada
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import Index from "./pages/Index";
import Chatbot from "@/components/ui/chatbot";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider delayDuration={0}>
          <Toaster position="top-right" closeButton />
          <Index />
          <Chatbot />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;