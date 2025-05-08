resource "azurerm_kubernetes_cluster" "aks" {
  name                = "${var.prefix}-aks-cluster"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  dns_prefix          = "${var.prefix}-dns"

  node_resource_group = "${var.prefix}-aks-node"

  default_node_pool {
    name       = var.default_node_pool_name
    node_count = 2
    vm_size    = var.vm_size
  }

  identity {
    type = "SystemAssigned"
  }

 
}

resource "azurerm_role_assignment" "aks_disk_reader" {
  principal_id         = azurerm_kubernetes_cluster.aks.identity[0].principal_id
  role_definition_name = "Reader"  # or "Disk Reader" or "Contributor" based on your needs
  scope                = "/subscriptions/a7135c8f-934c-4000-b5b1-b09d6b645365/resourceGroups/DevOps2-Hind-lab"
}