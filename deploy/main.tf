terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.77.0"
    }
  }
}

terraform {
  backend "gcs" {
    bucket = "node-express-typescript-tf-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  region      = var.region
  zone        = var.zone
  project     = var.project
  credentials = var.credentials_filepath
}