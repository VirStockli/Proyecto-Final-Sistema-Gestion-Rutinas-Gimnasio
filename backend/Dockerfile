# Usar imagen oficial de Python 3.11
FROM python:3.11-slim

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de dependencias
COPY requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY . .

# El comando se ejecutará desde docker-compose.yml
# (uvicorn main:app --host 0.0.0.0 --port 8000 --reload)
