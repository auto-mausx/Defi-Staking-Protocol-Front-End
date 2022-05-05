// staking ABI
// Staking Address
// how much they want to stake
// approve our reward token
import { useWeb3Contract } from "react-moralis";
import { rewardTokenAbi, rewardTokenAddress, stakingAbi, stakingAddress } from "../constants";
import { Form } from "web3uikit";
import {ethers} from "ethers";


export default function StakeForm() {
    const {runContractFunction} = useWeb3Contract();
    let approveOptions = {
        abi: rewardTokenAbi,
        contractAddress: rewardTokenAddress,
        functionName: "approve",
    }
    let stakeOptions = {
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "stake",
    }

    async function handleStakeSubmit(data) {
        const amountToApprove = data.data[0].inputResult;
        approveOptions.params = {
            amount: ethers.utils.parseUnits(amountToApprove, "ether").toString(),
            spender: stakingAddress,
        }
        console.log("Approving...")
        const tx = await runContractFunction({
            params: approveOptions,
            onError: (err) => console.log(err),
            onSuccess: () => {
                handleApproveSuccess(approveOptions.params.amount)
            }
        })
    }

    async function handleApproveSuccess(amountToStakeFormatted) {
        stakeOptions.params = {
            amount: amountToStakeFormatted
        }
        console.log(`Staking ${stakeOptions.params.amount} RT Token...`)

        const tx = await runContractFunction({
            params: stakeOptions,
            onError: (err) => console.log(err),
        })
        await tx.wait(1);
        console.log("Transaction has been confirmed by 1 block.")
    }

    // Add a use effect to update the reward/staked balances on the front end

    return (
        <div>
            <Form
            onSubmit={handleStakeSubmit}
            data={[
                {
                    inputWidth: "50%",
                    name: "Amount to stake (in ETH)",
                    type: "number",
                    value: "",
                    key: "amountToStake",
                }
            ]}
            title="Stake Now!"
            ></Form>
        </div>
    )
}