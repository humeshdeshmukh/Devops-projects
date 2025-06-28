# Cloud Counselage Full-Stack DevOps Project

## Overview
This project demonstrates a modern DevOps workflow for a Node.js/Express backend and React (Vite) frontend, containerized with Docker, orchestrated with Kubernetes, and automated with CI/CD (GitHub Actions). It includes advanced DevOps tools: Helm, Terraform, Ansible, Prometheus, and Grafana.

## Directory Structure
- `src/` - Backend Node.js/Express app
- `client/` - Frontend React app (Vite)
- `devops/k8s/` - Kubernetes manifests
- `devops/helm/` - Helm chart for the app
- `devops/terraform/` - Terraform scripts for infra provisioning
- `devops/ansible/` - Ansible playbook for config management
- `monitoring/prometheus/` - Prometheus config
- `monitoring/grafana/` - Grafana config and dashboards

## Usage

### 1. Automated CI/CD (Recommended)
#### Prerequisites
- Set the following GitHub repository secrets:
  - `DOCKERHUB_USERNAME`: Your Docker Hub username
  - `DOCKERHUB_TOKEN`: A Docker Hub access token/password
  - `KUBECONFIG`: Your kubeconfig file, base64-encoded (for cluster access)

#### Workflow
- On every push to `main`, GitHub Actions will:
  1. Build and push backend/frontend Docker images to Docker Hub
  2. Deploy the app to your Kubernetes cluster using Helm

### 2. Local Automation (PowerShell)
Run the provided script for local build, push, and deploy:
```powershell
./devops/local-deploy.ps1
```
Follow the prompts for Docker Hub username and image tag.

### 3. Manual Steps (if needed)
- Build and push Docker images (see script for commands)
- Update image names in K8s/Helm manifests
- Deploy with `kubectl apply -f devops/k8s/` or `helm install cloud-counselage devops/helm`

### 4. Monitoring
- Prometheus: Use `monitoring/prometheus/prometheus.yml`
- Grafana: Use `monitoring/grafana/datasource.yml` and `dashboard.json`

## CI/CD
- Automated with GitHub Actions (`.github/workflows/ci-cd.yml`)
- Requires secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `KUBECONFIG`

## Best Practices
- Linting, Prettier, Husky, and dotenv for code quality and env management
- Resource requests/limits in K8s
- Infrastructure as Code (IaC) for reproducibility

## Advanced Features
- **Horizontal Pod Autoscaler (HPA):** Auto-scales backend pods based on CPU usage.
- **Ingress with TLS:** Secure routing for frontend and backend using NGINX and cert-manager (Let's Encrypt).
- **Prometheus Metrics:** Backend exposes /metrics endpoint for Prometheus scraping.
- **Security Scanning:** Trivy scans backend Docker image for vulnerabilities in CI/CD.
- **Grafana Dashboards:** Includes app metrics dashboard for backend request rate.

## How to Use New Features

### 1. HPA
```bash
kubectl apply -f devops/k8s/backend-hpa.yaml
```

### 2. Ingress & TLS
- Edit `devops/k8s/ingress.yaml` and `cert-manager-issuer.yaml` with your domain and email.
- Install NGINX Ingress and cert-manager in your cluster.
- Apply:
```bash
kubectl apply -f devops/k8s/cert-manager-issuer.yaml
kubectl apply -f devops/k8s/ingress.yaml
```

### 3. Prometheus Metrics
- Backend exposes `/metrics` (already configured in Prometheus scrape config).

### 4. Trivy Security Scan
- Runs automatically in GitHub Actions on backend build.

### 5. Grafana Dashboards
- Import `monitoring/grafana/app-dashboard.json` into Grafana for backend metrics.

---
For more details, see comments in each config file.
