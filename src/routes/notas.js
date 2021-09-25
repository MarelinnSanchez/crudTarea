const { Router } = require("express");

let currenId = 0;
let notasLista = [];

function notasApi(app) {
  const router = Router();
  app.use("/notas", router);

  // Para traer todos los registros
  router.get("/todo", (req, res) => {
    res.json({ notas: notasLista });
  });

  //Crear un registro
  router.post("/alta", (req, res) => {
    const { body: notasInfo } = req;
    const newId = currenId++;
    const nuevaNota = { _id: newId, ...notasInfo };
    notasLista.push(nuevaNota);
    res.json({ message: "Nueva Nota" });
  });

  //Traer una nota en base a su id
  router.get("/traeUno/:_id", (req, res) => {
    const { _id } = req.params;
    const notas = notasLista.find((notas) => String(notas._id) === _id);
    res.json(notas);
  });

  //Modificar/actualizar una nota
  router.put("/actualizar/:_id", (req, res) => {
    const { _id } = req.params;
    const { body: newNota } = req;
    const notaIndex = notasLista.findIndex(
      (notas) => String(notas._id) === _id
    );
    notasLista[notaIndex] = { ...notasLista[notaIndex], ...newNota };
    res.json(notasLista[notaIndex]);
  });

  //Eliminar una nota
  router.delete("/eliminar/:_id", (req, res) => {
    const { _id } = req.params;
    const deleteNota = notasLista.filter((notas) => String(notas._id) !== _id);
    notasLista = deleteNota;
    res.json({ message: "Nota Eliminada" });
  });
}
module.exports = notasApi;
