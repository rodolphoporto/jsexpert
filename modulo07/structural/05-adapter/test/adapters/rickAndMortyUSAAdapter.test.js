import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA'
import RickAndMortyUSAAdapter from '../../src/business/adapter/rickAndMortyUSAAdapter'


describe('RickAndMortyUSAAdapter', () => {
    beforeEach(() => jest.clearAllMocks())
    test('#getCharacters should be an adapter for RickAndMortyUSA.getCharactersJSON', async () => {
        const usaIntegration = jest.spyOn(
            RickAndMortyUSA,
            RickAndMortyUSA.getCharactersFromXML.name
        ).mockResolvedValue([])

        const result = await RickAndMortyUSAAdapter.getCharacters()
        expect(result).toEqual([])

        expect(usaIntegration).toHaveBeenCalledTimes(1)
    })
})