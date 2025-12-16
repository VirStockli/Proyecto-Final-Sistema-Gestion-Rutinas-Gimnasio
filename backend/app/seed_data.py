"""
Script para cargar datos de ejemplo en la base de datos
"""
from app.database import SessionLocal
from app.models import Rutina, Ejercicio, DiaEnum

def seed_database():
    """Carga rutinas y ejercicios de ejemplo"""
    db = SessionLocal()
    
    # Verificar si ya hay datos
    rutinas_existentes = db.query(Rutina).count()
    if rutinas_existentes > 0:
        print("✓ Base de datos ya contiene datos. Saltando seed.")
        db.close()
        return
    
    # ============ RUTINA 1: PUSH DAY ============
    push_day = Rutina(
        nombre="Push Day",
        descripcion="Día de empuje: pecho, espalda y tríceps. Enfoque en movimientos compuestos."
    )
    db.add(push_day)
    db.flush()
    
    ejercicios_push = [
        Ejercicio(
            nombre="Press de Banca",
            dia_semana=DiaEnum.LUNES,
            series=4,
            repeticiones=8,
            peso=100,
            notas="Movimiento principal, controlar el descenso",
            orden=1,
            rutina_id=push_day.id
        ),
        Ejercicio(
            nombre="Aperturas con Mancuernas",
            dia_semana=DiaEnum.LUNES,
            series=3,
            repeticiones=10,
            peso=30,
            notas="Aislamiento de pecho",
            orden=2,
            rutina_id=push_day.id
        ),
        Ejercicio(
            nombre="Fondos en Paralelas",
            dia_semana=DiaEnum.LUNES,
            series=3,
            repeticiones=8,
            peso=25,
            notas="Añadir peso si es necesario",
            orden=3,
            rutina_id=push_day.id
        ),
        Ejercicio(
            nombre="Press Militar",
            dia_semana=DiaEnum.LUNES,
            series=3,
            repeticiones=8,
            peso=50,
            notas="Hombros y pecho superior",
            orden=4,
            rutina_id=push_day.id
        ),
        Ejercicio(
            nombre="Remo Barbell",
            dia_semana=DiaEnum.MIERCOLES,
            series=4,
            repeticiones=6,
            peso=120,
            notas="Espalda ancha y gruesa",
            orden=1,
            rutina_id=push_day.id
        ),
        Ejercicio(
            nombre="Jalón Polea Alta",
            dia_semana=DiaEnum.MIERCOLES,
            series=3,
            repeticiones=10,
            peso=80,
            notas="Aislamiento de espalda",
            orden=2,
            rutina_id=push_day.id
        ),
        Ejercicio(
            nombre="Extensiones de Tríceps",
            dia_semana=DiaEnum.MIERCOLES,
            series=3,
            repeticiones=12,
            peso=40,
            notas="Control total del movimiento",
            orden=3,
            rutina_id=push_day.id
        ),
        Ejercicio(
            nombre="Dominadas",
            dia_semana=DiaEnum.VIERNES,
            series=4,
            repeticiones=8,
            peso=None,
            notas="Peso corporal, añadir banda si es necesario",
            orden=1,
            rutina_id=push_day.id
        ),
    ]
    
    # ============ RUTINA 2: LEG DAY ============
    leg_day = Rutina(
        nombre="Leg Day",
        descripcion="Día intenso de piernas. Trabajar cuádriceps, isquiotibiales y glúteos."
    )
    db.add(leg_day)
    db.flush()
    
    ejercicios_leg = [
        Ejercicio(
            nombre="Sentadillas",
            dia_semana=DiaEnum.MARTES,
            series=5,
            repeticiones=5,
            peso=150,
            notas="Movimiento fundamental, forma perfecta",
            orden=1,
            rutina_id=leg_day.id
        ),
        Ejercicio(
            nombre="Prensa de Piernas",
            dia_semana=DiaEnum.MARTES,
            series=3,
            repeticiones=10,
            peso=300,
            notas="Descenso controlado",
            orden=2,
            rutina_id=leg_day.id
        ),
        Ejercicio(
            nombre="Extensiones de Cuádriceps",
            dia_semana=DiaEnum.MARTES,
            series=3,
            repeticiones=12,
            peso=100,
            notas="Aislamiento puro",
            orden=3,
            rutina_id=leg_day.id
        ),
        Ejercicio(
            nombre="Flexiones de Isquiotibiales",
            dia_semana=DiaEnum.MARTES,
            series=3,
            repeticiones=12,
            peso=80,
            notas="Equilibrio muscular",
            orden=4,
            rutina_id=leg_day.id
        ),
        Ejercicio(
            nombre="Peso Muerto",
            dia_semana=DiaEnum.JUEVES,
            series=4,
            repeticiones=6,
            peso=180,
            notas="Máxima intensidad, técnica perfecta",
            orden=1,
            rutina_id=leg_day.id
        ),
        Ejercicio(
            nombre="Sentadilla Búlgara",
            dia_semana=DiaEnum.JUEVES,
            series=3,
            repeticiones=10,
            peso=40,
            notas="Por pierna",
            orden=2,
            rutina_id=leg_day.id
        ),
        Ejercicio(
            nombre="Curl de Piernas",
            dia_semana=DiaEnum.JUEVES,
            series=3,
            repeticiones=12,
            peso=90,
            notas="Terminar los isquiotibiales",
            orden=3,
            rutina_id=leg_day.id
        ),
    ]
    
    # ============ RUTINA 3: FULL BODY ============
    full_body = Rutina(
        nombre="Full Body",
        descripcion="Rutina de cuerpo completo para días de entrenamiento moderado. Ideal para 3 días por semana."
    )
    db.add(full_body)
    db.flush()
    
    ejercicios_full = [
        Ejercicio(
            nombre="Sentadillas",
            dia_semana=DiaEnum.LUNES,
            series=3,
            repeticiones=8,
            peso=120,
            notas="Calentamiento incluido",
            orden=1,
            rutina_id=full_body.id
        ),
        Ejercicio(
            nombre="Press de Banca",
            dia_semana=DiaEnum.LUNES,
            series=3,
            repeticiones=8,
            peso=80,
            notas="Pecho",
            orden=2,
            rutina_id=full_body.id
        ),
        Ejercicio(
            nombre="Remo Barbell",
            dia_semana=DiaEnum.LUNES,
            series=3,
            repeticiones=8,
            peso=100,
            notas="Espalda",
            orden=3,
            rutina_id=full_body.id
        ),
        Ejercicio(
            nombre="Flexiones de Isquiotibiales",
            dia_semana=DiaEnum.LUNES,
            series=2,
            repeticiones=12,
            peso=70,
            notas="Posterior",
            orden=4,
            rutina_id=full_body.id
        ),
        Ejercicio(
            nombre="Peso Muerto",
            dia_semana=DiaEnum.MIERCOLES,
            series=3,
            repeticiones=6,
            peso=140,
            notas="Máxima potencia",
            orden=1,
            rutina_id=full_body.id
        ),
        Ejercicio(
            nombre="Dominadas",
            dia_semana=DiaEnum.MIERCOLES,
            series=3,
            repeticiones=8,
            peso=None,
            notas="Espalda y brazos",
            orden=2,
            rutina_id=full_body.id
        ),
        Ejercicio(
            nombre="Press Militar",
            dia_semana=DiaEnum.MIERCOLES,
            series=3,
            repeticiones=8,
            peso=45,
            notas="Hombros",
            orden=3,
            rutina_id=full_body.id
        ),
        Ejercicio(
            nombre="Flexiones",
            dia_semana=DiaEnum.MIERCOLES,
            series=3,
            repeticiones=12,
            peso=None,
            notas="Peso corporal",
            orden=4,
            rutina_id=full_body.id
        ),
        Ejercicio(
            nombre="Sentadilla Búlgara",
            dia_semana=DiaEnum.VIERNES,
            series=3,
            repeticiones=10,
            peso=35,
            notas="Por pierna",
            orden=1,
            rutina_id=full_body.id
        ),
        Ejercicio(
            nombre="Aperturas con Mancuernas",
            dia_semana=DiaEnum.VIERNES,
            series=3,
            repeticiones=12,
            peso=25,
            notas="Pecho aislado",
            orden=2,
            rutina_id=full_body.id
        ),
        Ejercicio(
            nombre="Jalón Polea",
            dia_semana=DiaEnum.VIERNES,
            series=3,
            repeticiones=12,
            peso=70,
            notas="Espalda",
            orden=3,
            rutina_id=full_body.id
        ),
        Ejercicio(
            nombre="Extensiones de Tríceps",
            dia_semana=DiaEnum.VIERNES,
            series=3,
            repeticiones=12,
            peso=35,
            notas="Brazos",
            orden=4,
            rutina_id=full_body.id
        ),
    ]
    
    # Agregar todos los ejercicios
    db.add_all(ejercicios_push)
    db.add_all(ejercicios_leg)
    db.add_all(ejercicios_full)
    
    # Guardar todo
    db.commit()
    print("✓ Datos de ejemplo cargados exitosamente")
    print("  - Push Day (8 ejercicios)")
    print("  - Leg Day (7 ejercicios)")
    print("  - Full Body (12 ejercicios)")
    db.close()