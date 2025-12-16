from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base
import os

# Obtener la URL de conexión desde la variable de entorno
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost/gym_routines")

# Crear el motor (engine) que conecta con la base de datos
engine = create_engine(
    DATABASE_URL,
    echo=False,  # Cambiar a True para ver las queries SQL en consola
    pool_pre_ping=True  # Verifica que la conexión sea válida antes de usarla
)

# SessionLocal es la clase que usaremos para crear sesiones con la BD
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Función para crear las tablas
def init_db():
    """Crea todas las tablas en la base de datos"""
    Base.metadata.create_all(bind=engine)

# Función generadora para obtener una sesión de base de datos
def get_db():
    """
    Dependency injection para FastAPI.
    Proporciona una sesión de BD a cada endpoint que la solicite.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()