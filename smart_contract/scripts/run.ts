require('@nomiclabs/hardhat-ethers')
// const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3' //contract address
const contractAddress = '0x8f3a481edf29171b75E1d90b99ec9065ff9fDFF5' //contract address

import { ethers } from 'hardhat'

const main = async () => {
    const Contract = await ethers.getContractFactory('APIConsumer') // Contractの名前
    const contract = await Contract.attach(contractAddress)
    console.log('deployed to:', contract.address)

    console.log('setUrl')
    await contract.setUrl('https://jsonplaceholder.typicode.com/posts/1')

    // await contract.requestAPI('body')
}

main()
