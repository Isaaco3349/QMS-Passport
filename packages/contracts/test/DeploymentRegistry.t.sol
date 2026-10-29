// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {DeploymentRegistry} from "../src/DeploymentRegistry.sol";

contract DeploymentRegistryTest is Test {
    DeploymentRegistry registry;

    function setUp() public {
        registry = new DeploymentRegistry();
    }

    function testRegister() public {
        bytes32 hash = keccak256("passport-manifest/v1");
        registry.registerDeployment(hash, "ipfs://example");
        (address registrant,, string memory uri) = registry.records(hash);
        assertEq(registrant, address(this));
        assertEq(uri, "ipfs://example");
    }

    function testRevertDuplicate() public {
        bytes32 hash = keccak256("dup");
        registry.registerDeployment(hash, "a");
        vm.expectRevert(abi.encodeWithSelector(DeploymentRegistry.AlreadyRegistered.selector, hash));
        registry.registerDeployment(hash, "b");
    }
}
