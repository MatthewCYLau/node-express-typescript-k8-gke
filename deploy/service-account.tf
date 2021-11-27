resource "google_service_account" "github-actions" {
  account_id   = "github-actions-service-account"
  display_name = "Service account for Github Actions"
}

data "google_iam_policy" "github" {
  binding {
    role = "roles/container.serviceAgent"
    members = [
      "serviceAccount:${google_service_account.github-actions.email}"
    ]
  }
  binding {
    role = "roles/cloudbuild.serviceAgent"
    members = [
      "serviceAccount:${google_service_account.github-actions.email}"
    ]
  }

}

/*
resource "google_project_iam_binding" "deploy" {
  project = var.project
  role    = "roles/container.serviceAgent"

  members = [
    "serviceAccount:${google_service_account.github-actions.email}"
  ]
}

resource "google_project_iam_binding" "build" {
  project = var.project
  role    = "roles/cloudbuild.serviceAgent"

  members = [
    "serviceAccount:${google_service_account.github-actions.email}"
  ]
}
*/
