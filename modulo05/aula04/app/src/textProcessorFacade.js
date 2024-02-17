const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI')

class TextProcessorFacade {
    #textProcessorFluentAPI
    constructor() {
        this.#textProcessorFluentAPI = new TextProcessorFluentAPI()
    }

    getPeopleFromPDF() {
        return this.#textProcessorFluentAPI
            .extractPeopleData()
            .divideTextInColumns()
            .removeEmptyCharacters()
            .mapPerson()
            .build()
    }
}

module.export = TextProcessorFacade