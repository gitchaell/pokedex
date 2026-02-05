#!/bin/bash

# Configurar variables de entorno
source ~/google-cloud-sdk/path.bash.inc

GCP_PROJECT_ID="pokedex-premium"
SERVICE_NAME="pokedex-backend"
REGION="us-central1"

echo "==================================="
echo "Desplegando $SERVICE_NAME en Cloud Run"
echo "==================================="
echo "Proyecto: $GCP_PROJECT_ID"
echo "Región: $REGION"
echo "Servicio: $SERVICE_NAME"
echo ""

# Establecer proyecto
echo "1. Configurando proyecto..."
gcloud config set project $GCP_PROJECT_ID

# Habilitar APIs necesarias
echo ""
echo "2. Habilitando APIs necesarias..."
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# Crear repositorio en Artifact Registry (si no existe)
echo ""
echo "3. Configurando Artifact Registry..."
gcloud artifacts repositories create cloud-run-source \
  --repository-format=docker \
  --location=$REGION \
  --quiet 2>/dev/null || echo "Repositorio ya existe"

# Compilar y subir imagen
echo ""
echo "4. Compilando y subiendo imagen a Cloud Build..."
cd "$(dirname "$0")" # Asegurarse de estar en backend/

IMAGE_NAME="${REGION}-docker.pkg.dev/${GCP_PROJECT_ID}/cloud-run-source/${SERVICE_NAME}:latest"

gcloud builds submit \
  --tag "$IMAGE_NAME" \
  --timeout=3600

# Desplegar en Cloud Run
echo ""
echo "5. Desplegando en Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image "$IMAGE_NAME" \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1

echo ""
echo "==================================="
echo "✓ Despliegue completado!"
echo "==================================="
echo ""
echo "Para obtener la URL del servicio:"
echo "gcloud run services describe $SERVICE_NAME --region $REGION --format='value(status.url)'"
