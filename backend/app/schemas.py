from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Enum para los días
class DiaEnum(str, Enum):
    LUNES = "Lunes"
    MARTES = "Martes"
    MIERCOLES = "Miércoles"
    JUEVES = "Jueves"
    VIERNES = "Viernes"
    SABADO = "Sábado"
    DOMINGO = "Domingo"

# ============ ESQUEMAS DE EJERCICIO ============

class EjercicioBase(BaseModel):
    """Esquema base con los campos comunes"""
    nombre: str = Field(..., min_length=1, max_length=100)
    dia_semana: DiaEnum
    series: int = Field(..., gt=0, description="Debe ser mayor a 0")
    repeticiones: int = Field(..., gt=0, description="Debe ser mayor a 0")
    peso: Optional[int] = Field(None, ge=0, description="Peso en kg, opcional")
    notas: Optional[str] = None
    orden: int = Field(default=0, ge=0)

class EjercicioCreate(EjercicioBase):
    """Para crear un nuevo ejercicio"""
    pass

class EjercicioUpdate(BaseModel):
    """Para actualizar un ejercicio (todos los campos opcionales)"""
    nombre: Optional[str] = Field(None, min_length=1, max_length=100)
    dia_semana: Optional[DiaEnum] = None
    series: Optional[int] = Field(None, gt=0)
    repeticiones: Optional[int] = Field(None, gt=0)
    peso: Optional[int] = Field(None, ge=0)
    notas: Optional[str] = None
    orden: Optional[int] = Field(None, ge=0)

class Ejercicio(EjercicioBase):
    """Respuesta de lectura de ejercicio"""
    id: int
    rutina_id: int
    
    class Config:
        from_attributes = True  # Permite convertir objetos SQLAlchemy a dict

# ============ ESQUEMAS DE RUTINA ============

class RutinaBase(BaseModel):
    """Esquema base de rutina"""
    nombre: str = Field(..., min_length=1, max_length=100)
    descripcion: Optional[str] = None
    
    @field_validator('nombre')
    @classmethod
    def nombre_no_vacio(cls, v):
        if not v or not v.strip():
            raise ValueError('El nombre no puede estar vacío')
        return v.strip()

class RutinaCreate(RutinaBase):
    """Para crear una nueva rutina"""
    pass

class RutinaUpdate(BaseModel):
    """Para actualizar una rutina"""
    nombre: Optional[str] = Field(None, min_length=1, max_length=100)
    descripcion: Optional[str] = None

class Rutina(RutinaBase):
    """Respuesta de lectura de rutina (sin ejercicios)"""
    id: int
    fecha_creacion: datetime
    
    class Config:
        from_attributes = True

class RutinaDetalle(Rutina):
    """Respuesta completa de rutina con todos sus ejercicios"""
    ejercicios: List[Ejercicio] = []