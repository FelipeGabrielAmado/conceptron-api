CREATE DATABASE conceptron;


CREATE TABLE projetos (
    id SERIAL PRIMARY KEY,
    tx_nome VARCHAR(255),
    dt_modificacao timestamp,
    nr_comadas numeric(9,0),
    nr_entrada numeric(9,0),
    nr_escondida numeric(9,0),
    nr_saida numeric(9,0),
    nr_funcaoativacao numeric(9,0),
    fl_softmax varchar(1)
);
