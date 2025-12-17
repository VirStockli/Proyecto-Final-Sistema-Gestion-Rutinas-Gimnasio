# 💪 Gym Routines - Sistema de Gestión de Rutinas de Gimnasio

**Aplicación web completa para crear, gestionar y organizar tus rutinas de entrenamiento de forma fácil e intuitiva.**

---

## 📋 Descripción del Proyecto

Gym Routines es una aplicación web moderna que permite a los usuarios:

- **Crear rutinas** personalizadas de entrenamiento
- **Organizar ejercicios** por día de la semana
- **Gestionar ejercicios** con detalles (series, repeticiones, peso)
- **Buscar rutinas** en tiempo real
- **Cambiar entre modo claro y oscuro** con una interfaz minimalista

La aplicación utiliza una **arquitectura cliente-servidor completa** con tecnologías modernas:
- **Frontend:** React + Vite
- **Backend:** FastAPI + Python
- **Base de Datos:** PostgreSQL
- **Containerización:** Docker

---

## 🚀 Quick Start (Inicio Rápido)

### Requisitos Previos

- **Docker Desktop** instalado y en ejecución
- **Git** (opcional)

### Instalación y Ejecución

```bash
# 1. Clonar o descargar el proyecto
cd Proyecto-Final-Sistema-Gestion-Rutinas-Gimnasio

# 2. Iniciar con Docker Compose
docker-compose up --build

# 3. Esperar a que vea estos mensajes en la terminal:
# gym_backend   | INFO:     Application startup complete.
# gym_frontend  | ➜  Local:   http://localhost:5173/

# 4. Abrir en el navegador
# Frontend: http://localhost:5173
# API Docs: http://localhost:8000/docs
```

**¡Listo!** La aplicación estará cargada con 3 rutinas de ejemplo.

---

## 🏗️ Arquitectura del Proyecto

```
Proyecto-Final-Sistema-Gestion-Rutinas-Gimnasio/
├── backend/                    # API FastAPI
│   ├── app/
│   │   ├── models.py          # Modelos SQLAlchemy
│   │   ├── schemas.py         # Schemas Pydantic
│   │   ├── database.py        # Conexión BD
│   │   ├── routes.py          # Endpoints API
│   │   └── seed_data.py       # Datos de ejemplo
│   ├── main.py                # Aplicación principal
│   ├── requirements.txt       # Dependencias Python
│   ├── Dockerfile
│   └── README.md
├── frontend/                  # Aplicación React + Vite
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/            # Páginas principales
│   │   ├── services/         # Cliente API (Axios)
│   │   ├── styles/           # CSS global
│   │   ├── App.jsx           # Componente raíz
│   │   ├── main.jsx          # Punto de entrada
│   │   └── theme.js          # Sistema de temas
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── README.md
├── docker-compose.yml        # Orquestación de servicios
├── .env                       # Variables de entorno
└── README.md                  # Este archivo
```

---

## 🎨 Características Principales

### Frontend
- **Diseño Minimalista:** Interfaz limpia y moderna
- **Tema Dinámico:** Modo claro/oscuro con colores violeta, naranja y dorado
- **Responsive:** Funciona perfectamente en desktop, tablet y móvil
- **Búsqueda en Tiempo Real:** Busca rutinas mientras escribes
- **Animaciones Suaves:** Transiciones elegantes en toda la interfaz

### Backend
- **API RESTful Completa:** Todos los endpoints necesarios
- **Validaciones Robustas:** Datos validados en cliente y servidor
- **CORS Habilitado:** Permite comunicación frontend-backend
- **Documentación Automática:** Swagger UI en `/docs`
- **Datos de Ejemplo:** 3 rutinas precargadas

### Base de Datos
- **PostgreSQL:** Base de datos relacional robusta
- **Modelos Relacionales:** Rutinas con ejercicios asociados
- **Integridad Referencial:** Eliminación en cascada
- **Persistencia en Volúmenes:** Datos persisten entre reinicios

---

## 📖 Guía de Uso

### Crear una Rutina

1. Haz clic en **"➕ Nueva Rutina"** en el sidebar
2. Completa el formulario:
   - **Nombre:** (ej: "Push Day")
   - **Descripción:** (opcional, ej: "Pecho, espalda y tríceps")
3. Haz clic en **"💾 Guardar Rutina"**

### Agregar Ejercicios

1. En la tarjeta de la rutina, haz clic en **"✏️ Editar"**
2. Haz clic en **"➕ Agregar Ejercicio"**
3. Completa los datos:
   - **Nombre:** (ej: "Press de Banca")
   - **Día de la Semana:** Selecciona el día
   - **Series:** (ej: 4)
   - **Repeticiones:** (ej: 8)
   - **Peso:** En kg (opcional)
   - **Notas:** Observaciones (opcional)
4. Haz clic en **"💾 Agregar"**

### Ver Detalle de Rutina

1. En la lista, haz clic en **"👁️ Ver Detalle"**
2. Verás todos los ejercicios **organizados por día de la semana**
3. Puedes **eliminar ejercicios** individuales desde aquí

### Buscar Rutinas

1. Usa la **barra de búsqueda** en la parte superior
2. Los resultados se filtran **en tiempo real**
3. La búsqueda es **sin distinción de mayúsculas**

### Cambiar de Tema

1. Haz clic en el botón **🌙/☀️** en la esquina superior derecha
2. La preferencia se **guarda automáticamente** en tu navegador

---

## 🔌 API Endpoints

### Rutinas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/rutinas` | Obtener todas las rutinas |
| GET | `/api/rutinas/{id}` | Obtener una rutina específica |
| GET | `/api/rutinas/buscar?nombre={texto}` | Buscar rutinas por nombre |
| POST | `/api/rutinas` | Crear nueva rutina |
| PUT | `/api/rutinas/{id}` | Actualizar rutina |
| DELETE | `/api/rutinas/{id}` | Eliminar rutina |

### Ejercicios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/rutinas/{id}/ejercicios` | Agregar ejercicio |
| PUT | `/api/ejercicios/{id}` | Actualizar ejercicio |
| DELETE | `/api/ejercicios/{id}` | Eliminar ejercicio |

**Prueba los endpoints en:** http://localhost:8000/docs

---

## 🛠️ Configuración

### Variables de Entorno (`.env`)

```env
# PostgreSQL
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=gym_routines

# Frontend
VITE_API_URL=http://localhost:8000/api
```

### Puertos Utilizados

- **Frontend:** 5173
- **Backend:** 8000
- **PostgreSQL:** 5432

---

## 📦 Tecnologías Utilizadas

### Frontend
- **React 18:** Framework de UI
- **Vite:** Build tool ultrarrápido
- **Axios:** Cliente HTTP
- **CSS3:** Estilos con variables CSS

### Backend
- **Python 3.11:** Lenguaje
- **FastAPI:** Framework web
- **SQLAlchemy:** ORM
- **Pydantic:** Validación de datos
- **Uvicorn:** Servidor ASGI

### Infraestructura
- **Docker:** Containerización
- **Docker Compose:** Orquestación
- **PostgreSQL 15:** Base de datos

---

## 🎓 Ciclo de Vida de una Request

1. **Usuario hace clic** en crear rutina
2. **Frontend valida** los datos en el formulario
3. **Frontend envía POST** a `http://localhost:8000/api/rutinas`
4. **Backend recibe** la solicitud
5. **Backend valida** con Pydantic
6. **Backend guarda** en PostgreSQL
7. **Backend retorna** la rutina creada
8. **Frontend actualiza** la lista de rutinas
9. **Usuario ve** la nueva rutina en la pantalla

---

## 🐛 Troubleshooting

### "Connection refused" o "Cannot connect to backend"

```bash
# Verifica que Docker está corriendo
docker ps

# Reinicia Docker Compose
docker-compose down
docker-compose up
```

### "Port already in use"

```bash
# Si el puerto 5173, 8000 o 5432 está en uso
# Cambia los puertos en docker-compose.yml
```

### Base de datos vacía después de reiniciar

Los datos de ejemplo se cargan automáticamente. Si no aparecen:

```bash
docker-compose down
docker system prune -a --volumes
docker-compose up --build
```

---

## 📊 Datos de Ejemplo

El sistema viene precargado con 3 rutinas:

1. **Push Day** (8 ejercicios)
   - Lunes, Miércoles, Viernes
   - Pecho, espalda, tríceps

2. **Leg Day** (7 ejercicios)
   - Martes, Jueves
   - Piernas, cuádriceps, isquiotibiales

3. **Full Body** (12 ejercicios)
   - Lunes, Miércoles, Viernes
   - Cuerpo completo

---

## 🔐 Características de Seguridad

- ✅ Validación de datos en cliente y servidor
- ✅ Nombres de rutina únicos (evita duplicados)
- ✅ CORS configurado para comunicación segura
- ✅ Integridad referencial en BD
- ✅ Elimación en cascada (coherencia de datos)

---

## 📚 Documentación Adicional

- **Backend README:** `backend/README.md`
- **Frontend README:** `frontend/README.md`
- **API Swagger:** http://localhost:8000/docs

---

## 💡 Mejoras Futuras (Opcionales)

- Autenticación y login de usuarios
- Historial de entrenamientos
- Estadísticas y gráficos
- Exportar rutinas en PDF/CSV
- Compartir rutinas entre usuarios
- Drag & drop para reordenar ejercicios
- Calendario de entrenamientos
- Notificaciones de recordatorios

---

## 👨‍💻 Desarrollo

### Estructura del Código

**Frontend:** Componentes funcionales con Hooks de React
**Backend:** Arquitectura en capas (models, schemas, routes, database)
**BD:** Modelos relacionales con SQLAlchemy

### Hot Reload

- **Frontend:** Cambios en código se reflejan automáticamente
- **Backend:** Cambios se recargan con `--reload` de Uvicorn

---

## 📄 Licencia

Proyecto educativo - Programación IV - UTN

---

## 🎯 Autores

Desarrollado como **Trabajo Final** del curso de Programación IV

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo cambiar los datos de ejemplo?**
R: Sí, edita `backend/app/seed_data.py`

**P: ¿Cómo agrego más rutinas?**
R: Usa la interfaz del frontend o agrega en `seed_data.py`

**P: ¿Se guardan los datos si cierro Docker?**
R: Sí, están en un volumen de Docker persistent

**P: ¿Puedo acceder desde otra computadora?**
R: Sí, en lugar de `localhost`, usa la IP de tu máquina

---

## 🚀 ¡Listo para entrenar!

```bash
docker-compose up
# Abre http://localhost:5173
# ¡A ponerse en forma! 💪
```