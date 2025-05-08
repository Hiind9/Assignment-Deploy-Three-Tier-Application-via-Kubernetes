resource "azurerm_mssql_server" "sql_server" {
  name                         = "${var.prefix}-sqlserver"
  resource_group_name          = azurerm_resource_group.resource_group.name
  location                     = azurerm_resource_group.resource_group.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_login
  administrator_login_password = var.sql_admin_password

  tags = {
    environment = "dev"
  }
}

resource "azurerm_mssql_database" "sql_db" {
  name           = "${var.prefix}-sqldb"
  server_id      = azurerm_mssql_server.sql_server.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  license_type   = "LicenseIncluded"
  sku_name       = "Basic"
  max_size_gb    = 2
}

# Allow AKS to access the SQL Database
resource "azurerm_mssql_firewall_rule" "aks_access" {
  name                = "allow-aks"
  server_id           = azurerm_mssql_server.sql_server.id
  start_ip_address    = "0.0.0.0" # For demo purposes - restrict in production
  end_ip_address      = "255.255.255.255"
}

# Add the SQL server name and credentials to Key Vault or output them
output "sql_server_fqdn" {
  value = azurerm_mssql_server.sql_server.fully_qualified_domain_name
  sensitive = true
}

output "sql_server_name" {
  value       = azurerm_mssql_server.sql_server.name
  description = "The name of the SQL Server"
}