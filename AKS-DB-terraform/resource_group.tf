resource "azurerm_resource_group" "resource_group" {
  name     = "${var.prefix}-rg"
  location = var.location
}