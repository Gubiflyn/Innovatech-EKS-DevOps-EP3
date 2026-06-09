output "cluster_name" {
  description = "Nombre del clúster EKS."
  value       = module.eks.cluster_name
}

output "cluster_endpoint" {
  description = "Endpoint del clúster EKS."
  value       = module.eks.cluster_endpoint
}

output "cluster_version" {
  description = "Versión de Kubernetes usada en EKS."
  value       = module.eks.cluster_version
}

output "vpc_id" {
  description = "ID de la VPC creada."
  value       = module.vpc.vpc_id
}

output "public_subnets" {
  description = "IDs de las subnets públicas."
  value       = module.vpc.public_subnets
}

output "private_subnets" {
  description = "IDs de las subnets privadas."
  value       = module.vpc.private_subnets
}

output "node_security_group_id" {
  description = "Security Group asociado a los nodos de EKS."
  value       = module.eks.node_security_group_id
}

output "cluster_security_group_id" {
  description = "Security Group asociado al clúster EKS."
  value       = module.eks.cluster_security_group_id
}

output "configure_kubectl" {
  description = "Comando para conectar kubectl al clúster EKS."
  value       = "aws eks update-kubeconfig --region ${var.aws_region} --name ${module.eks.cluster_name}"
}