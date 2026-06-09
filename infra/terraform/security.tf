resource "aws_security_group_rule" "nodes_ingress_self" {
  description              = "Permite comunicación interna entre los nodos de EKS."
  type                     = "ingress"
  from_port                = 0
  to_port                  = 65535
  protocol                 = "tcp"
  security_group_id        = module.eks.node_security_group_id
  source_security_group_id = module.eks.node_security_group_id
}

resource "aws_security_group_rule" "nodes_egress_internet" {
  description       = "Permite salida de los nodos hacia internet para descargar imágenes y actualizaciones."
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  security_group_id = module.eks.node_security_group_id
  cidr_blocks       = ["0.0.0.0/0"]
}