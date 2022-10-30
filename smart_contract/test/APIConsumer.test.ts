import { ethers } from 'hardhat'
import { expect } from 'chai'

describe('APIConsumer', () => {
    describe('Deploy', () => {
        it('Should set Chainlink JobId', async () => {
            const [owner, otherAccount] = await ethers.getSigners()

            const APIConsumer = await ethers.getContractFactory('APIConsumer')
            const apiConsumer = await APIConsumer.deploy(
                '0x123456789abcdef123456789abcdef123456789a',
                '0x0000000000000000000000000000000000000000000000000000000000000064'
            )

            const actualJobId = await apiConsumer.jobId()
            expect(actualJobId.toLowerCase()).to.equal('0x0000000000000000000000000000000000000000000000000000000000000064')
        })

        it('Should set Chainlink oracle contract address', async () => {
            const [owner, otherAccount] = await ethers.getSigners()

            const APIConsumer = await ethers.getContractFactory('APIConsumer')
            const apiConsumer = await APIConsumer.deploy(
                '0x123456789abcdef123456789abcdef123456789a',
                '0x0000000000000000000000000000000000000000000000000000000000000000'
            )

            const actualAddress = await apiConsumer.oracleAddress()
            expect(actualAddress.toLowerCase()).to.equal('0x123456789abcdef123456789abcdef123456789a')
        })
    })
})
