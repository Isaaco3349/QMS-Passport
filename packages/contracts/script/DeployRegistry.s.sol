// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {DeploymentRegistry} from "../src/DeploymentRegistry.sol";

contract DeployRegistry is Script {
    function run() external returns (DeploymentRegistry registry) {
        vm.startBroadcast();
        registry = new DeploymentRegistry();
        vm.stopBroadcast();
    }
}
