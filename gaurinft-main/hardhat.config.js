require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.9",
      },
    ],
  },
  networks: {
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: ["7289fbc03c391d3ff060212dd97eb06be9051faf74261e1419aa47f1b3dab264"],
    },
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/nyHyzW8RbkwSKnszaYmdcV-UAjmRa9AH',
      accounts: ["7289fbc03c391d3ff060212dd97eb06be9051faf74261e1419aa47f1b3dab264"],
      gasPrice: 100
    },
  },
};
