create database acme;
use acme;

create table if not exists actors (
  id int,
  firstName varchar(30),
  lastName varchar(50),
  lastUpdate varchar(20),
  shard key(id) using clustered columnstore
);


-- Load data sample
LOAD DATA INFILE '/mnt/data/payload-0.avro'
  INTO TABLE actors
  FORMAT AVRO
  ( id <- %::id,
  firstName <- %::firstName,
  lastName <- %::lastName,
  lastUpdate <- %::lastUpdate );

select * from actors;


-- Pipelines sample
CREATE OR REPLACE PIPELINE actors_pipeline AS
  LOAD DATA FS '/mnt/data/payload-*.avro'
  INTO TABLE actors
  FORMAT AVRO
  ( id <- %::id,
  firstName <- %::firstName,
  lastName <- %::lastName,
  lastUpdate <- %::lastUpdate );


test pipeline actors_pipeline;

start pipeline actors_pipeline;

select * from information_schema.PIPELINES_BATCHES_SUMMARY;
select * from information_schema.PIPELINES_ERRORS;

select * from actors;
