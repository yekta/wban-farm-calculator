import type { NetworkOptions } from '$lib/ts/enums';

export interface Network {
	network: NetworkOptions;
	explorer: string;
	farmManagerAddress: string;
	wrapAddressBAN: string;
}

export interface StepState {
	copied: boolean;
	timeout: NodeJS.Timeout;
	commandTextFunc: (obj: any) => string;
}
