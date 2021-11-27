terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.1.0"
    }
  }
}

terraform {
  backend "gcs" {
    bucket = "node-express-typescript-k8-gke-tf-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  region      = var.region
  zone        = var.zone
  project     = var.project
}