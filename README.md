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
Instalar dependencias
bash
Copiar código
npm install
# o
yarn install
# o
pnpm install
Configurar la base de datos
Este proyecto usa Prisma para la gestión de la base de datos. Debes configurar tu base de datos MySQL y ajustar las credenciales en el archivo .env.

Crea un archivo .env en la raíz del proyecto si no existe:
makefile
Copiar código
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_base_datos"
Ejecuta las migraciones de Prisma para generar las tablas necesarias:
bash
Copiar código
npx prisma migrate dev --name init
Para visualizar y explorar la base de datos, puedes usar Prisma Studio:
bash
Copiar código
npx prisma studio
Iniciar el servidor de desarrollo
Inicia el servidor de desarrollo local:

bash
Copiar código
npm run dev
# o
yarn dev
# o
pnpm dev
Abre http://localhost:3000 en tu navegador para ver el proyecto en acción.

Uso de Prisma
Este proyecto utiliza Prisma para realizar las consultas de la base de datos. A continuación, algunos comandos útiles:

Generar Prisma Client: Si haces cambios en el esquema de Prisma (prisma/schema.prisma), ejecuta el siguiente comando para regenerar el cliente de Prisma:
bash
Copiar código
npx prisma generate
Aplicar Migraciones: Si has modificado el esquema de la base de datos, puedes aplicar las migraciones usando:
bash
Copiar código
npx prisma migrate dev
Explorar la base de datos: Usa Prisma Studio para ver y modificar los registros en la base de datos:
bash
Copiar código
npx prisma studio
Despliegue
El despliegue de este proyecto se puede realizar en Vercel, ya que es la plataforma recomendada para Next.js.

Si aún no tienes una cuenta, regístrate en Vercel.
Conecta tu repositorio y sigue los pasos para desplegar tu aplicación.
Para más detalles sobre cómo desplegar en Vercel, visita la documentación oficial.

Contribuciones
¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, siéntete libre de hacer un fork y enviar un pull request.
