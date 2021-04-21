const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123",
  database: "conceptron",
  port: "5432",
});

const getProjetos = async (req, res) => {
  const response = await pool.query("SELECT * FROM projetos ORDER BY id ASC");
  res.status(200).json(response.rows);
};

const getProjetosPorId = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query("SELECT * FROM projetos WHERE id = $1", [
    id,
  ]);
  res.json(response.rows);
};

const createProjeto = async (req, res) => {
  const {
    tx_nome,
    dt_modificacao,
    nr_comadas,
    nr_entrada,
    nr_escondida,
    nr_saida,
    nr_funcaoativacao,
    fl_softmax,
  } = req.body;
  const response = await pool.query(
    "INSERT INTO projetos (tx_nome, dt_modificacao, nr_comadas, nr_entrada, nr_escondida, nr_saida, nr_funcaoativacao, fl_softmax) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      tx_nome,
      dt_modificacao,
      nr_comadas,
      nr_entrada,
      nr_escondida,
      nr_saida,
      nr_funcaoativacao,
      fl_softmax,
    ]
  );

  res.json({
    message: "Projeto Criado com Sucesso",
    body: {
      movies: {
        tx_nome,
        dt_modificacao,
        nr_comadas,
        nr_entrada,
        nr_escondida,
        nr_saida,
        nr_funcaoativacao,
        fl_softmax,
      },
    },
  });
};

const updateProjeto = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    tx_nome,
    dt_modificacao,
    nr_comadas,
    nr_entrada,
    nr_escondida,
    nr_saida,
    nr_funcaoativacao,
    fl_softmax,
  } = req.body;

  const response = await pool.query(
    "UPDATE projetos SET tx_nome = $1, dt_modificacao = $2, nr_comadas = $3, nr_entrada = $4, nr_escondida = $5, nr_saida = $6, nr_funcaoativacao = $7, fl_softmax = $8 WHERE id = $9",
    [
      tx_nome,
      dt_modificacao,
      nr_comadas,
      nr_entrada,
      nr_escondida,
      nr_saida,
      nr_funcaoativacao,
      fl_softmax,
      id,
    ]
  );
  res.json("Projeto Alterado com Sucesso");
};

const deleteProjeto = async (req, res) => {
  const id = parseInt(req.params.id);
  await pool.query("DELETE FROM projetos where id = $1", [id]);
  res.json(`Projeto ${id} excluido com sucesso`);
};

module.exports = {
  getProjetos,
  getProjetosPorId,
  createProjeto,
  updateProjeto,
  deleteProjeto,
};
