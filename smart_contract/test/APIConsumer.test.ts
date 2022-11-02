import { ethers } from 'hardhat'
import { expect } from 'chai'
import { stringToBytes32 } from '../scripts/parser'

const utils = ethers.utils

describe('APIConsumer', () => {
    describe('Deploy', () => {
        it('Should set Chainlink JobId', async () => {
            const [owner, otherAccount] = await ethers.getSigners()

            const APIConsumer = await ethers.getContractFactory('APIConsumer')
            const apiConsumer = await APIConsumer.deploy(
                '0x123456789abcdef123456789abcdef123456789a',
                '0x123456789abcdef123456789abcdef123456789a',
                stringToBytes32('ca98366cc7314957b8c012c72f05aeeb')
            )

            const actualJobId = await apiConsumer.jobId()
            expect(actualJobId.toLowerCase()).to.equal('0x6361393833363663633733313439353762386330313263373266303561656562')
        })

        it('Should set Chainlink oracle contract address', async () => {
            const [owner, otherAccount] = await ethers.getSigners()

            const APIConsumer = await ethers.getContractFactory('APIConsumer')
            const apiConsumer = await APIConsumer.deploy(
                '0x123456789abcdef123456789abcdef123456789a',
                '0x123456789abcdef123456789abcdef123456789a',
                '0x0000000000000000000000000000000000000000000000000000000000000064'
            )

            const actualAddress = await apiConsumer.oracleAddress()
            expect(actualAddress.toLowerCase()).to.equal('0x123456789abcdef123456789abcdef123456789a')
        })
    })
})
