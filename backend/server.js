const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const App = express();
App.use(cors());
App.use(express.json())
const puerto = 8085;

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: 'root',
  password: 'admin',
  database: 'catalogo',
})

App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.json());


//CREDENCIALES
App.post('/api/tienda/login', (req, res) => {
  const { usuario, contrasena } = req.body;
  sql = "SELECT *  FROM usuario  WHERE idUsaurio = " + usuario + " AND PassUsuario=" + contrasena + "";

  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB", error);
    } else {
      console.log(result);
      if (result.length > 0) {
        res.json({ success: true, message: "Usuario y Contraseña Correcto" });
      } else {
        res.json({ success: false, message: "Usuario o contraseña Incorrecto" });
      }
    }
  });

});

// OBTENER COLOR

App.get('/api/tienda/', (req, res) => {
  const sql = "SELECT *  FROM color";
  db.query(sql, (error, result) => {
    if (error) return req.json({ message: "no se pudo conectar a tabla" })
    return res.json(result);
  })
})


//REGISTRAR COLOR

App.post("/api/tienda/add", (req, res) => {
  let detalle = {
    NombreColor: req.body.NombreColor,
  };
  let sql = "INSERT INTO color SET ?";
  db.query(sql, detalle, (error) => {
    if (error) {
      res.send({ status: false, message: error.message });
    } else {
      res.send({ status: true, message: "Creación correctas / Tabla Color" });
    }
  });
});

//MOSTRAR DATOS POR ID

App.get("/api/tienda/registo/:idColor", (req, res) => {
  const idColor = req.params.idColor;
  console.log(idColor);
  const sql = "SELECT * FROM color WHERE idColor=" + idColor;
  console.log(sql);
  db.query(sql, [idColor], (error, result) => {
    if (error) {
      console.log("Error Connecting to DB", error.message);
    } else {
      res.send({ status: true, data: result });
    }
  });
});


//UPDATE
App.put("/api/tienda/UpdateColor/:idColor", (req, res) => {
  const idColor = req.params.idColor;
  console.log(idColor);
  const sql = "UPDATE color SET NombreColor='" + req.body.NombreColor + "'WHERE idColor=" + idColor;

  console.log(sql);
  db.query(sql, (error, result) => {
    if (error) {
      console.log("Error Connecting to DB", error.message);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// DELETE
App.delete("/api/tienda/Color/Delete/:idColor", (req, res) => {
  const idColor = req.params.idColor;
  console.log(idColor);
  const sql = "DELETE FROM color WHERE idColor=" + idColor;

  console.log(sql);
  db.query(sql, (error, result) => {
    if (error) {
      console.log("Error Connecting to DB", error.message);
    } else {
      res.send({ status: true, data: result });
    }
  });
});


/////////////// ************************************* TALLLA **********************//////////

App.get('/api/tienda/Talla/', (req, res) => {
  const sql = "SELECT *  FROM talla";
  db.query(sql, (error, result) => {
    if (error) return req.json({ message: "no se pudo conectar a tabla" })
    return res.json(result);
  })
})

// CREAR DATA
App.post("/api/tienda/talla/add", (req, res) => {
  let detalle = {
    NombreTalla: req.body.NombreTalla,
  };
  let sql = "INSERT INTO talla SET ?";
  console.log(sql);
  db.query(sql, detalle, (error) => {
    if (error) {
      res.send({ status: false, message: error.message });
    } else {
      res.send({ status: true, message: "Creación correctas / Tabla Color" });
    }
  });
});

App.put("/api/tienda/UpdateTalla/:idTalla", (req, res) => {
  const idTalla = req.params.idTalla;
  console.log(idTalla);
  const sql = "UPDATE talla SET NombreTalla='" + req.body.NombreTalla + "'WHERE idTalla=" + idTalla;

  console.log(sql);
  db.query(sql, (error, result) => {
    if (error) {
      console.log("Error Connecting to DB", error.message);
    } else {
      res.send({ status: true, data: result });
    }
  });
});


// DELETE
App.delete("/api/tienda/Talla/Delete/:idTalla", (req, res) => {
  const idTalla = req.params.idTalla;
  console.log(idTalla);
  const sql = "DELETE FROM talla WHERE idTalla=" + idTalla;

  console.log(sql);
  db.query(sql, (error, result) => {
    if (error) {
      console.log("Error Connecting to DB", error.message);
    } else {
      res.send({ status: true, data: result });
    }
  });
});


////******************************MARCA****************************** */


App.get('/api/tienda/Marca/', (req, res) => {
  const sql = "SELECT *  FROM marca";
  db.query(sql, (error, result) => {
    if (error) return req.json({ message: "no se pudo conectar a tabla" })
    return res.json(result);
  })
})

// CREAR DATA
App.post("/api/tienda/marca/add", (req, res) => {
  let detalle = {
    NombreMarca: req.body.NombreMarca,
  };
  let sql = "INSERT INTO marca SET ?";
  console.log(sql);
  db.query(sql, detalle, (error) => {
    if (error) {
      res.send({ status: false, message: error.message });
    } else {
      res.send({ status: true, message: "Creación correctas / Tabla Color" });
    }
  });
});

App.put("/api/tienda/Marca/:idMarca", (req, res) => {
  const idMarca = req.params.idMarca;
  console.log(idMarca);
  const sql = "UPDATE marca SET NombreMarca='" + req.body.NombreMarca + "'WHERE idMarca=" + idMarca;

  console.log(sql);
  db.query(sql, (error, result) => {
    if (error) {
      console.log("Error Connecting to DB", error.message);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// DELETE
App.delete("/api/tienda/Marca/Delete/:idMarca", (req, res) => {
  const idMarca = req.params.idMarca;
  console.log(idMarca);
  const sql = "DELETE FROM marca WHERE idMarca=" + idMarca;

  console.log(sql);
  db.query(sql, (error, result) => {
    if (error) {
      console.log("Error Connecting to DB", error.message);
    } else {
      res.send({ status: true, data: result });
    }
  });
});





/////////////////////// ***********  MODELO **********/////

App.put("/api/tienda/Modelo/:idModelo", (req, res) => {
  const idModelo = req.params.idModelo;
  console.log(idModelo);
  const sql = "UPDATE modelo SET NombreModelo='" + req.body.NombreModelo + "'WHERE idModelo=" + idModelo;

  console.log(sql);
  db.query(sql, (error, result) => {
    if (error) {
      console.log("Error Connecting to DB", error.message);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

App.get('/api/tienda/Modelo/', (req, res) => {
  const sql = "SELECT *  FROM modelo";
  db.query(sql, (error, result) => {
    if (error) return req.json({ message: "no se pudo conectar a tabla" })
    return res.json(result);
  })
})

// CREAR DATA
App.post("/api/tienda/modelo/add", (req, res) => {
  let detalle = {
    NombreModelo: req.body.NombreModelo,
  };
  let sql = "INSERT INTO modelo SET ?";
  console.log(sql);
  db.query(sql, detalle, (error) => {
    if (error) {
      res.send({ status: false, message: error.message });
    } else {
      res.send({ status: true, message: "Creación correctas / Tabla Color" });
    }
  });
});

// DELETE
App.delete("/api/tienda/Modelo/Delete/:idModelo", (req, res) => {
  const idModelo = req.params.idModelo;
  console.log(idModelo);
  const sql = "DELETE FROM modelo WHERE idModelo=" + idModelo;

  console.log(sql);
  db.query(sql, (error, result) => {
    if (error) {
      console.log("Error Connecting to DB", error.message);
    } else {
      res.send({ status: true, data: result });
    }
  });
});





/////////////////////// ***********  PRODUCTO **********/////

App.get('/api/tienda/Producto/', (req, res) => {
  const sql = "SELECT *  FROM producto";
  db.query(sql, (error, result) => {
    if (error) return req.json({ message: "no se pudo conectar a tabla" })
    return res.json(result);
  })
})


App.post("/api/tienda/producto/add", (req, res) => {
  let detalle = {
    NombreProducto: req.body.NombreProducto,
    idMarca: req.body.idMarca,
    idModelo: req.body.idModelo,
    idColor: req.body.idColor,
    idTalla: req.body.idTalla,
    imagen: req.body.imagen,
    precioVenta: req.body.precioVenta,
  };
  let sql = "INSERT INTO producto SET ?";
  console.log(sql);
  db.query(sql, detalle, (error) => {
    if (error) {
      res.send({ status: false, message: error.message });
    } else {
      res.send({ status: true, message: "Creación correctas / Tabla Color" });
    }
  });
});

App.put("/api/tienda/UpdateProducto/:idProducto", (req, res) => {
  const idProducto = req.params.idProducto;
  console.log(idProducto);
  const sql = "UPDATE producto SET NombreProducto='" +
    req.body.NombreProducto +
     "', idMarca='"+req.body.idMarca+
     "', idModelo='"+req.body.idModelo+
     "', idColor='"+req.body.idColor+
     "', idTalla='"+req.body.idTalla+
     "', imagen='"+req.body.imagen+
     "', precioVenta='"+req.body.precioVenta+"'WHERE idProducto=" + idProducto;

  console.log(sql);
  db.query(sql, (error, result) => {
    if (error) {
      console.log("Error Connecting to DB", error.message);
    } else {
      res.send({ status: true, data: result });
    }
  });
});


// DELETE
App.delete("/api/tienda/Producto/Delete/:idProducto", (req, res) => {
  const idProducto = req.params.idProducto;
  console.log(idProducto);
  const sql = "DELETE FROM producto WHERE idProducto=" + idProducto;

  console.log(sql);
  db.query(sql, (error, result) => {
    if (error) {
      console.log("Error Connecting to DB", error.message);
    } else {
      res.send({ status: true, data: result });
    }
  });
});





App.listen(puerto, () => {
  console.log("Conexión puerto Correcto");
})


