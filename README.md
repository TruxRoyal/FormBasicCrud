# FormBasicCrud

Este es un proyecto desarrollado con [Next.js](https://nextjs.org), que ofrece una interfaz para realizar operaciones básicas de CRUD (Crear, Leer, Actualizar y Eliminar) sobre un formulario de contacto. El proyecto también incluye la integración con Prisma para manejar la base de datos.

## Características

- Formulario para gestionar registros de contacto con campos como nombre, dirección, email, observaciones, etc.
- Uso de Prisma para la interacción con la base de datos (MySQL).
- Generación de PDFs con información del contacto y descarga de datos en formato JSON.
- Implementación de UI moderna con componentes de interfaz reutilizables.

## Requisitos previos

Asegúrate de tener instalados los siguientes requisitos antes de comenzar:

- [Node.js](https://nodejs.org/) v16 o superior.
- [MySQL](https://www.mysql.com/) para la base de datos.

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/usuario/form-basic-crud.git
cd form-basic-crud
```
### Instalar dependencias
```bash
npm install
# o
yarn install
# o
pnpm install
```
### Configurar la base de datos
Este proyecto usa Prisma para la gestión de la base de datos. Debes configurar tu base de datos MySQL y ajustar las credenciales en el archivo .env.

1.) Crea un archivo .env en la raíz del proyecto si no existe:
```bash
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_base_datos"
```
2.) Ejecuta las migraciones de Prisma para generar las tablas necesarias:
```bash
npx prisma migrate dev --name init
```
3.) Para visualizar y explorar la base de datos, puedes usar Prisma Studio:
```bash
npx prisma studio
```
4.) Inicia el servidor de desarrollo local:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre http://localhost:3000 en tu navegador para ver el proyecto en acción.

### Uso de Prisma
Este proyecto utiliza Prisma para realizar las consultas de la base de datos. A continuación, algunos comandos útiles:
1.) Generar Prisma Client: Si haces cambios en el esquema de Prisma (prisma/schema.prisma), ejecuta el siguiente comando para regenerar el cliente de Prisma:
```bash
npx prisma generate
```
2.) Aplicar Migraciones: Si has modificado el esquema de la base de datos, puedes aplicar las migraciones usando:
```bash
npx prisma migrate dev
```
3.) Explorar la base de datos: Usa Prisma Studio para ver y modificar los registros en la base de datos:
```bash
npx prisma studio
```
## Despliegue
El despliegue de este proyecto se puede realizar en Vercel, ya que es la plataforma recomendada para Next.js.
  Conecta tu repositorio y sigue los pasos para desplegar tu aplicación.
Para más detalles sobre cómo desplegar en Vercel, visita la documentación oficial.

## Base de datos
### Modelo relacional
<img width="602" alt="image" src="https://github.com/user-attachments/assets/d7536515-c16c-47f1-bbd1-2bc7fbdc88b2">


Contribuciones
¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, siéntete libre de hacer un fork y enviar un pull request.
