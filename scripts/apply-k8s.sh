#!/bin/sh
gcloud container clusters get-credentials node-app-prod --region=europe-west2 && \
cd k8s && kubectl apply -f namespace.yml && kubectl apply -f .