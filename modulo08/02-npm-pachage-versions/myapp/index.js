// para importar do diretorio use o comando abaixo
// --experimental-specifier-resolution=node
// import FluentSQLBuilder from "./../fluentsql-jest-tdd-yt";
import FluentSQLBuilder from "@rodolpho.porto/fluentsql";

import database from './database/data.json';

const result = FluentSQLBuilder.for(database)
    .where({ registered: /^(2020|2019)/ })
    .select(['name'])
    .limit(3)
    .countBy('name')
    // .groupCount('name')
    .build()

console.log({ result });