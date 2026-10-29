// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title DeploymentRegistry
/// @notice Optional on-chain anchor for QMS Passport migration manifests (testnet public good).
/// @dev Stores manifest content hashes — not full ABIs. metadataURI points to IPFS/GitHub release JSON.
contract DeploymentRegistry {
    struct Record {
        address registrant;
        uint64 registeredAt;
        string metadataURI;
    }

    mapping(bytes32 manifestHash => Record) public records;

    event DeploymentRegistered(
        bytes32 indexed manifestHash,
        address indexed registrant,
        string metadataURI
    );

    error AlreadyRegistered(bytes32 manifestHash);

    function registerDeployment(bytes32 manifestHash, string calldata metadataURI) external {
        if (records[manifestHash].registrant != address(0)) {
            revert AlreadyRegistered(manifestHash);
        }
        records[manifestHash] = Record({
            registrant: msg.sender,
            registeredAt: uint64(block.timestamp),
            metadataURI: metadataURI
        });
        emit DeploymentRegistered(manifestHash, msg.sender, metadataURI);
    }
}
