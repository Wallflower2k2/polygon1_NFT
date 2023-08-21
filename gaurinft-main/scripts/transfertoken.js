const hre = require("hardhat");
const gauriNFTJSON = require("../artifacts/contracts/GauriNFT.sol/GauriNFT.json");

const contract_address = "0x616E9ed7E928fc95E68555bB94809e178D6C3AA9"; // Replace with the actual contract address
const gauriNFTABI = gauriNFTJSON.abi;
const walletAddress = "0xB48c24e5d5697550593b862C666Ae59e5B5671Be"; // Replace with your wallet address

const fxRootContractABI = require("../fxRootContractABI.json");
const fxERC1155RootAddress = "0x48DE785970ca6eD289315036B6d187888cF9Df48"; // Replace with actual address

async function main() {
    const gauriNFTContract = await hre.ethers.getContractAt(gauriNFTABI, contract_address);

    const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC1155RootAddress);

    const approveTx = await gauriNFTContract.setApprovalForAll(fxERC1155RootAddress, true);
    await approveTx.wait();

    console.log("Approval confirmed");

    const tokenIds = await gauriNFTContract.getAllNFTs();
     
    for (const tokenId of tokenIds) {
        const depositTx = await fxContract.deposit(
            contract_address,     // ERC1155 contract address
            walletAddress,        // Receiver address on Fantom
            tokenId,              // Token ID from GauriNFT
            1,                    // Amount of tokens to deposit
            '0x6566'              // Data
        );
        await depositTx.wait();
        console.log(`Token ${tokenId} deposited`);
    }

    console.log("Your 5 tokens deposited successfully");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
