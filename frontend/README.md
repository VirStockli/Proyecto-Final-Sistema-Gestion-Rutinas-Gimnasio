# Frontend - Gym Routines App

## Descripción del Proyecto

Aplicación web moderna y responsiva construida con React y Vite para la gestión de rutinas de entrenamiento. Incluye interfaz minimalista con modo oscuro, tema con colores violeta, naranja eléctrico y dorado.

## Requisitos Previos

- Node.js 16 o superior
- npm o yarn
- Acceso a la API Backend en `http://localhost:8000`

## Instalación

### 1. Instalar dependencias

```bash
npm install
```

## Configuración

### Variable de Entorno

El frontend se conecta con el backend a través de la variable `VITE_API_URL`.

**En desarrollo (automático):**
- La URL se configura en `docker-compose.yml` o en `.env.local`
- Valor por defecto: `http://localhost:8000/api`

**Crear archivo `.env.local` (opcional):**

```env
VITE_API_URL=http://localhost:8000/api
```

## Ejecución

### Opción 1: Modo Desarrollo Local

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Opción 2: Con Docker Compose (desde carpeta raíz)

```bash
docker-compose up
```

La aplicación estará disponible en `http://localhost:5173`

## Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## Características Principales

### 🎨 Diseño y Temas
- **Modo Oscuro/Claro**: Toggle en el header para cambiar entre temas
- **Colores Dinámicos**: Violeta (#a855f7), Naranja (#f97316) y Dorado (#facc15)
- **Responsive Design**: Funciona perfectamente en desktop, tablet y móvil
- **Animaciones Suaves**: Transiciones elegantes en toda la interfaz

### 📋 Funcionalidades

#### Listado de Rutinas
- Ver todas las rutinas creadas
- Búsqueda en tiempo real por nombre
- Ver cantidad de ejercicios por rutina
- Tarjetas interactivas con información resumida

#### Creación de Rutinas
- Formulario intuitivo para crear nuevas rutinas
- Nombre y descripción opcional
- Agregar múltiples ejercicios a la rutina

#### Edición de Rutinas
- Modificar nombre y descripción
- Agregar nuevos ejercicios
- Editar ejercicios existentes
- Cambiar orden de ejercicios

#### Visualización de Detalle
- Ver rutina completa con todos los ejercicios
- Ejercicios organizados por día de la semana
- Información detallada de cada ejercicio:
  - Nombre
  - Series y repeticiones
  - Peso (si aplica)
  - Notas adicionales

#### Gestión de Ejercicios
- Crear ejercicio especificando:
  - Nombre
  - Día de la semana
  - Series y repeticiones
  - Peso (opcional)
  - Notas
  - Orden en el día
- Editar ejercicios existentes
- Eliminar ejercicios con confirmación

### 🔍 Búsqueda
- Búsqueda en tiempo real mientras escribes
- Sin distinción entre mayúsculas y minúsculas
- Resultado inmediato de coincidencias

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Encabezado con toggle de tema
│   │   ├── Header.css
│   │   ├── Sidebar.jsx             # Navegación lateral
│   │   ├── Sidebar.css
│   │   ├── RutinaCard.jsx          # Tarjeta individual de rutina
│   │   ├── RutinaCard.css
│   │   ├── SearchBar.jsx           # Barra de búsqueda
│   │   ├── SearchBar.css
│   │   ├── EjercicioItem.jsx       # Visualización de ejercicio
│   │   ├── EjercicioItem.css
│   │   ├── EjercicioForm.jsx       # Formulario de ejercicio
│   │   └── EjercicioForm.css
│   ├── pages/
│   │   ├── RutinasList.jsx         # Página principal
│   │   ├── RutinaDetail.jsx        # Detalle de rutina
│   │   ├── RutinaForm.jsx          # Crear/editar rutina
│   │   └── Pages.css               # Estilos de páginas
│   ├── services/
│   │   └── api.js                  # Cliente Axios y llamadas API
│   ├── styles/
│   │   └── global.css              # Estilos globales
│   ├── theme.js                    # Sistema de temas y colores
│   ├── App.jsx                     # Componente principal
│   └── main.jsx                    # Punto de entrada
├── index.html                      # HTML principal
├── package.json
├── vite.config.js
├── Dockerfile
└── README.md                       # Este archivo
```

## Tecnologías Utilizadas

- **React 18**: Framework de UI
- **Vite**: Build tool y dev server
- **Axios**: Cliente HTTP
- **CSS3**: Estilos con variables CSS para temas
- **JavaScript ES6+**: Sintaxis moderna

## Manejo del Estado

El estado se gestiona con `useState` de React en el componente principal `App.jsx`:

- `isDark`: Tema actual (claro/oscuro)
- `currentPage`: Página visible
- `selectedRutinaId`: Rutina seleccionada para detalle
- `editingRutinaId`: Rutina en edición

## Conexión con Backend

El archivo `services/api.js` encapsula todas las llamadas HTTP:

```javascript
// Ejemplo de uso
import { rutinasAPI } from '../services/api';

const rutinas = await rutinasAPI.obtenerTodas();
```

## Responsive Design

La aplicación es completamente responsiva:

- **Desktop** (>1024px): Diseño completo con sidebar
- **Tablet** (768px-1024px): Sidebar colapsado a íconos
- **Mobile** (<768px): Diseño optimizado para pantalla pequeña

## Modo Oscuro

Implementado con:
- Variables CSS dinámicas
- Atributo `data-theme` en `<html>`
- Persistencia en `localStorage`
- Transiciones suaves entre temas

## Troubleshooting

### "Cannot GET /api/rutinas"
- Verifica que el backend esté corriendo en `http://localhost:8000`
- Revisa la variable `VITE_API_URL` en `.env.local`

### "Module not found"
- Ejecuta `npm install` para instalar dependencias

### Estilos no cargados
- Limpia caché del navegador (Ctrl+Shift+Del)
- Reconstruye: `npm run build`

## Performance

- Componentes optimizados con React.memo
- Lazy loading de datos
- Estilos optimizados con CSS variables
- Build minificado para producción

## Accessibility

- Semántica HTML correcta
- Contraste de colores adecuado
- Navegación por teclado
- Atributos ARIA donde es necesario