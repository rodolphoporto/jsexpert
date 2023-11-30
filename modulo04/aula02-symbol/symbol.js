const assert = require('assert');

// --- keys
const uniqueKey = Symbol('userName');
const user = {};

user['userName'] = 'value for normal Objects';
user[uniqueKey] = 'value for Symbol';

// console.log('getting normal Objects value:', user.userName);
// Sempre que for usar o Symbol, deve-se usar o mesmo Symbol
// console.log('getting Symbol value:', user[Symbol('userName')]);
// console.log('getting Symbol value:', user[uniqueKey]);

assert.deepStrictEqual(user.userName, 'value for normal Objects');
assert.deepStrictEqual(user[Symbol('userName')], undefined);
assert.deepStrictEqual(user[uniqueKey], 'value for Symbol');

// é dificil de pegar Symbol, mas não é impossível
// console.log('symbols', Object.getOwnPropertySymbols(user)[0]);
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - má prática (nem tem no codebase do node)
user[Symbol.for('password')] = 123;
assert.deepStrictEqual(user[Symbol.for('password')], 123);
// --- keys

// Well Known Symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        // remove o ultimo item
        value: this.items.pop(),
      };
    },
  }),
};

// for (const item of obj) {
//   console.log('item', item);
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c']);

const kItems = Symbol('kItems')
class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }
    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== "string") throw new TypeError()

        const itens = this[kItems]
                        .map(item => 
                                new Intl
                                    .DateTimeFormat("pt-BR", { month: "long", day: "2-digit", year: "numeric"})
                                    .format(item)
                            )
        
        return new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction"}).format(itens)

        
    }
    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item
        }
    }

    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(r => setTimeout(r, ms))
        for( const item of this[kItems]) {
            await timeout(100)
            yield item.toISOString()
        }
    }
    get [Symbol.toStringTag]() {
        return 'WHAT?'
    }
}


const myDate = new MyDate(
    [2020, 03, 01],
    [2020, 04, 05],
    [2020, 05, 06],
);

const expectedDates = [
    new Date(2020, 03, 01),
    new Date(2020, 04, 05),
    new Date(2020, 05, 06),
];

// console.log('myDate', myDate);
// assert.ok(myDate[kItems][0] instanceof Date);
assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]');
assert.throws(() => myDate + 1, TypeError);

// coercao explicita para chamar toPrimitive
assert.deepStrictEqual(String(myDate), '01 de abril de 2020, 05 de maio de 2020 e 06 de junho de 2020');

// implementar o iterator!
assert.deepStrictEqual([...myDate], expectedDates)

// ;(async() => {
//     for await(const item of myDate) {
//         console.log('asyncIterator', item)
//     }
// })()

;(async () => {
    const dates = await Promise.all([...myDate])
    assert.deepStrictEqual(dates, expectedDates)
})()