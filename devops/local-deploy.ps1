# PowerShell script to automate local build, push, and deploy for Cloud Counselage
# Edit <your-docker-username> and <tag> as needed

$dockerUser = Read-Host 'Enter your Docker Hub username'
$tag = Read-Host 'Enter image tag (e.g., latest)'

Write-Host 'Building and pushing backend image...'
docker build -t $dockerUser/backend:$tag .
docker push $dockerUser/backend:$tag

Write-Host 'Building and pushing frontend image...'
cd client
docker build -t $dockerUser/frontend:$tag .
docker push $dockerUser/frontend:$tag
cd ..

Write-Host 'Updating Kubernetes manifests with image tags...'
(Get-Content devops/k8s/backend-deployment.yaml) -replace 'image: backend:latest', "image: $dockerUser/backend:$tag" | Set-Content devops/k8s/backend-deployment.yaml
(Get-Content devops/k8s/frontend-deployment.yaml) -replace 'image: frontend:latest', "image: $dockerUser/frontend:$tag" | Set-Content devops/k8s/frontend-deployment.yaml

Write-Host 'Applying Kubernetes manifests...'
kubectl apply -f devops/k8s/

Write-Host 'Done!'
