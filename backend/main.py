from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db
from app.routes import router
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Crear la aplicación FastAPI
app = FastAPI(
    title="Gym Routines API",
    description="API para gestionar rutinas de gimnasio",
    version="1.0.0"
)

# Configurar CORS (Cross-Origin Resource Sharing)
# Permite que el frontend en otro puerto acceda a esta API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas
app.include_router(router, prefix="/api")

# Crear las tablas al iniciar la aplicación
@app.on_event("startup")
async def startup():
    logger.info("Inicializando base de datos...")
    init_db()
    logger.info("Base de datos inicializada correctamente")
    
    # Cargar datos de ejemplo
    from app.seed_data import seed_database
    logger.info("Cargando datos de ejemplo...")
    seed_database()
    
# Endpoint de prueba (health check)
@app.get("/", tags=["Health"])
async def root():
    return {
        "message": "¡Bienvenido a Gym Routines API!",
        "docs": "/docs",
        "openapi": "/openapi.json"
    }

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)