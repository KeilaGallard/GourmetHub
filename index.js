const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const axios = require('axios');
const session = require('express-session');

const app = express();

app.use(cors());

app.use(session({
  secret: 'gourmet-hub-secret',
  resave: false,
  saveUninitialized: false
}));

// =========================
// CONFIGURAR PUG
// =========================
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =========================
// CONEXIÓN MYSQL
// =========================
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'gourmethub'
});

conexion.connect((error) => {

    if (error) {
        console.log('Error de conexión:', error);
    } else {
        console.log('Conectado a MySQL');
    }

});


// =========================
// RUTA PRINCIPAL
// =========================
app.get('/', async (req, res) => {
    try {
        const apiKey = 'd0ac41c011484f5b8a6b99d770410e0b';

        const respuesta = await axios.get(
            'https://api.spoonacular.com/recipes/findByNutrients',
            {
                params: {
                    minCarbs: 10,
                    maxCarbs: 50,
                    number: 20,
                    apiKey: apiKey
                }
            }
        );

        res.render('index', {
            recetas: respuesta.data,
            limitAlcanzado: false,
            usuario: req.session.usuario || null
        });

    } catch (error) {
        if (error.response?.status === 402) {
            return res.render('index', {
                recetas: [],
                limitAlcanzado: true,
                usuario: req.session.usuario || null
            });
        }

        console.log(error);
        res.render('index', {
            recetas: [],
            limitAlcanzado: false,
            usuario: req.session.usuario || null
        });
    }
});

app.get('/login', (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));

app.get('/recipe/:id', async (req, res) => {
  try {
    const apiKey = 'd0ac41c011484f5b8a6b99d770410e0b';
    const { id } = req.params;

    const respuesta = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false`,
      {
        params: {
          apiKey: apiKey
        }
      }
    );

    const data = respuesta.data;
    console.log(data)

      // Límite de llamadas alcanzado
  if (data.status === 402) {
    loading.classList.add('hidden');
    content.classList.remove('opacity-0');
    content.innerHTML = `
      <div class="flex flex-col items-center justify-center py-24 px-10 text-center">
        <p class="text-6xl mb-6">🍰</p>
        <h3 class="text-2xl font-bold cute-title text-gray-700 mb-3">¡Límite alcanzado!</h3>
        <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
          Hemos llegado al límite de consultas del día a nuestra API de recetitas.
          <br><br>
          ¡Vuelve mañana para seguir explorando recetas deliciosas! 🌸
        </p>
        <button 
          onclick="closeModalBtn()" 
          class="mt-8 bg-pink-50 text-pink-400 font-bold px-8 py-3 rounded-3xl hover:bg-pink-400 hover:text-white transition-all duration-300"
        >
          Cerrar
        </button>
      </div>
    `;
    document.body.style.overflow = 'hidden';
    return;
  }
    // Extraer instrucciones
    let instructions = 'Sin instrucciones disponibles.';
    if (data.analyzedInstructions?.length > 0 && data.analyzedInstructions[0].steps?.length > 0) {
      instructions = data.analyzedInstructions[0].steps
        .map(step => `${step.number}. ${step.step}`)
        .join('\n');
    } else if (data.instructions) {
      instructions = data.instructions.replace(/<[^>]*>/g, '');
    }

    // Limpiar summary
    const summary = data.summary
      ? data.summary.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim()
      : '';

    res.json({
      title: data.title,
      img: data.image,
      category: data.dishTypes?.[0] || 'Receta',
      time: `${data.readyInMinutes} min`,
      portions: `${data.servings} porciones`,
      ingredients: data.extendedIngredients.map(i => i.original),
      instructions,
      summary,
      healthScore: data.healthScore,
      vegetarian: data.vegetarian,
      vegan: data.vegan,
      glutenFree: data.glutenFree,
      dairyFree: data.dairyFree,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener la receta' });
  }
});


// Agregar favorito
app.post('/favoritos', (req, res) => {
  if (!req.session.usuario) return res.status(401).send({ mensaje: 'No autenticado' });

  const {
    recipeId, titulo, imagen, categoria,
    tiempo, porciones, ingredientes,
    instrucciones, resumen,
    vegetariano, vegano, sinGluten, sinLacteos
  } = req.body;

  const usuarioId = req.session.usuario.id;

  const sql = `
    INSERT IGNORE INTO PlatillosFavoritos
      (UsuarioID, RecipeID, Titulo, Imagen, Categoria, Tiempo, Porciones,
       Ingredientes, Instrucciones, Resumen, Vegetariano, Vegano, SinGluten, SinLacteos)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conexion.query(sql, [
    usuarioId, recipeId, titulo, imagen, categoria,
    tiempo, porciones,
    JSON.stringify(ingredientes),
    instrucciones, resumen,
    vegetariano ? 1 : 0,
    vegano ? 1 : 0,
    sinGluten ? 1 : 0,
    sinLacteos ? 1 : 0
  ], (error) => {
    if (error) { console.log(error); return res.status(500).send({ mensaje: 'Error al guardar' }); }
    res.send({ mensaje: 'Agregado a favoritos' });
  });
});

// Quitar favorito
app.delete('/favoritos/:recipeId', (req, res) => {
  if (!req.session.usuario) return res.status(401).send({ mensaje: 'No autenticado' });

  const usuarioId = req.session.usuario.id;
  const { recipeId } = req.params;

  conexion.query(`DELETE FROM PlatillosFavoritos WHERE UsuarioID = ? AND RecipeID = ?`,
    [usuarioId, recipeId], (error) => {
      if (error) return res.status(500).send({ mensaje: 'Error al eliminar' });
      res.send({ mensaje: 'Eliminado de favoritos' });
    });
});

// Obtener favoritos del usuario
app.get('/favoritos', (req, res) => {
  if (!req.session.usuario) return res.status(401).send({ mensaje: 'No autenticado' });

  conexion.query(
    `SELECT * FROM PlatillosFavoritos WHERE UsuarioID = ?`,
    [req.session.usuario.id],
    (error, resultados) => {
      if (error) return res.status(500).send({ mensaje: 'Error' });
      res.send(resultados);
    }
  );
});

app.get('/favoritos-vista', (req, res) => {
  if (!req.session.usuario) return res.redirect('/login');

  conexion.query(
    `SELECT * FROM PlatillosFavoritos WHERE UsuarioID = ?`,
    [req.session.usuario.id],
    (error, favoritos) => {
      if (error) { console.log(error); return res.redirect('/'); }

      // Parsear ingredientes de JSON string a array
      const favoritosParsed = favoritos.map(f => ({
        ...f,
        Ingredientes: f.Ingredientes ? JSON.parse(f.Ingredientes) : []
      }));

      res.render('favoritos', {
        usuario: req.session.usuario,
        favoritos: favoritosParsed
      });
    }
  );
});

app.post('/valoracion', (req, res) => {
  const { estrellas } = req.body;

  if (!estrellas || estrellas < 1 || estrellas > 5) {
    return res.status(400).send({ mensaje: 'Valoración inválida' });
  }

  conexion.query(
    `INSERT INTO Valoraciones (Estrellas) VALUES (?)`,
    [estrellas],
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ mensaje: 'Error al guardar valoración' });
      }
      res.send({ mensaje: 'Valoración guardada' });
    }
  );
});

// =========================
// REGISTRO
// =========================
app.post('/register', async (req, res) => {
  const { NombreUsuario, Correo, Contrasena } = req.body;

  try {
    const passwordHash = await bcrypt.hash(Contrasena, 10);

    const sql = `
      INSERT INTO Usuarios (NombreUsuario, Correo, Contrasena)
      VALUES (?, ?, ?)
    `;

    conexion.query(sql, [NombreUsuario, Correo, passwordHash], (error, resultado) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ mensaje: 'Error al registrar usuario' });
      }
      res.send({ mensaje: 'Usuario registrado correctamente' });
    });

  } catch (error) {
    res.status(500).send({ mensaje: 'Error del servidor' });
  }
});

// =========================
// LOGIN
// =========================
app.post('/login', (req, res) => {
  const { Correo, Contrasena } = req.body;
  const sql = `SELECT * FROM Usuarios WHERE Correo = ?`;

  conexion.query(sql, [Correo], async (error, resultados) => {
    if (error) return res.status(500).send({ mensaje: 'Error del servidor' });
    if (resultados.length === 0) return res.status(401).send({ mensaje: 'Usuario no encontrado' });

    const usuario = resultados[0];
    const passwordCorrecta = await bcrypt.compare(Contrasena, usuario.Contrasena);
    if (!passwordCorrecta) return res.status(401).send({ mensaje: 'Contraseña incorrecta' });

    // Guardar sesión
    req.session.usuario = {
      id: usuario.UsuarioID,
      nombre: usuario.NombreUsuario,
      correo: usuario.Correo
    };

    res.send({
      mensaje: 'Login correcto',
      usuario: usuario.Correo,
      id_usuario: usuario.UsuarioID
    });
  });
});

// Cerrar sesión
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


// =========================
// VER PLATILLOS
// =========================
app.get('/platillos', (req, res) => {

    const sql = `
        SELECT * FROM Platillos
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {

            return res.status(500).send({
                mensaje: 'Error al obtener platillos'
            });

        }

        res.send(resultados);

    });

});


// =========================
// AGREGAR A FAVORITOS
// =========================
app.post('/favoritos', (req, res) => {

    const { id_usuario, id_platillo } = req.body;

    const sql = `
        INSERT INTO Favoritos(id_usuario, id_platillo)
        VALUES (?, ?)
    `;

    conexion.query(
        sql,
        [id_usuario, id_platillo],
        (error, resultado) => {

            if (error) {

                console.log(error);

                return res.status(500).send({
                    mensaje: 'Error al agregar favorito'
                });

            }

            res.send({
                mensaje: 'Platillo agregado a favoritos'
            });

        }
    );

});


// =========================
// VER FAVORITOS DEL USUARIO
// =========================
app.get('/favoritos/:id_usuario', (req, res) => {

    const id_usuario = req.params.id_usuario;

    const sql = `
        SELECT
            Favoritos.id_favorito,
            Platillos.*
        FROM Favoritos
        INNER JOIN Platillos
            ON Favoritos.id_platillo = Platillos.id_platillo
        WHERE Favoritos.id_usuario = ?
    `;

    conexion.query(sql, [id_usuario], (error, resultados) => {

        if (error) {

            return res.status(500).send({
                mensaje: 'Error al obtener favoritos'
            });

        }

        res.send(resultados);

    });

});
// =========================
// DETALLE DE PLATILLO
// =========================
app.get('/platillos/:id', (req, res) => {

    const idPlatillo = req.params.id;

    // =========================
    // CONSULTA PLATILLO
    // =========================
    const sqlPlatillo = `
        SELECT *
        FROM Platillos
        WHERE id_platillo = ?
    `;

    conexion.query(sqlPlatillo, [idPlatillo], (error, resultadoPlatillo) => {

        if (error) {

            return res.status(500).send({
                mensaje: 'Error al obtener platillo'
            });

        }

        // VALIDAR EXISTENCIA
        if (resultadoPlatillo.length === 0) {

            return res.status(404).send({
                mensaje: 'Platillo no encontrado'
            });

        }

        // =========================
        // CONSULTA INGREDIENTES
        // =========================
        const sqlIngredientes = `
            SELECT
                id_ingrediente,
                ingrediente,
                order_ingrediente
            FROM Ingredientes
            WHERE id_platillo = ?
            ORDER BY order_ingrediente ASC
        `;

        conexion.query(sqlIngredientes, [idPlatillo], (error, resultadoIngredientes) => {

            if (error) {

                return res.status(500).send({
                    mensaje: 'Error al obtener ingredientes'
                });

            }

            // =========================
            // CONSULTA PREPARACION
            // =========================
            const sqlPreparacion = `
                SELECT
                    id_instruccion,
                    instruccion,
                    order_preparacion
                FROM Preparacion
                WHERE id_platillo = ?
                ORDER BY order_preparacion ASC
            `;

            conexion.query(sqlPreparacion, [idPlatillo], (error, resultadoPreparacion) => {

                if (error) {

                    return res.status(500).send({
                        mensaje: 'Error al obtener preparación'
                    });

                }

                // =========================
                // RESPUESTA FINAL
                // =========================
                const detallePlatillo = {
                    platillo: resultadoPlatillo[0],
                    ingredientes: resultadoIngredientes,
                    preparacion: resultadoPreparacion
                };

                res.send(detallePlatillo);

            });

        });

    });

});

// =========================
// SERVIDOR
// =========================
app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
