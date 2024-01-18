// o objetivo do Fluent API é executar tarefas
// como uma pipeline, step by step
// e no fim, chama o build. MUITO similar ao padrao Builder
// a diferença que aqui é sobre processos, o Builder sobre construção
// de objetos
class TextProcessorFluentAPI {
    // propriedade privada!
    #content

    constructor(content) {
        this.#content = content
    }
    extractPeopleData() {
        const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi
        // faz o match para encontrar a string inteira que contem os dados que precisamos
        const onlyPerson = this.#content.match(matchPerson)
        // console.log('onlyPerson', matchPerson.test(this.#content))
        this.#content = onlyPerson

        return this
    }
    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI