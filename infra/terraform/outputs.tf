output "aws_region" {
  description = "Región de AWS utilizada."
  value       = var.aws_region
}

output "cluster_name" {
  description = "Nombre del clúster EKS."
  value       = aws_eks_cluster.main.name
}

output "cluster_endpoint" {
  description = "Endpoint público del clúster EKS."
  value       = aws_eks_cluster.main.endpoint
}

output "vpc_id" {
  description = "ID de la VPC creada."
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs de las subredes públicas."
  value       = aws_subnet.public[*].id
}

output "ecr_repository_urls" {
  description = "URLs de los repositorios ECR."
  value = {
    for name, repo in aws_ecr_repository.repositories :
    name => repo.repository_url
  }
}

output "update_kubeconfig_command" {
  description = "Comando para conectar kubectl al clúster EKS."
  value       = "aws eks update-kubeconfig --region ${var.aws_region} --name ${aws_eks_cluster.main.name}"
}