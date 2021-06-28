const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const getProjetos = async (req, res) => {
  const response = await pool.query("SELECT * FROM projetos ORDER BY id DESC");
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
    nr_camadas,
    nr_entrada,
    nr_escondida,
    nr_saida,
    nr_funcaoativacao,
    fl_softmax,
  } = req.body;
  const response = await pool.query(
    "INSERT INTO projetos (tx_nome, dt_modificacao, nr_camadas, nr_entrada, nr_escondida, nr_saida, nr_funcaoativacao, fl_softmax) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      tx_nome,
      dt_modificacao,
      nr_camadas,
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
        nr_camadas,
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
    nr_camadas,
    nr_entrada,
    nr_escondida,
    nr_saida,
    nr_funcaoativacao,
    fl_softmax,
  } = req.body;

  const response = await pool.query(
    "UPDATE projetos SET nr_camadas = $1, nr_entrada = $2, nr_escondida = $3, nr_saida = $4, nr_funcaoativacao = $5, fl_softmax = $6 WHERE id = $7",
    [
      nr_camadas,
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
