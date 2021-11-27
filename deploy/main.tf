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
    bucket = "node-k8-tf-state-002"
    prefix = "terraform/state"
  }
}

provider "google" {
  region  = var.region
  zone    = var.zone
  project = var.project
}