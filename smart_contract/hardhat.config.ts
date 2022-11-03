import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const config: HardhatUserConfig = {
    solidity: '0.8.17',
    networks: {
        goerli: {
            url: process.env.GOERLI_INFURA_URL,
            accounts: [process.env.WALLET_PRIVATE_KEY!],
        },
    },
}

export default config
