const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "root",
    database: "bdnoder",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Conectado a la base de datos MySQL");
});



app.get("/api/producto", (req, res) => {
    const sql = "SELECT * FROM producto";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Crear un nuevo usuario
app.post("/api/producto", (req, res) => {
    const { nombre, precio, cantidad } = req.body;
    const sql =
        "INSERT INTO producto (nombre, precio, cantidad) VALUES (?, ?, ?)";
    db.query(sql, [nombre, precio, cantidad], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, nombre, precio, cantidad });
    });
});

// Actualizar un usuario
app.put("/api/producto/:id", (req, res) => {
    const { nombre, precio, cantidad } = req.body;
    const { id } = req.params;
    const sql =
        "UPDATE producto SET nombre = ?, precio = ?, cantidad = ? WHERE id_producto = ?";
    db.query(sql, [nombre, precio, cantidad, id], (err, result) => {
        if (err) throw err;
        res.send({ id, nombre, precio, cantidad });
    });
});

// Eliminar un usuario
app.delete("/api/producto/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM producto WHERE id_producto = ?";
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: "Producto eliminado", id });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
