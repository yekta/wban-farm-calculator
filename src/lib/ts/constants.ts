import { NetworkOptions } from '$lib/ts/enums';
import type { Network } from '$lib/ts/interfaces';

export const NETWORKS: Network[] = [
	{
		network: NetworkOptions.Fantom,
		explorer: 'https://ftmscan.com',
		farmManagerAddress: '0xd91f84d4e2d9f4fa508c61356a6cb81a306e5287',
		wrapAddressBAN: 'ban_3ftmwrap5qeirm53wndr6811tbnnraho587awkxn1xgrwfgry97cb4bouiwh',
		farms: [
			{ pid: 0, pair: 'wBAN-USDC • Spooky' },
			{ pid: 1, pair: 'wBAN-FTM • Spooky' }
		]
	},
	{
		network: NetworkOptions.Polygon,
		explorer: 'https://polygonscan.com',
		farmManagerAddress: '0xefa4aED9Cf41A8A0FcdA4e88EfA2F60675bAeC9F',
		wrapAddressBAN: 'ban_3po1ywrp9m967z9xpd9cwwfdg1gteuk4n7dcyoatkgpjgne5yx459wyoyxzj',
		farms: [{ pid: 0, pair: 'wBAN-wETH • Sushi' }]
	},
	{
		network: NetworkOptions.BSC,
		explorer: 'https://bscscan.com',
		farmManagerAddress: '0x1E30E12e82956540bf870A40FD1215fC083a3751',
		wrapAddressBAN: 'ban_1benisborxg1xdyiszp561t8dtu193cmirdue3gqanwubj8gm5ak87c5j8e7',
		farms: [
			{ pid: 0, pair: 'wBAN Staking' },
			{ pid: 1, pair: 'wBAN-BNB • Ape' },
			{ pid: 2, pair: 'wBAN-BUSD • Ape' },
			{ pid: 3, pair: 'wBAN-BUSD • Pancake' }
		]
	}
];

export const banExplorer = 'https://creeper.banano.cc';

export const defiFundAddress = 'ban_1defi11tou1nbhyp8y4onwsiq5jcur19xe54mcmew1xonnz6e1d1sw74yefu';
