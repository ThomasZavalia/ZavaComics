# ZavaComics

ZavaComics es una plataforma full‑stack para explorar, comprar (simulada) y leer cómics desde el navegador. El proyecto está organizado como un monorepo con dos carpetas principales: `frontend/` (React + Vite, UI con Tailwind y Material UI) y `backend/` (Node.js + Express + Sequelize).


## Características principales

- Navegación por colección de cómics (portada, título, sinopsis).
- Página de detalle de cómic con compra (simulada) y botón "Leer".
- Biblioteca del usuario con cómics comprados.
- Registro e inicio de sesión (autenticación manejada desde frontend — verifica la implementación en `backend`).
- Panel/Admin: agregar/editar/eliminar cómics (visible solo para usuarios con rol `admin`).
- Lectura: la app navega a `/leer` enviando la URL de lectura (`urlLectura`) — soporta archivos .cbz/.zip alojados mediante URL.

---

## Tecnologías

- Frontend:
  - React (Vite)
  - TailwindCSS (hay `frontend/tailwind.config.js`)
  - Material UI (`@mui/material`) para componentes
- Backend:
  - Node.js, Express
  - Sequelize (ORM) — modelos `Comic`, `User`, `Compra` (asociaciones entre usuarios y cómics)
- Otros:
  - JSON Web Tokens (probable, revisar implementación de auth)
  - CBZ/ZIP para lectura remota (frontend pasa `urlLectura` al reader)

---

## Estructura relevante del repositorio

- frontend/
  - src/
    - Pages/ (Home, Login, Register, ComicsDetail, Libreria, AdminPanel, etc.)
    - Components/ (Navbar, ComicCard, ...)
    - Services/ (ej.: ComicService → llamadas a la API)
  - vite.config.js
  - tailwind.config.js
- backend/
  - src/
    - models/ (Comic.js, User.js, Compra.js?)
    - controllers/ (comicController.js, compraController.js, ...)
    - config/ (config de DB) — verifica si existe archivo de conexión
    - routes/ (rutas de API) — revisar
- package.json (posibles scripts en cada subcarpeta)

---

## Variables de entorno (sugeridas)

Ajustá los nombres/valores según tu implementación real. Crear `.env` en `backend/` y `.env` o `.env.local` en `frontend/` según necesidad.

Ejemplo `backend/.env`:
```
PORT=4000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=zavacomics_dev
DB_DIALECT=sqlite  # o postgres/mysql según lo que uses
JWT_SECRET=una_clave_secreta
```

Ejemplo `frontend/.env` (Vite):
```
VITE_API_URL=http://localhost:4000/api
```

Si usás SQLite para desarrollo, podés configurar `DB_DIALECT=sqlite` y punto de archivo en la configuración de Sequelize.

---

## Instalación y ejecución (desarrollo)

1. Clonar repo
   ```bash
   git clone https://github.com/ThomasZavalia/ZavaComics.git
   cd ZavaComics
   ```

2. Backend
   ```bash
   cd backend
   npm install
   # ajustar .env según corresponda
   # arranque (el script puede variar: dev, start, dev:watch...)
   npm run dev
   # o
   npm start
   ```
   - Asegurate de que la conexión de Sequelize esté configurada en `backend/src/config` (si no existe, crear config con `new Sequelize(...)`).
   - Si usás migraciones o sync, ejecutalas o permite que el app haga `sequelize.sync()` en dev.

3. Frontend
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   - Abre el browser en el puerto que indique Vite (por defecto 5173).

Nota: arrancá backend y frontend en terminales separadas. Podés usar herramientas como `concurrently` si querés un único comando.

---

## Rutas de API (inferencia desde controladores)

Las siguientes rutas están inferidas desde los nombres de los controladores y convenciones de REST; confirmá en `backend/src/routes`:

Comics
- GET  /api/comics             → obtener todos los cómics (comicController.obtenerTodos)
- POST /api/comics             → crear un cómic (admin) (comicController.crearComic)
- PUT  /api/comics/:id         → editar cómic (admin) (comicController.editarComic)
- DELETE /api/comics/:id       → eliminar cómic (admin) (comicController.eliminarComic)

Compras / Biblioteca
- POST /api/compras            → comprar cómic (simulado) (compraController.crearCompra / nombre aproximado)
- GET  /api/compras/biblioteca → obtener biblioteca del usuario (compraController.obtenerBiblioteca)

Auth / Usuarios (revisar nombres reales)
- POST /api/auth/register      → crear usuario
- POST /api/auth/login         → login, recibe token / cookie

Ajustá las rutas según tu archivo `routes` real.

---

## Modelos (resumen encontrado)

Comic (backend/src/models/Comic.js) — campos principales:
- id, titulo, genero, ilustrador, escritor, sinopsis, portada (URL), urlLectura (URL al archivo .cbz), precio, editorial, fechaPublicacion

User (backend/src/models/User.js) — campos principales:
- id, nombre, email (único), password (hash), rol (ENUM: `usuario`, `admin`)

Compra / Asociación:
- Hay una entidad `Compra` usada para guardar compras y asociar `User` ↔ `Comic` con `monto`, `fechaCompra` (ver `compraController`).

---

## Notas de desarrollo

- La compra está simulada: `compraController` devuelve `paymentStatus: "Aprobado"` y guarda la compra (ver controladores).
- El frontend muestra botones distintos según `isComprado` y `isAdmin`.
- Para que un usuario vea botones de admin: el frontend verifica `user.role === 'admin'`.
- El reader espera una `urlLectura` para navegar a `/leer` con `state` (revisar `ComicsDetail.jsx` y la página `Leer`).
- Los formularios de Login/Register usan un hook `useAuth` — revisá su implementación para el manejo del token y almacenamiento de user.

---


## Despliegue (sugerencia)

- Frontend: `npm run build` en `frontend/`, servir los archivos estáticos en un CDN o desde el backend (si lo deseas).
- Backend: desplegar en una plataforma Node (Heroku, Render, Vercel Serverless, Railway, etc.). Configurar variables de entorno (DB, JWT_SECRET, CORS).
- Asegurá que `VITE_API_URL` apunte a la URL pública del backend.

---



## Contacto

Repo: https://github.com/ThomasZavalia/ZavaComics  
Autor: ThomasZavalia
Linkedin: https://www.linkedin.com/in/thomas-zavalia-6425302bb/



Gracias — decime si querés que lo suba al repo o que primero inspeccione los archivos de rutas y el config de Sequelize para dejar el README 100% exacto. 
