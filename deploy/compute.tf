resource "google_container_cluster" "app_cluster" {
  name             = "node-express-typescript-k8-gke"
  location         = var.region
  enable_autopilot = true
  vertical_pod_autoscaling {
    enabled = true
  }
}

resource "google_compute_global_address" "external_static_ip" {
  name         = "app-ingress-static-ip"
  address_type = "EXTERNAL"
  ip_version   = "IPV4"
  project      = var.project
  description  = "External static IP address for app"
}

output "app_ip" {
  value       = google_compute_global_address.external_static_ip.address
  description = "External static IP address for app"
}
