from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import Rutina, Ejercicio
from app.schemas import (
    RutinaCreate, RutinaUpdate, Rutina as RutinaSchema,
    RutinaDetalle, EjercicioCreate, EjercicioUpdate, Ejercicio as EjercicioSchema
)

router = APIRouter(tags=["api"])

# ============ ENDPOINTS DE RUTINAS ============

@router.get("/rutinas", response_model=list[RutinaSchema])
def obtener_rutinas(db: Session = Depends(get_db)):
    """Obtener todas las rutinas"""
    rutinas = db.query(Rutina).all()
    return rutinas

@router.get("/rutinas/buscar", response_model=list[RutinaSchema])
def buscar_rutinas(nombre: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    """Buscar rutinas por nombre (búsqueda parcial, no case-sensitive)"""
    rutinas = db.query(Rutina).filter(
        func.lower(Rutina.nombre).contains(nombre.lower())
    ).all()
    
    if not rutinas:
        return []
    
    return rutinas

@router.get("/rutinas/{rutina_id}", response_model=RutinaDetalle)
def obtener_rutina(rutina_id: int, db: Session = Depends(get_db)):
    """Obtener una rutina con todos sus ejercicios"""
    rutina = db.query(Rutina).filter(Rutina.id == rutina_id).first()
    
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    
    return rutina

@router.post("/rutinas", response_model=RutinaSchema, status_code=201)
def crear_rutina(rutina: RutinaCreate, db: Session = Depends(get_db)):
    """Crear una nueva rutina"""
    
    # Verificar que el nombre sea único
    rutina_existente = db.query(Rutina).filter(
        func.lower(Rutina.nombre) == rutina.nombre.lower()
    ).first()
    
    if rutina_existente:
        raise HTTPException(
            status_code=400,
            detail="Ya existe una rutina con ese nombre"
        )
    
    # Crear la nueva rutina
    nueva_rutina = Rutina(
        nombre=rutina.nombre.strip(),
        descripcion=rutina.descripcion
    )
    
    db.add(nueva_rutina)
    db.commit()
    db.refresh(nueva_rutina)
    
    return nueva_rutina

@router.put("/rutinas/{rutina_id}", response_model=RutinaSchema)
def actualizar_rutina(rutina_id: int, rutina: RutinaUpdate, db: Session = Depends(get_db)):
    """Actualizar una rutina existente"""
    
    db_rutina = db.query(Rutina).filter(Rutina.id == rutina_id).first()
    
    if not db_rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    
    # Validar que el nuevo nombre sea único (si se cambió)
    if rutina.nombre and rutina.nombre.lower() != db_rutina.nombre.lower():
        rutina_existente = db.query(Rutina).filter(
            func.lower(Rutina.nombre) == rutina.nombre.lower()
        ).first()
        
        if rutina_existente:
            raise HTTPException(
                status_code=400,
                detail="Ya existe una rutina con ese nombre"
            )
    
    # Actualizar campos
    if rutina.nombre:
        db_rutina.nombre = rutina.nombre.strip()
    if rutina.descripcion is not None:
        db_rutina.descripcion = rutina.descripcion
    
    db.commit()
    db.refresh(db_rutina)
    
    return db_rutina

@router.delete("/rutinas/{rutina_id}", status_code=204)
def eliminar_rutina(rutina_id: int, db: Session = Depends(get_db)):
    """Eliminar una rutina (se eliminan todos sus ejercicios en cascada)"""
    
    db_rutina = db.query(Rutina).filter(Rutina.id == rutina_id).first()
    
    if not db_rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    
    db.delete(db_rutina)
    db.commit()
    
    return None

# ============ ENDPOINTS DE EJERCICIOS ============

@router.post("/rutinas/{rutina_id}/ejercicios", response_model=EjercicioSchema, status_code=201)
def crear_ejercicio(rutina_id: int, ejercicio: EjercicioCreate, db: Session = Depends(get_db)):
    """Agregar un ejercicio a una rutina"""
    
    # Verificar que la rutina existe
    rutina = db.query(Rutina).filter(Rutina.id == rutina_id).first()
    
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    
    # Crear el ejercicio
    nuevo_ejercicio = Ejercicio(
        nombre=ejercicio.nombre,
        dia_semana=ejercicio.dia_semana,
        series=ejercicio.series,
        repeticiones=ejercicio.repeticiones,
        peso=ejercicio.peso,
        notas=ejercicio.notas,
        orden=ejercicio.orden,
        rutina_id=rutina_id
    )
    
    db.add(nuevo_ejercicio)
    db.commit()
    db.refresh(nuevo_ejercicio)
    
    return nuevo_ejercicio

@router.put("/ejercicios/{ejercicio_id}", response_model=EjercicioSchema)
def actualizar_ejercicio(ejercicio_id: int, ejercicio: EjercicioUpdate, db: Session = Depends(get_db)):
    """Actualizar un ejercicio existente"""
    
    db_ejercicio = db.query(Ejercicio).filter(Ejercicio.id == ejercicio_id).first()
    
    if not db_ejercicio:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    
    # Actualizar solo los campos que se proporcionan
    if ejercicio.nombre is not None:
        db_ejercicio.nombre = ejercicio.nombre
    if ejercicio.dia_semana is not None:
        db_ejercicio.dia_semana = ejercicio.dia_semana
    if ejercicio.series is not None:
        db_ejercicio.series = ejercicio.series
    if ejercicio.repeticiones is not None:
        db_ejercicio.repeticiones = ejercicio.repeticiones
    if ejercicio.peso is not None:
        db_ejercicio.peso = ejercicio.peso
    if ejercicio.notas is not None:
        db_ejercicio.notas = ejercicio.notas
    if ejercicio.orden is not None:
        db_ejercicio.orden = ejercicio.orden
    
    db.commit()
    db.refresh(db_ejercicio)
    
    return db_ejercicio

@router.delete("/ejercicios/{ejercicio_id}", status_code=204)
def eliminar_ejercicio(ejercicio_id: int, db: Session = Depends(get_db)):
    """Eliminar un ejercicio"""
    
    db_ejercicio = db.query(Ejercicio).filter(Ejercicio.id == ejercicio_id).first()
    
    if not db_ejercicio:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    
    db.delete(db_ejercicio)
    db.commit()
    
    return None