# 🍰 GourmetHub

Aplicación web de recetas de cocina construida con Node.js y Pug, que consume la API de Spoonacular para mostrar recetas con información nutricional, permite a los usuarios registrarse, iniciar sesión, guardar sus recetas favoritas y valorar el sitio.

---

## ✨ Funcionalidades

- 🔍 Exploración de recetas obtenidas desde la API de Spoonacular
- 🔐 Registro e inicio de sesión de usuarios con contraseña encriptada
- ❤️ Guardar y quitar recetas favoritas por usuario
- 📋 Vista detallada de cada receta en un modal (ingredientes, instrucciones, badges de dieta)
- ⭐ Sistema de valoración del sitio con estrellas
- 🚫 Manejo del límite de llamadas a la API (error 402)
- 📱 Diseño responsivo con estética *cute* usando Tailwind CSS

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| Node.js | Servidor y lógica backend |
| Express.js | Framework web y manejo de rutas |
| Pug | Motor de plantillas HTML |
| MySQL | Base de datos relacional |
| Tailwind CSS | Estilos y diseño responsivo |
| Spoonacular API | Fuente de recetas externas |
| bcryptjs | Encriptación de contraseñas |
| express-session | Manejo de sesiones de usuario |
| axios | Peticiones HTTP a la API externa |

---

## 📁 Estructura del proyecto

```
GourmetHub/
├── public/
│   └── css/
│       └── R.css
├── views/
│   ├── index.pug
│   ├── login.pug
│   ├── signup.pug
│   └── favoritos.pug
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Instalación y configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/KeilaGallard/GourmetHub.git
cd GourmetHub
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura la base de datos

Crea una base de datos en MySQL llamada `gourmethub` y ejecuta las siguientes tablas:

```sql
CREATE TABLE Usuarios (
  UsuarioID INT AUTO_INCREMENT PRIMARY KEY,
  NombreUsuario VARCHAR(100) NOT NULL,
  Correo VARCHAR(150) NOT NULL UNIQUE,
  Contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE Favoritos (
  FavoritoID INT AUTO_INCREMENT PRIMARY KEY,
  UsuarioID INT NOT NULL,
  RecipeID INT NOT NULL,
  Titulo VARCHAR(255) NOT NULL,
  Imagen VARCHAR(500),
  Categoria VARCHAR(100),
  Tiempo VARCHAR(50),
  Porciones VARCHAR(50),
  Ingredientes TEXT,
  Instrucciones TEXT,
  Resumen TEXT,
  Vegetariano TINYINT(1) DEFAULT 0,
  Vegano TINYINT(1) DEFAULT 0,
  SinGluten TINYINT(1) DEFAULT 0,
  SinLacteos TINYINT(1) DEFAULT 0,
  UNIQUE KEY unique_fav (UsuarioID, RecipeID),
  FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);

CREATE TABLE Valoraciones (
  ValoracionID INT AUTO_INCREMENT PRIMARY KEY,
  Estrellas TINYINT NOT NULL CHECK (Estrellas BETWEEN 1 AND 5),
  FechaHora DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Configura la conexión en `app.js`

Edita la conexión MySQL con tus credenciales:

```javascript
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'gourmethub'
});
```

Y reemplaza la API key de Spoonacular con la tuya:

```javascript
const apiKey = 'TU_API_KEY_AQUI';
```

> Puedes obtener una API key gratuita en [spoonacular.com/food-api](https://spoonacular.com/food-api)

### 5. Inicia el servidor

```bash
node app.js
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000)

---

## 🗺️ Rutas principales

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Vista principal con recetas |
| GET | `/login` | Vista de inicio de sesión |
| GET | `/signup` | Vista de registro |
| POST | `/login` | Autenticar usuario |
| POST | `/register` | Registrar nuevo usuario |
| POST | `/logout` | Cerrar sesión |
| GET | `/recipe/:id` | Detalle de receta desde Spoonacular |
| GET | `/favoritos` | Obtener favoritos del usuario (JSON) |
| GET | `/favoritos-vista` | Vista de recetas favoritas |
| POST | `/favoritos` | Agregar receta a favoritos |
| DELETE | `/favoritos/:recipeId` | Quitar receta de favoritos |
| POST | `/valoracion` | Guardar valoración del sitio |

---

## 📸 Vistas

- **Inicio** — grid de recetas con filtro nutricional, botón de favorito por card y modal de detalle
- **Login / Signup** — formularios con validación en el cliente
- **Favoritos** — recetas guardadas por el usuario con opción de eliminar y ver detalle sin consumir la API
- **Modal de receta** — imagen, categoría, tiempo, porciones, badges de dieta, ingredientes e instrucciones paso a paso

---

## 👩‍💻 Autora

**Keila Gallardo y Tobito**  
[GitHub](https://github.com/KeilaGallard)

---

> Hecho con mucho ❤️ y GourmetHub