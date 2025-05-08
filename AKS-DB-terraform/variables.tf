variable "prefix" {
  
}

variable "location" {
  
}

variable "vm_size" {

    default = "Standard_A2_v2"
  
}

variable "default_node_pool_name" {
  
}

variable "sql_admin_login" {
  description = "The administrator username for SQL Server"
  type        = string
  default     = "sqladmin"
}

variable "sql_admin_password" {
  description = "The administrator password for SQL Server"
  type        = string
  sensitive   = true
}