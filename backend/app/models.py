from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

Base = declarative_base()

# Enum para los días de la semana
class DiaEnum(str, enum.Enum):
    LUNES = "Lunes"
    MARTES = "Martes"
    MIERCOLES = "Miércoles"
    JUEVES = "Jueves"
    VIERNES = "Viernes"
    SABADO = "Sábado"
    DOMINGO = "Domingo"

# Modelo de Rutina
class Rutina(Base):
    __tablename__ = "rutinas"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True, nullable=False, index=True)
    descripcion = Column(Text, nullable=True)
    fecha_creacion = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relación con ejercicios (uno a muchos)
    ejercicios = relationship("Ejercicio", back_populates="rutina", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Rutina(id={self.id}, nombre={self.nombre})>"

# Modelo de Ejercicio
class Ejercicio(Base):
    __tablename__ = "ejercicios"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    dia_semana = Column(SQLEnum(DiaEnum), nullable=False)
    series = Column(Integer, nullable=False)
    repeticiones = Column(Integer, nullable=False)
    peso = Column(Integer, nullable=True)  # En kilogramos, puede ser null
    notas = Column(Text, nullable=True)
    orden = Column(Integer, nullable=False, default=0)
    
    # Llave foránea
    rutina_id = Column(Integer, ForeignKey("rutinas.id", ondelete="CASCADE"), nullable=False)
    
    # Relación con rutina
    rutina = relationship("Rutina", back_populates="ejercicios")
    
    def __repr__(self):
        return f"<Ejercicio(id={self.id}, nombre={self.nombre}, dia={self.dia_semana})>"