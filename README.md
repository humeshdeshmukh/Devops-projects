# Cloud Counselage Full-Stack DevOps Project

## Overview
This project demonstrates a modern DevOps workflow for a Node.js/Express backend and React (Vite) frontend, containerized with Docker, orchestrated with Kubernetes, and automated with CI/CD (GitHub Actions). It includes advanced DevOps tools: Helm, Terraform, Ansible, Prometheus, Grafana, HPA, Ingress, and more.

**GitHub Repository:**
https://github.com/humeshdeshmukh/Devops-projects

## Directory Structure
- `src/` - Backend Node.js/Express app
- `client/` - Frontend React app (Vite)
- `devops/k8s/` - Kubernetes manifests (backend, frontend, Prometheus, Grafana, HPA, Ingress, cert-manager, etc.)
- `devops/helm/` - Helm chart for the app
- `devops/terraform/` - Terraform scripts for infra provisioning
- `devops/ansible/` - Ansible playbook for config management
- `monitoring/prometheus/` - Prometheus config
- `monitoring/grafana/` - Grafana config and dashboards

## How to Run the Application (All Tools & Features)

### 1. Start Minikube
```bash
minikube start --driver=docker
```

### 2. (Optional) Use Minikube’s Docker Daemon for Local Image Builds
```bash
eval $(minikube -p minikube docker-env)
```

### 3. Build and Push Docker Images (if not using CI/CD)
```bash
# Backend
docker build -t humeshdeshmukh/backend:latest .
docker push humeshdeshmukh/backend:latest
# Frontend
cd client
docker build -t humeshdeshmukh/frontend:latest .
docker push humeshdeshmukh/frontend:latest
cd ..
```

### 4. Apply All Kubernetes Manifests
```bash
kubectl apply -f devops/k8s/
```

### 5. Install cert-manager (for Ingress TLS)
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.crds.yaml
kubectl create namespace cert-manager
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager --namespace cert-manager --version v1.14.4
kubectl apply -f devops/k8s/cert-manager-issuer.yaml
```

### 6. Access Your Services
```bash
minikube service frontend-service
minikube service backend-service
minikube service prometheus
minikube service grafana
```
- Grafana login: `admin` / `admin`
- Import dashboards from `monitoring/grafana/`

### 7. Check HPA and Ingress
```bash
kubectl get hpa
kubectl get ingress
```

### 8. CI/CD Pipeline (on GitHub)
- Push any code changes to `main`:
  ```bash
  git add .
  git commit -m "Update and redeploy"
  git push origin main
  ```
- Monitor the Actions tab on GitHub for build, test, scan, and deploy jobs.

## Advanced Features
- **Horizontal Pod Autoscaler (HPA):** Auto-scales backend pods based on CPU usage.
- **Ingress with TLS:** Secure routing for frontend and backend using NGINX and cert-manager (Let's Encrypt).
- **Prometheus Metrics:** Backend exposes /metrics endpoint for Prometheus scraping.
- **Security Scanning:** Trivy scans backend Docker image for vulnerabilities in CI/CD.
- **Grafana Dashboards:** Includes app metrics dashboard for backend request rate.
- **Infrastructure as Code:** Terraform and Ansible for provisioning and config management.

## Troubleshooting
- **cert-manager ClusterIssuer error:** Install cert-manager and CRDs before applying issuer.
- **Prometheus/Grafana connection:** Ensure Grafana datasource URL is `http://prometheus:9090` (in-cluster) or use port-forward for local access.
- **Backend not working:** Check pod logs with `kubectl logs <backend-pod-name>` and service status with `kubectl get services`.

---
For more details, see comments in each config file and the GitHub repository.
