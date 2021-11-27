resource "google_service_account" "github-actions" {
  account_id   = "github-actions-service-account"
  display_name = "Service account for Github Actions"
}

resource "google_project_iam_member" "gke_agent" {
  project = var.project
    role = "roles/container.serviceAgent"
  member  = "serviceAccount:${google_service_account.github-actions.email}"
}

resource "google_project_iam_member" "build_agent" {
  project = var.project
  role    = "roles/cloudbuild.serviceAgent"
  member  = "serviceAccount:${google_service_account.github-actions.email}"
}
