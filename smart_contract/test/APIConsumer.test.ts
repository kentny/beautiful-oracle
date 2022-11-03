import { ethers } from 'hardhat'
import { expect } from 'chai'
import { stringToBytes32 } from '../scripts/parser'
import { APIConsumer__factory } from '../typechain-types/factories/contracts'

const utils = ethers.utils

describe('APIConsumer', () => {
    let owner
    let otherAccount
    let APIConsumer: APIConsumer__factory

    beforeEach(async () => {
        ;[owner, otherAccount] = await ethers.getSigners()

        APIConsumer = await ethers.getContractFactory('APIConsumer')
    })

    describe('Deploy', () => {
        it('Should set Chainlink JobId', async () => {
            const apiConsumer = await APIConsumer.deploy(
                '0x123456789abcdef123456789abcdef123456789a',
                '0x123456789abcdef123456789abcdef123456789a',
                stringToBytes32('ca98366cc7314957b8c012c72f05aeeb')
            )

            const actualJobId = await apiConsumer.jobId()
            expect(actualJobId.toLowerCase()).to.equal('0x6361393833363663633733313439353762386330313263373266303561656562')
        })

        it('Should set Chainlink oracle contract address', async () => {
            const apiConsumer = await APIConsumer.deploy(
                '0x123456789abcdef123456789abcdef123456789a',
                '0x123456789abcdef123456789abcdef123456789a',
                '0x0000000000000000000000000000000000000000000000000000000000000064'
            )

            const actualAddress = await apiConsumer.oracleAddress()
            expect(actualAddress.toLowerCase()).to.equal('0x123456789abcdef123456789abcdef123456789a')
        })
    })

    describe('setUrl', () => {
        it('Should set Web API URL through setUrl()', async () => {
            const apiConsumer = await APIConsumer.deploy(
                '0x123456789abcdef123456789abcdef123456789a',
                '0x123456789abcdef123456789abcdef123456789a',
                '0x0000000000000000000000000000000000000000000000000000000000000064'
            )

            await apiConsumer.setUrl('http://example.com/sample')

            const actualUrl = await apiConsumer.url()
            expect(actualUrl).to.equal('http://example.com/sample')
        })
    })
})
