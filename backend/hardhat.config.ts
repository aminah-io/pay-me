import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.19",
		settings: {
			optimizer: {
				enabled: true
			}
		}
	},
}

export default config;