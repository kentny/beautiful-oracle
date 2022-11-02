import { ethers } from 'hardhat'
const utils = ethers.utils

export const stringToBytes32 = (str: string): string => {
    return (
        '0x' +
        str
            .split('')
            .map((char) => {
                return char.charCodeAt(0).toString(16)
            })
            .join('')
    )
}
