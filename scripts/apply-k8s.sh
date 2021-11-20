#!/bin/sh
gcloud container clusters get-credentials node-express-typescript-k8-gke --region=europe-west2 && \
cd k8s && kubectl apply -f namespace.yml && kubectl apply -f .