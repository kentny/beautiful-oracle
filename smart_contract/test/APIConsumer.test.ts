import { ethers } from 'hardhat'
import { expect } from 'chai'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs'
import { stringToBytes32 } from '../scripts/parser'
import { APIConsumer__factory } from '../typechain-types/factories/contracts'

describe('APIConsumer', () => {
    // let owner
    // let otherAccount
    // let APIConsumer: APIConsumer__factory

    async function deployAPIConsumerFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners()

        const APIConsumer = await ethers.getContractFactory('APIConsumer')
        const apiConsumer = await APIConsumer.deploy(
            '0x123456789abcdef123456789abcdef123456789a',
            '0x123456789abcdef123456789abcdef123456789a',
            stringToBytes32('ca98366cc7314957b8c012c72f05aeeb')
        )

        return { apiConsumer, owner, otherAccount }
    }

    // beforeEach(async () => {
    //     ;[owner, otherAccount] = await ethers.getSigners()

    //     APIConsumer = await ethers.getContractFactory('APIConsumer')
    // })

    describe('Events', function () {
        it('Should emit an event on call()', async function () {
            const { apiConsumer } = await loadFixture(deployAPIConsumerFixture)

            await expect(apiConsumer.call()).to.emit(apiConsumer, 'MyTestEmitMessage')
        })

        // xit('Should emit an event on requestAPI', async function () {
        //     const { apiConsumer } = await loadFixture(deployAPIConsumerFixture)

        //     // await expect(apiConsumer.requestAPI('http://example.com/foo', 'message')).to.emit(apiConsumer, 'MyTestEmitMessage')
        //     // await expect(lock.withdraw()).to.emit(lock, 'Withdrawal').withArgs(lockedAmount, anyValue) // We accept any value as `when` arg
        //     await expect(apiConsumer.requestAPI('http://example.com/foo', 'message')).to.emit(apiConsumer, 'MyTestEmitMessage')
        // })
    })
})

// import { ethers } from 'hardhat'
// import { expect } from 'chai'
// import { stringToBytes32 } from '../scripts/parser'
// import { APIConsumer__factory } from '../typechain-types/factories/contracts'
// import { LinkToken } from '../typechain-types/@chainlink/token/contracts/v0.4'
// import { LinkToken__factory } from '../typechain-types/factories/@chainlink/token/contracts/v0.4'

// const utils = ethers.utils

// describe('APIConsumer', () => {
//     let owner
//     let otherAccount
//     let apiConsumer: APIConsumer__factory

//     before(async () => {
//         ;[owner, otherAccount] = await ethers.getSigners()

//         const APIConsumer = await ethers.getContractFactory('APIConsumer')
//         const apiConsumer = await APIConsumer.deploy(

//         )
//     })

//     // let apiConsumer: APIConsumer
//     // let linkToken: LinkToken
//     // let mockOracle: MockOracle

//     beforeEach(async () => {
//         await deployments.fixture(['mocks', 'api'])
//         linkToken = await ethers.getContract('LinkToken')
//         const linkTokenAddress: string = linkToken.address
//         apiConsumer = await ethers.getContract('APIConsumer')
//         mockOracle = await ethers.getContract('MockOracle')

//         await run('fund-link', {
//             contract: apiConsumer.address,
//             linkaddress: linkTokenAddress,
//         })
//     })

//     it(`Should successfully make an API request`, async () => {
//         await expect(apiConsumer.requestVolumeData()).to.emit(apiConsumer, 'ChainlinkRequested')
//     })
// })
