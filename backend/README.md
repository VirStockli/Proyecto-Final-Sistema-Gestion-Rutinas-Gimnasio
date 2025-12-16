# Backend - Gym Routines API

## Descripción del Proyecto

API RESTful construida con FastAPI para gestionar rutinas de entrenamiento de gimnasio. Permite crear, leer, actualizar y eliminar rutinas y ejercicios con validaciones completas.

## Requisitos Previos

- Python 3.10 o superior
- PostgreSQL instalado y en ejecución
- Docker y Docker Compose (opcional, para ejecutar con contenedores)

## Instalación

### Opción 1: Instalación Local (sin Docker)

#### 1. Crear un entorno virtual

```bash
python -m venv venv
```

#### 2. Activar el entorno virtual

**En Windows:**
```bash
venv\Scripts\activate
```

**En macOS/Linux:**
```bash
source venv/bin/activate
```

#### 3. Instalar las dependencias

```bash
pip install -r requirements.txt
```

## Configuración de la Base de Datos

### String de Conexión a PostgreSQL

El backend necesita una variable de entorno `DATABASE_URL` con el siguiente formato:

```
postgresql://usuario:contraseña@host:puerto/nombre_bd
```

**Ejemplo:**
```
postgresql://postgres:postgres@localhost:5432/gym_routines
```

### Configuración con .env

Crea un archivo `.env` en la raíz del proyecto (o en la carpeta `backend/`):

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gym_routines
```

### Con Docker Compose

Si usas Docker Compose, la configuración se hace automáticamente en el archivo `docker-compose.yml`. Solo necesitas asegurar que PostgreSQL esté en ejecución.

### Crear la Base de Datos

**Si PostgreSQL no está corriendo en Docker:**

```bash
# Conectar a PostgreSQL
psql -U postgres

# En la línea de psql, crear la base de datos
CREATE DATABASE gym_routines;

# Salir
\q
```

**Si usas Docker Compose:**

La base de datos se crea automáticamente gracias a la configuración en `docker-compose.yml`.

### Crear las Tablas

Las tablas se crean automáticamente al iniciar la aplicación (en el evento `@app.on_event("startup")`).

## Ejecución

### Opción 1: Ejecutar Localmente

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

La aplicación estará disponible en `http://localhost:8000`

### Opción 2: Con Docker Compose (desde la carpeta raíz del proyecto)

```bash
docker-compose up
```

## Documentación de la API

Una vez que la aplicación esté en ejecución, accede a:

- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`
- **OpenAPI JSON:** `http://localhost:8000/openapi.json`

En Swagger puedes probar todos los endpoints interactivamente.

## Endpoints Principales

### Rutinas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/rutinas` | Obtener todas las rutinas |
| GET | `/api/rutinas/{id}` | Obtener una rutina específica con sus ejercicios |
| GET | `/api/rutinas/buscar?nombre={texto}` | Buscar rutinas por nombre |
| POST | `/api/rutinas` | Crear una nueva rutina |
| PUT | `/api/rutinas/{id}` | Actualizar una rutina |
| DELETE | `/api/rutinas/{id}` | Eliminar una rutina |

### Ejercicios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/rutinas/{id}/ejercicios` | Agregar ejercicio a una rutina |
| PUT | `/api/ejercicios/{id}` | Actualizar un ejercicio |
| DELETE | `/api/ejercicios/{id}` | Eliminar un ejercicio |

## Ejemplos de Uso

### Crear una Rutina

**Request:**
```bash
curl -X POST "http://localhost:8000/api/rutinas" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Push Day",
    "descripcion": "Día de pecho, espalda y tríceps"
  }'
```

**Response:**
```json
{
  "id": 1,
  "nombre": "Push Day",
  "descripcion": "Día de pecho, espalda y tríceps",
  "fecha_creacion": "2024-01-15T10:30:00"
}
```

### Agregar un Ejercicio

**Request:**
```bash
curl -X POST "http://localhost:8000/api/rutinas/1/ejercicios" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Press de Banca",
    "dia_semana": "Lunes",
    "series": 4,
    "repeticiones": 8,
    "peso": 100,
    "notas": "Cuidado con la forma",
    "orden": 1
  }'
```

## Estructura del Proyecto

```
backend/
├── app/
│   ├── __init__.py
│   ├── models.py          # Modelos SQLAlchemy (Rutina, Ejercicio)
│   ├── schemas.py         # Schemas Pydantic para validación
│   ├── database.py        # Configuración de BD y sesiones
│   └── routes.py          # Endpoints de la API
├── main.py                # Aplicación principal
├── requirements.txt       # Dependencias Python
├── Dockerfile             # Configuración para Docker
└── README.md             # Este archivo
```

## Validaciones

El backend implementa validaciones en:

1. **Schemas Pydantic:** Validación automática de tipos y rangos
2. **Lógica de negocio:** Verificación de nombres únicos, referencias válidas, etc.
3. **Base de datos:** Restricciones a nivel de BD

### Reglas de Validación

- **Nombre de rutina:** Requerido, único, máximo 100 caracteres
- **Series:** Número entero positivo
- **Repeticiones:** Número entero positivo
- **Peso:** Número positivo o null (para ejercicios sin peso)
- **Día de semana:** Debe ser uno de: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo

## Códigos de Estado HTTP

- **200 OK:** Solicitud exitosa
- **201 Created:** Recurso creado exitosamente
- **204 No Content:** Eliminación exitosa
- **400 Bad Request:** Datos inválidos o error de validación
- **404 Not Found:** Recurso no encontrado
- **500 Internal Server Error:** Error en el servidor

## Manejo de Errores

Las respuestas de error tienen el siguiente formato:

```json
{
  "detail": "Mensaje de error descriptivo"
}
```

## Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| DATABASE_URL | URL de conexión a PostgreSQL | postgresql://postgres:postgres@localhost/gym_routines |

## Troubleshooting

### "Connection refused"
- Verifica que PostgreSQL esté corriendo
- Verifica el DATABASE_URL

### "Relation rutinas does not exist"
- Las tablas se crean automáticamente al iniciar
- Si persiste, elimina la BD y crea una nueva

### CORS errors en el frontend
- El backend tiene CORS habilitado para todas las rutas
- En producción, limita los orígenes permitidos

## Dependencias Principales

- **FastAPI:** Framework web
- **SQLAlchemy:** ORM para base de datos
- **psycopg2:** Adaptador PostgreSQL para Python
- **Pydantic:** Validación de datos
- **Uvicorn:** Servidor ASGI