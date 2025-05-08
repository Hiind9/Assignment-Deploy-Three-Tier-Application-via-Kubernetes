# 3-Tier Application

This repository contains a 3-tier web application with a frontend, backend API, and database layer, hosted on Azure for scalability and security.

## Project Structure

```
|-- UI/           # Frontend - Web Application (HTML, CSS, JavaScript)
|-- api/          # Backend - Node.js Application
|-- README.md     # Documentation
```

## Components

### 1. Frontend (UI)
- Developed using HTML, CSS, and JavaScript.
- Served using Nginx.
- Hosted within an Azure Storage Account (Static Website Hosting).

### 2. Backend API
- A Node.js application providing backend functionality.
- Hosted on Azure App Services.
- Exposes RESTful endpoints for frontend interactions.

### 3. Database
- Uses Azure SQL Database for data storage.
- Secured with Azure Active Directory authentication.

### 4. Networking & Security
- Azure Virtual Network (VNet) for secure communication.
- Azure Application Gateway for routing traffic and load balancing.
- Azure Firewall and NSGs for enhanced security.

## Deployment

### Prerequisites
- Azure Account with necessary permissions.
- Node.js & npm installed.
- Azure CLI installed.
- Terraform or ARM templates for infrastructure as code (optional).

### Deployment Steps

#### Frontend Deployment
1. Build the frontend files (if applicable).
2. Upload files to an Azure Storage Account.
3. Configure Nginx for static file hosting.

#### Backend Deployment
1. Navigate to the `api/` folder and install dependencies:

   ```sh
   cd api/
   npm install
   ```

2. Deploy the application to Azure App Services:

   ```sh
   az webapp up --name <app-name> --resource-group <resource-group> --runtime "NODE|18-lts"
   ```

#### Database Setup
1. Create an Azure SQL Database.
2. Configure the connection string in the backend API.

#### Networking & Security Configuration
1. Set up VNet integration.
2. Deploy Azure Application Gateway for traffic routing.
3. Apply firewall rules and NSGs for access control.

## Usage
- Access the frontend via the Nginx server URL.
- The frontend communicates with the backend via the Azure App Service API URL.
- The API interacts with the Azure SQL Database.
