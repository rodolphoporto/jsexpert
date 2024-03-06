# Em vez de usar a última imagem do postgres, vou usar a versão 12 para evitar o erro abaixo:
# popen failure: Cannot allocate memory
# initdb: error: program "postgres" is needed by initdb but was not found in the same directory as "/usr/lib/postgresql/16/bin/initdb"

docker run \
    --name postgres \
    -e POSTGRES_USER=rporto \
    -e POSTGRES_PASSWORD="senha0001" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres:12-bullseye

docker logs postgres
docker exec -it postgres psql --username rporto --dbname heroes

create table warriors(id serial primary key, name varchar(255) not null);
select * from warriors;
delete from warriors where id=2;

# mongodb
docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=rporto \
    -e MONGO_INITDB_ROOT_PASSWORD="senha0001" \
    -p 27017:27017 \
    -d \
    mongo:4

docker logs mongodb
