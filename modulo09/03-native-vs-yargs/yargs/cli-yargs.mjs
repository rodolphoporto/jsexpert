#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() })
const { argv } = yargs(hideBin(process.argv))
.command('createHero', 'create a hero', (builder) => {
    return builder
        .option('name', {
            alias: 'n',
            demandOption: true,
            describe: 'hero name',
            type: 'string'
        })
        .option('age', {
            alias: 'a',
            demandOption: true,
            describe: 'hero age',
            type: 'number'
        })
        .option('power', {
            alias: 'p',
            demandOption: true,
            describe: 'hero power',
            type: 'string'
        })
        .example('createHero --name "Batman" --age 30 --power "money"', 'create a hero')
        .example('createHero -n "Batman" -a 30 -p "money"', 'create a hero')
})
.epilog('copyrigth 2024 - Rodolpho Porto Corporation')
console.log(hero(argv))