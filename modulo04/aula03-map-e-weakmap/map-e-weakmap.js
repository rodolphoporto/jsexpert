const assert = require('assert');
const myMap = new Map();

// podem ter qualquer tipo de chave
myMap
    .set(1, 'one')
    .set('Rodolpho', { text: 'two' })
    .set(true, () => 'hello');

// console.log(myMap.get('Rodolpho'));

// usando um constructor
const myMapWithConstructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
]);

// console.log('myMap', myMap);
// console.log('myMap.get(1)', myMap.get(1));
assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Rodolpho'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// Em Objects a chave só pode ser string ou symbol (number é coergido para string)
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: 'Rodolpho' });

// console.log('get', myMap.get(onlyReferenceWorks));
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Rodolpho' });

// utilitários
// - No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se nao existe = undefined
// if() = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({ name: 'Rodolpho' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks));

// para remover um item do objeto
// delete item.id
// imperformático para o JS
assert.ok(myMap.delete(onlyReferenceWorks));

// Não dá para iterar em Objects diretamente
// tem que transformar com Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), '[[1,"one"],["Rodolpho",{"text":"two"}],[true,null]]');

// for (const [key, value] of myMap) {
//     console.log({ key, value });
// }

// Object é inseguro, pois dependendo da chave, pode substituir um comportamento padrao
// ({ }).toString() === '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'

// qualquer chave pode colidir, com as propriedades herdadas do objeto, como
// constructor, toString, valueOf e etc.

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'

}

// nao tem restricao de nome de chave
myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// Nao da para limpar um Object sem reassina-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

/// --- WeakeMap


// Pode ser coletado após perder as referencias
// usado em casos bem especificos

// tem a vantagem de ser mais performatico
// e nao precisa se preocupar com memory leak
// keys precisam ser objetos
// só tem metodos set, get, has e delete

// tem a maioria dos beneficios do Map
// MAS: não é iteravel
// Só chaves de referencia e que voce já conheça
// mais leve e preve leak de memoria, pq depois que as instancias saem da memoria, tudo é limpo

const weakMap = new WeakMap();
const hero = { name: 'Flash' };

// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.has(hero);
// weakMap.delete(hero);




