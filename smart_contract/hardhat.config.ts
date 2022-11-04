import { HardhatUserConfig, task } from 'hardhat/config'
import 'hardhat-gas-reporter'
import '@nomicfoundation/hardhat-toolbox'
import 'dotenv/config'
import './tasks'

const config: HardhatUserConfig = {
    networks: {
        goerli: {
            url: process.env.GOERLI_INFURA_URL,
            accounts: [process.env.WALLET_PRIVATE_KEY!],
        },
    },
    gasReporter: {
        enabled: true,
    },
    solidity: {
        compilers: [
            {
                version: '0.8.17',
            },
            {
                version: '0.6.6',
            },
            {
                version: '0.4.24',
            },
        ],
    },
}

export default config
