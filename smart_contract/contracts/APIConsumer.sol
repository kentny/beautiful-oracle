// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "hardhat/console.sol";

contract APIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    struct Response {
        string message;
    }

    Response public response;
    address private immutable oracleAddress;
    bytes32 private immutable jobId;
    uint256 private immutable fee;
    string private url;

    event RequestMessage(bytes32 indexed requestId, string message);
    event MyTestEmitMessage();

    constructor(address _linkTokenAddress, address _oracleAddress, bytes32 _jobId) {
        setChainlinkToken(_linkTokenAddress);
        oracleAddress = _oracleAddress;
        setChainlinkOracle(_oracleAddress);
        jobId = _jobId;
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    function setUrl(string memory _url) public {
        url = _url;
    }

    function call() public {
        console.log("##### call #####");
        // emit MyTestEmitMessage();

        return;
    }

    function requestAPI(string memory _url, string memory _path) public returns (bytes32 requestId) {
        console.log("##### requestAPI - 1 #####");

        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        console.log("##### requestAPI - 2 #####");
        req.add('get', _url);
        req.add('path', _path);

        console.log("##### requestAPI - 3 #####");
        emit MyTestEmitMessage();

        // return "FINISH!!";
        return sendChainlinkRequestTo(oracleAddress, req, fee);
    }

    function fulfill(bytes32 _requestId, string calldata _message)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestMessage(_requestId, _message);
        response = Response({message: _message});
    }
}
