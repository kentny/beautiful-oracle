// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "hardhat/console.sol";

contract APIConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    struct Response {
        string message;
    }

    Response public response;
    address public oracleAddress;
    bytes32 public jobId;
    uint256 public fee;

    event RequestMessage(bytes32 indexed requestId, string message);

    constructor(address _oracleAddress, bytes32 _jobId) ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB); // LINK token contract in the goerli network.
        oracleAddress = _oracleAddress;
        setChainlinkOracle(_oracleAddress);
        jobId = _jobId;
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)

        console.log(fee);
    }

    function requestAPI() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        return sendChainlinkRequest(req, fee);
    }

    function fulfill(bytes32 _requestId, string calldata _message)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestMessage(_requestId, _message);
        response = Response({message: _message});
    }
}
