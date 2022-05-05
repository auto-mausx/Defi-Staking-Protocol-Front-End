const stakingAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const rewardTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Very important, the ABI is only the ARRAY from the json file from the artifacts in the back end. Got caught up with that for longer than I care to admit lol
const stakingAbi = require("./stakingAbi.json");
const rewardTokenAbi = require("./rewardTokenAbi.json");

module.exports = {
    stakingAbi,
    rewardTokenAbi,
    stakingAddress,
    rewardTokenAddress,
}