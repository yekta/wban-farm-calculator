export let steps = {
	send_from_defi: {
		descriptionFunc: (
			amount: string,
			network: string,
			banExplorer: string,
			wrapAddress: string,
			defiFundAddress: string
		) =>
			`Send <span class="font-semibold" style="color: var(--c-${network});">${amount}</span> BAN from <a target="_blank" href="${banExplorer}/explorer/account/${defiFundAddress}" class="hover:underline" style="color: var(--c-${network});">DeFi fund</a> to <a target="_blank" href="${banExplorer}/explorer/account/${wrapAddress}" class="hover:underline" style="color: var(--c-${network});">the wrap BAN account</a> linked to the bridge.`
	},
	wrap_and_send: {
		descriptionFunc: (amount: string, network: string, explorer: string, address: string) =>
			`Wrap <span class="font-semibold" style="color: var(--c-${network});">${amount}</span> BAN and send the wBAN to <a target="_blank" href="${explorer}/address/${address}" class="hover:underline" style="color: var(--c-${network});">the farm manager contract</a>.`
	},
	change_rewards: {
		copied: false,
		timeout: undefined,
		descriptionFunc: () =>
			'Right before 3PM UTC, change the wBAN rewards given every second by the farm manager contract by running the command below:',
		commandTextFunc: ({
			network,
			address,
			banASecond
		}: {
			network: string;
			address: string;
			banASecond: number;
		}) => {
			return `npx hardhat --network ${network} benis:change-rewards --benis ${address} --rewards ${banASecond}`;
		}
	},
	extend_time: {
		copied: false,
		timeout: undefined,
		descriptionFunc: () =>
			'Extend the time that the farm manager contract would run for by running the command below:',
		commandTextFunc: ({
			network,
			address,
			timeInSeconds
		}: {
			network: string;
			address: string;
			timeInSeconds: number;
		}) => {
			return `npx hardhat --network ${network} benis:add-time --benis ${address} --time ${timeInSeconds}`;
		}
	}
};
