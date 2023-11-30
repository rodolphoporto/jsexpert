'use strict';

const assert = require('assert');

// garantir semantica e segurança em objetos

// ---- apply
const myObj = {
    add(myValue) {
        return this.arg1 + this.arg2 + myValue;
    }
}

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!'); };

// esse aqui pode acontecer!
myObj.add.apply = function () { throw new TypeError('Eita!'); };

assert.throws(() => myObj.add.apply({}, []), {
    name: "TypeError",
    message: "Eita!"
});

// usando reflect
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);
// ---- apply

// ---- defineProperty

// questoes semanticas
function MyDate() {}

// feio pra kct, tudo é Object, mas Object adicionando propriedades em funções?
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' });

// agora faz mais sentido
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' });

assert.deepStrictEqual(MyDate.withObject(), 'Hey there');
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude');
// ---- defineProperty

// ---- deleteProperty
const withDelete = { user: 'Suissa' };
// imperformático, evitar ao máximo
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflection = { user: 'Valeria Chata' };
Reflect.deleteProperty(withReflection, 'user');
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false);

// ---- deleteProperty

// ---- get

// Deveriamos fazer um get somente em instâncias de referência
assert.deepStrictEqual(1['userName'], undefined);
// com reflection, uma exceção é lançada!
assert.throws(() => Reflect.get(1, 'userName'), TypeError);

// ---- get

// ---- has

assert.ok('superman' in { superman: '' });
assert.ok(Reflect.has({ batman: '' }, 'batman'));

// ---- has

// ---- ownKeys
const user = Symbol('user');
const databaseUser = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'suissa'
}

// Com os metodos de object, temos que fazer 2 requisicoes
const objectKeys = [
    ...Object.getOwnPropertyNames(databaseUser),
    ...Object.getOwnPropertySymbols(databaseUser)
];
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);
// console.log(objectKeys);

assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user]);