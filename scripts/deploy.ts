import { ethers } from 'hardhat'
import 'dotenv/config'

async function main() {
    // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

    // const lockedAmount = ethers.utils.parseEther("1");

    // const Lock = await ethers.getContractFactory("Lock");
    // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    // await lock.deployed();

    // console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
    const APIConsumer = await ethers.getContractFactory('APIConsumer')
    const apiConsumer = await APIConsumer.deploy(process.env.CHAINLINK_ORACLE_ADDRESS!, process.env.CHAINLINK_ORACLE_JOB_ID!)

    await apiConsumer.deployed()

    // console.log(`APIConsumer: ${apiConsumer.jobId}`)
    console.log(`fee: ${await apiConsumer.fee()}`)
    console.log(`jobId: ${await apiConsumer.jobId()}`)
    console.log(`HOGE: ${process.env.HOGE}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
