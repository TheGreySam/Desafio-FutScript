CREATE DATABASE futscript;
\c futscript;

CREATE TABLE equipos (id SERIAL PRIMARY KEY, name VARCHAR(250) NOT NULL);

CREATE TABLE posiciones (id SERIAL PRIMARY KEY, name VARCHAR(250) NOT NULL);

CREATE TABLE jugadores (id SERIAL PRIMARY KEY, id_equipo INT REFERENCES equipos(id), name VARCHAR(250), position INT REFERENCES posiciones(id));

CREATE TABLE usuarios (email VARCHAR(250) NOT NULL, password VARCHAR(250) NOT NULL)

INSERT INTO posiciones values
(DEFAULT, 'delantero'),
(DEFAULT, 'centrocampista'),
(DEFAULT, 'defensa'),
(DEFAULT, 'portero');

INSERT INTO usuarios values
('admin', '1234')

INSERT INTO equipos (id, name) values
(7 , 'Real Madrid'),
(8 , 'Barcelona')

INSERT INTO jugadores (id, id_equipo, name, position) values
(1, 7, 'Karim Benzema', 'delantero'),
(2, 8, 'Luka Modrić', 'centrocampista')