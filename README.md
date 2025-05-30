# Sodería Los Gutiérrez - Sistema de Gestión de Ventas

##  Objetivo del Proyecto

“Sodería Los Gutiérrez” es un sistema web diseñado para gestionar las operaciones diarias de una distribuidora de soda, con el objetivo de brindar una solución digital rápida, segura y escalable tanto para clientes como para administradores.

Este proyecto fue pensado como una **aplicación real** adaptable a soderías o negocios similares que requieran controlar productos, ventas, usuarios, clientes y más desde una interfaz moderna y clara.

---

##  Beneficios del Sistema

-  **Interfaz moderna y responsiva** (adaptada a distintos dispositivos).
-  **Inicio de sesión seguro** con diferentes roles (admin y cliente).
-  **Gestión de productos, clientes y ventas.**
-  **Funcionalidades extra**: buscadores, filtros, carrito de compras (opcional), historial de ventas.
-  **Escalabilidad**: fácilmente ampliable a más funcionalidades o integraciones (pagos, mapas, facturación).
-  **Experiencia de usuario** fluida con navegación clara y botones accesibles.
-  **Landing page profesional** para la presentación de la empresa y captación de nuevos clientes.

---

##  Tecnologías utilizadas

- **React JS** (con Vite) – frontend SPA
- **Zustand** – manejo global del estado (autenticación)
- **React Router DOM** – navegación entre páginas
- **Axios** – comunicación HTTP con backend
- **JSON Server** – simulación de base de datos local (para usuarios, productos, ventas, etc.)
- **Bootstrap** – diseño responsivo y estilizado rápido
- **CSS personalizado** – estilos únicos para marca y estética propia
- **Git y GitHub** – control de versiones y colaboración

---

##  Instalación y uso

### 1. Clonar el repositorio
-  git clone [https://github.com/pauloled/soderia-app]
-  cd soderia-app

### 2. Instalar dependencias
npm install

### 3. Iniciar JSON Server (en otro terminal)
npx json-server --watch db.json --port 3000

### 4. Iniciar la aplicación React
npm run dev

### 5. Acceder a la app
  **Navegador**: http://localhost:5173
-  **Cliente**: user: cliente, pass: 123
-  **Admin**: user: admin, pass: 123
  
---

## Funcionalidades del sistema
Módulo	Funciones disponibles
-  **Landing Page**	: Presentación de la marca, productos y contacto
-  **Login** : Acceso seguro por roles (admin o cliente)
-  **Productos** : Visualización, edición y carga de productos
-  **Ventas**	: Registrar ventas, ver historial
-  **Clientes**	: Registro, edición y listado de clientes
-  **Carrito** : Selección de productos para compra
-  **Admin Panel**	: Visualización general de la actividad del negocio

---

## Autores y colaboradores
-  Desarrollado por: Ledesma Paulo, Ledesma Santiago, Navarro Santiago, Quiroga Jose, Ramirez Leonardo
-  Materia: Programación III
-  Año: 2025
