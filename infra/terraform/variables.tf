variable "aws_region" {
  description = "Región de AWS donde se desplegará la infraestructura."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nombre base del proyecto."
  type        = string
  default     = "innovatech"
}

variable "cluster_name" {
  description = "Nombre del clúster EKS."
  type        = string
  default     = "innovatech-eks"
}

variable "vpc_cidr" {
  description = "CIDR principal de la VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR de las subredes públicas."
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "node_instance_types" {
  description = "Tipos de instancia para los nodos del clúster EKS."
  type        = list(string)
  default     = ["t3.medium"]
}

variable "node_desired_size" {
  description = "Cantidad deseada de nodos."
  type        = number
  default     = 2
}

variable "node_min_size" {
  description = "Cantidad mínima de nodos."
  type        = number
  default     = 1
}

variable "node_max_size" {
  description = "Cantidad máxima de nodos."
  type        = number
  default     = 3
}