const { describe, it } = require('mocha');
const { expect } = require('chai');
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI');
const mock = require('./mock/valid');

describe('TextProcessorFAPI', () => { 
    it('#build', () => {
        const result = new TextProcessorFluentAPI(mock)
            .build()
        expect(result).to.be.deep.equal(mock)
    })
    it ('#extractPeopleData', () => {
        // ?<= fala que vai extrair os dados que virao depois desse grupo
        // ?<=[contratante|contratada] ou um ou outro, (e tem a flag no fim da expressao pra pegar maiusculo e minusculo)
        // :\s{1} vai procurar o caracter literal do dois pontos seguindo de um espaço
        // tudo acima fica dentro de um parenteses para falar "vamos pegar daí para frente"

        // {?!} negative look around, vai ignorar os contratantes do fim do documento (que tem só espaço a frente deles)
        // .*\n pega qualquer coisa até o primeiro \n
        // .*? non greety, esse ? faz com ele pare na primeira recorrencia, assim ele evita ficar em loop
        
        // $ informar que a pesquisa acaba no fim da linha
        // g -> global
        // m -> multiline
        // i -> case insensitive


        const result = new TextProcessorFluentAPI(mock)
            .extractPeopleData()
            .build()
        
        const expected = [
            [
                "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
                "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. "
            ].join("\n"),
            [
                "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
                "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. "
            ].join("\n"),
        ]

        expect(result).to.be.deep.equal(expected)
    })

    it('#divideTextInColumns', () => {
        const content = [
            [
                "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
                "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. "
            ].join("\n"),            
        ]

        const result = new TextProcessorFluentAPI(content)
            .divideTextInColumns()
            .build()
        
            const expected = [
                [
                    "Xuxa da Silva",
                    " brasileira",
                    " casada",
                    " CPF 235.743.420-12",
                    " residente e \ndomiciliada a Rua dos bobos",
                    " zero",
                    " bairro Alphaville",
                    " São Paulo. "
                ]
            ]

            expect(result).to.be.deep.equal(expected)
    })

    it('#removeEmptyCharacters', () => {
        const content = [
            [
                "Xuxa da Silva",
                " brasileira",
                " casada",
                " CPF 235.743.420-12",
                " residente e \ndomiciliada a Rua dos bobos",
                " zero",
                " bairro Alphaville",
                " São Paulo. "
            ]
        ]

        const result = new TextProcessorFluentAPI(content)
            .removeEmptyCharacters()
            .build()
        
        const expected = [
            [
                "Xuxa da Silva",
                "brasileira",
                "casada",
                "CPF 235.743.420-12",
                "residente e domiciliada a Rua dos bobos",
                "zero",
                "bairro Alphaville",
                "São Paulo."
            ]
        ]

        expect(result).to.be.deep.equal(expected)
    })

})