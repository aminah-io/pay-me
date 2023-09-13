import { ethers } from "ethers";
import { PayMe__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
	const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
	
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

	const payMeContractFactory = new PayMe__factory(wallet);
	const payMeContract = await payMeContractFactory.deploy();

	await payMeContract.deployed();

	console.log("✅ PayMe Contract deployed to:", payMeContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});