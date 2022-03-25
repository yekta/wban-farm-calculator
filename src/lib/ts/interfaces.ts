import type { NetworkOptions } from '$lib/ts/enums';

export interface Network {
	network: NetworkOptions;
	explorer: string;
	farmManagerAddress: string;
	wrapAddressBAN: string;
	wrapAddressWBAN: string;
	farms: Farm[];
}

export interface Farm {
	pid: number;
	pair: string;
}

export interface StepState {
	copied: boolean;
	timeout: NodeJS.Timeout;
	commandTextFunc: (obj: any) => string;
}
