# Sistema de atención médica

Esta es una aplicación web moderna para sistemas de atención médica creada con Next.js 15, Tailwind CSS, componentes de interfaz de usuario Shadcn, Clerk, Prisma ORM y una base de datos PostgreSQL. El sistema está diseñado para optimizar las operaciones de gestión del hospital, brindando funciones como control de acceso basado en roles (RBAC), programación de citas, gestión de laboratorios, gestión de personal y más.

---

## Funciones

### 1. **Control de acceso basado en roles (RBAC):**

- **Administrador:** Administrar usuarios, ver registros, administrar citas, manejar solicitudes de licencia y supervisar todas las funcionalidades del sistema.
- **Médicos:** Ver y administrar citas, actualizar registros de pacientes y realizar un seguimiento de solicitudes de licencia.
- **Pacientes:** Reservar y administrar citas, ver historial médico y acceder a resultados de laboratorio.
- **Personal de laboratorio:** Administrar y registrar resultados de pruebas y mantener inventario de laboratorio.

### 2. **Gestión del personal:**

- Agregue y administre diferentes roles del personal (enfermeras, médicos y otros miembros del personal).
- Asignar roles y responsabilidades específicos.

### 3. **Gestión de citas:**

- Los pacientes pueden reservar citas con los médicos disponibles.
- Los médicos pueden aceptar o cancelar citas.
- El administrador puede monitorear todas las citas.

### 4. **Gestión del laboratorio:**

- Registrar y actualizar los resultados de las pruebas.
- Vincular las pruebas de laboratorio a los registros de los pacientes.

### 5. **Gestión de licencias:**

- Los miembros del personal pueden solicitar licencias.
- El administrador puede aprobar, modificar fechas o rechazar solicitudes de licencias.

### 6. **Paneles de control modernos:**

- Paneles de control personalizados para cada tipo de usuario, que muestran información y análisis relevantes.

---

## Pila de tecnología

- **Frontend:** Next.js 15, Tailwind CSS, Shadcn UI
- **Backend:** Next.js Server Actions, Prisma ORM
- **Base de datos:** PostgreSQL (basada en la nube)
- **Gestión de usuarios:** Clerk

---

## Primeros pasos

### Requisitos previos

- Node.js (v18 o posterior)
- npm o yarn
- Base de datos PostgreSQL basada en la nube (p. ej., Supabase, Neon o similar)
- Cuenta de Clerk para la gestión de usuarios

### Instalación

1. **Abrir el archivo zip:**

```
Descomprimir y abrir el archivo en cualquier editor de código
```

2. **Instalar dependencias:**

```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno:**
Cree un archivo `.env` o cambie el nombre a `.env.example` en la raíz del proyecto y agregue lo siguiente:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your clerk publishable key
   CLERK_SECRET_KEY=clerk secrek key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    DATABASE_URL="postgres database url"
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=cloudinary cluster name for image uploading
   ```

Reemplace los marcadores de posición con sus credenciales de PostgreSQL basadas en la nube y las claves de Clerk. Para Clerk, puede encontrar estas claves en su panel de Clerk.

4. **Configurar Prisma:**

- Generar cliente Prisma:

```bash
npx prisma generate
```

- Ejecutar migraciones de base de datos:
```bash
npx prisma migrants dev --name init
```

5. **Ejecutar el servidor de desarrollo:**

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Configuración de la base de datos

Asegúrese de que su base de datos PostgreSQL basada en la nube esté configurada y sea accesible. Cree una nueva base de datos utilizando su herramienta de administración de bases de datos preferida o CLI:

```sql
CREATE DATABASE healthcare_db o nay name;
```

Actualice la `DATABASE_URL` en el archivo `.env` con sus credenciales de PostgreSQL basadas en la nube.

---

## Configuración de Clerk

1. Regístrese para obtener una [cuenta de Clerk](https://clerk.dev/).
2. Cree un nuevo proyecto de Clerk.
3. Copie la **API de interfaz** y las **claves de API** de la configuración de su proyecto de Clerk.
4. Actualice el archivo `.env` con los siguientes valores:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your clerk publishable key
    CLERK_SECRET_KEY=clerk secrek key
   ```

## Configuración de Prisma

1. **Esquema de Prisma:**
El esquema de Prisma se encuentra en `prisma/schema.prisma`. Puede actualizar este archivo para definir los modelos y relaciones de su base de datos.

2. **Migrar base de datos:**

```bash
npx prisma migrants dev --name init
```

3. **Prisma Studio:**
Para ver y administrar su base de datos:
```bash
npx prisma studio
```

---

## Estructura del proyecto

- **`app/`**: Contiene las páginas de Next.js.
- **`components/`**: Componentes de interfaz de usuario reutilizables creados con Shadcn UI.
- **`prisma/`**: Esquema y migraciones de Prisma.
- **`lib/`**: Funciones y configuraciones de utilidad.
- **`utils/`**: Funciones y configuraciones de utilidad.

---

## Implementación

1. **Crear para producción:**

```bash
npm run build
# o
yarn build
```

2. **Iniciar el servidor de producción:**
```bash
npm start
# o
yarn start
```

---

## Política de reembolso

No hay reembolso después de la compra del producto (código).

---

## Licencia

Este proyecto fue desarrollado por HopeCare, siéntete libre de usarlo para lo que elijas.

```

&nbsp;

## PRECAUCIÓN:

Este código no se prueba rigurosamente para producción y puede contener algunos errores. Así que ten cuidado.

## Para obtener asistencia, contacta a:

En caso de cualquier error o error relacionado con el código original, comunícate con Codewave para obtener ayuda. También puedes contactar para realizar personalizaciones, pero ten en cuenta que eso tendrá un costo.

- Correo electrónico: codewavewithasante@gmail.com
- Chat de Telegram: [https://t.me/Codewave_with_asante](https://t.me/Codewave_with_asante)
```
