import { expect } from 'chai'
import { stringToBytes32 } from '../scripts/parser'

describe('parser', () => {
    it('should return bytes32 string', () => {
        const inputText = 'ca98366cc7314957b8c012c72f05aeeb'
        const actualBytes32String = stringToBytes32(inputText)

        expect(actualBytes32String).to.equal('0x6361393833363663633733313439353762386330313263373266303561656562')
    })
})
