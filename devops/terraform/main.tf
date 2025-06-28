# Terraform configuration for Kubernetes cluster (example: using kind/local or cloud provider)
provider "kubernetes" {
  config_path = var.kubeconfig
}

resource "kubernetes_namespace" "app" {
  metadata {
    name = "cloud-counselage"
  }
}
