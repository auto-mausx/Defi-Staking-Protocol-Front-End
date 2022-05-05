// how many tokens in wallet
// how many tokens are staked
// how many tokens we have earned
import { useMoralis, useWeb3Contract, runContractFunction } from "react-moralis";
import { stakingAbi, rewardTokenAbi, stakingAddress, rewardTokenAddress } from "../constants";
import { useState, useEffect } from "react";
import {ethers} from "ethers";


export default function StakeDetails() {
    const {account, isWeb3Enabled} = useMoralis();
    const [rtBalance, setRtBalance] = useState("0");
    const [stakedBalance, setStakedBalance] = useState("0");
    const [earnedBalance, setEarnedBalance] = useState("0");

    
// This gets the balance of our reward token
    const { runContractFunction: getRtBalance } = useWeb3Contract({
        abi: rewardTokenAbi,
        contractAddress: rewardTokenAddress,
        functionName: "balanceOf",
        params: {
            account: account,
        },
    });
// This will get the amount we have staked
    const { runContractFunction: getStakedBalance } = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        // This function is in the Staked.sol contract in the backend code
        functionName: "getStaked",
        params: {
            account: account,
        },
    });
    // This will get the amount we have earned though staking
    const { runContractFunction: getEarnedBalance } = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        // This function is in the Staked.sol contract in the backend code
        functionName: "earned",
        params: {
            account: account,
        },
    });

    // reward token address
    // reward token ABI

    useEffect(() => {
        console.log(account)
        // update UI and get balances
        if(isWeb3Enabled && account) {
        updateUiValues();
        }
    } , [account, isWeb3Enabled]);

    async function updateUiValues() {
        const rtBalanceFromContract = (await getRtBalance({onError: (err) => console.log(err)})).toString();
        const formattedRtBalanceFromContract = ethers.utils.formatUnits(rtBalanceFromContract, "ether");
        setRtBalance(formattedRtBalanceFromContract);

        const stakedFromContract = (await getStakedBalance({onError: (err) => console.log(err)})).toString();
        const formattedStakedFromContract = ethers.utils.formatUnits(stakedFromContract, "ether");
        setStakedBalance(formattedStakedFromContract);

        const earnedFromContract = (await getEarnedBalance({onError: (err) => console.log(err)})).toString();
        const formattedEarnedFromContract = ethers.utils.formatUnits(earnedFromContract, "ether");
        setEarnedBalance(formattedEarnedFromContract);
    }

    return (
        <div>
            <div>RT Balance is : {rtBalance}</div>
            <div>Staked Balance is : {stakedBalance}</div>
            <div>Earned Balance is : {earnedBalance}</div>
        </div>
    )
}