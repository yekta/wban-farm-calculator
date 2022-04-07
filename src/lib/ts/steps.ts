export let steps = {
	send_from_defi: {
		defiFundAddressCopied: false,
		wrapAddressCopied: false,
		defiFundAddressTimeout: undefined,
		wrapAddressTimeout: undefined,
		descriptionFunc: (
			amount: string,
			network: string,
			banExplorer: string,
			wrapAddress: string,
			defiFundAddress: string
		) =>
			`Send <span class="font-semibold" style="color: var(--c-${network});">${amount}</span> BAN from <a target="_blank" href="${banExplorer}/explorer/account/${defiFundAddress}" class="hover:underline" style="color: var(--c-${network});">DeFi fund</a> to <a target="_blank" href="${banExplorer}/explorer/account/${wrapAddress}" class="hover:underline" style="color: var(--c-${network});">the wrap account (BAN)</a> linked to the bridge.`
	},
	wrap_and_send: {
		copied_manager: false,
		copied_wrap: false,
		timeout_manager: undefined,
		timeout_wrap: undefined,
		descriptionFunc: (
			amount: string,
			network: string,
			explorer: string,
			address: string,
			wrapWbanAddress: string
		) =>
			`Wrap <span class="font-semibold" style="color: var(--c-${network});">${amount}</span> BAN using <a target="_blank" href="${explorer}/address/${wrapWbanAddress}" class="hover:underline" style="color: var(--c-${network});">the wrap account (wBAN)</a> and send the wBAN to <a target="_blank" href="${explorer}/address/${address}" class="hover:underline" style="color: var(--c-${network});">the farm manager contract</a>.`
	},
	load_secrets: {
		copied: false,
		timeout: undefined,
		descriptionFunc: () =>
			`Open the dapp repo, execute the command below to load the secrets into the shell session:`,
		commandTextFunc: (network: string) => `source ./env.sh ${network} production`
	},
	change_alloc_points: {
		copied: false,
		timeout: undefined,
		descriptionFunc: () =>
			`If you want to change allocation points for each individual farm, right before 3PM UTC execute the command below for each farm you want to change:`,
		commandTextFunc: (network: string, address: string, pid: number, allocPoint: number) =>
			`npx hardhat --network ${network} benis:alloc-pool --benis ${address} --pid ${pid} --alloc ${allocPoint}`
	},
	change_rewards: {
		copied: false,
		timeout: undefined,
		descriptionFunc: () =>
			'Right before 3PM UTC change the wBAN rewards the farm manager contract gives every second by executing the command below:',
		commandTextFunc: (network: string, address: string, banASecond: number) => {
			return `npx hardhat --network ${network} benis:change-rewards --benis ${address} --rewards ${banASecond}`;
		}
	},
	extend_time: {
		copied: false,
		timeout: undefined,
		descriptionFunc: () =>
			'Extend the time the farm manager contract would run for by executing the command below:',
		commandTextFunc: (network: string, address: string, timeInSeconds: number) => {
			return `npx hardhat --network ${network} benis:add-time --benis ${address} --time ${timeInSeconds}`;
		}
	}
};
