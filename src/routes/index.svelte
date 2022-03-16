<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions,
		Transition
	} from '@rgossiaux/svelte-headlessui';

	const dayInSeconds = 60 * 60 * 24;
	const maxDecimalPoints = 9;
	let selectedFarmIndex = 0;
	let amountToDistribute: number;
	let timeInDays: number;

	interface Farm {
		chain: ChainOptions;
		address: string;
		pair: string;
	}
	enum ChainOptions {
		Polygon,
		BSC,
		Fantom
	}

	const farms: Farm[] = [
		{
			chain: ChainOptions.Fantom,
			address: '0x1406E49b5B0dA255307FE25cC21C675D4Ffc73e0',
			pair: 'wBAN-wFTM'
		},
		{
			chain: ChainOptions.Fantom,
			address: '0x6bADcf8184a760326528b11057C00952811f77af',
			pair: 'wBAN-USDC'
		},
		{
			chain: ChainOptions.Polygon,
			address: '0xefa4aED9Cf41A8A0FcdA4e88EfA2F60675bAeC9F',
			pair: 'wBAN-wETH'
		}
	];

	function setSelectedFarmIndex(e) {
		selectedFarmIndex = e.detail;
		console.log(selectedFarmIndex);
	}

	function getStepOneCommand(chain: string, address: string, banASecond: number) {
		return `npx hardhat --chain ${chain} benis:change-rewards --benis ${address} --rewards ${banASecond}`;
	}
	function getStepTwoCommand(chain: string, address: string, timeInSeconds: number) {
		return `npx hardhat --chain ${chain} benis:add-time --benis ${address} --time ${timeInSeconds}`;
	}
	// adjust decimal points to a certain number
	function floorTo(value: number, precision: number) {
		var multiplier = Math.pow(10, precision);
		return Math.floor(value * multiplier) / multiplier;
	}

	function updateTextView(e) {
		console.log(e.target.value);
		let num = getNumber(e.target.value);
		amountToDistribute = num;
		if (num == 0) {
			e.target.value = '';
		} else {
			e.target.value = num.toLocaleString('en-US');
		}
	}
	function getNumber(_str) {
		var arr = _str.split('');
		var out = new Array();
		for (var cnt = 0; cnt < arr.length; cnt++) {
			if (isNaN(arr[cnt]) == false) {
				out.push(arr[cnt]);
			}
		}
		return Number(out.join(''));
	}
</script>

<div class="w-full min-h-screen flex flex-col items-center justify-start py-8 px-4 text-c-on-bg">
	<form
		class="w-80 max-w-full flex flex-col items-center justify-center bg-c-on-bg-05 rounded-xl px-6 pt-5 pb-6"
		on:submit|preventDefault
	>
		<div class="w-full flex flex-col">
			<p class="px-2 text-c-on-bg-75 font-medium">Farm</p>
			<Listbox
				class="w-full relative text-c-on-bg-75 flex flex-col items-stretch mt-2"
				value={selectedFarmIndex}
				on:change={setSelectedFarmIndex}
				let:open
			>
				<ListboxButton
					as="button"
					class="w-full text-c-on-bg font-semibold pl-4 pr-2.5 py-2.5 border border-c-on-bg-25 hover:border-c-on-bg-35 rounded-lg
						flex flex-row justify-between items-center hover:bg-c-on-bg-15 transition-all duration-250 {open
						? 'rounded-b-none shadow-dropdown-hover'
						: 'shadow-dropdown'}"
				>
					<p class="mr-1 max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
						{farms[selectedFarmIndex].pair}
						<span class="opacity-50 font-normal"
							>({ChainOptions[farms[selectedFarmIndex].chain]})</span
						>
					</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 flex-shrink-0 transition duration-250 transform {open
							? 'rotate-180'
							: ''}"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</ListboxButton>
				<div class="w-full relative">
					<Transition
						show={open}
						enter="transition-all duration-250 transform origin-top"
						enterFrom="scale-y-90 opacity-90 -translate-y-2"
						enterTo="scale-y-100 opacity-100 translate-y-0"
						leave="transition-all duration-250 transform origin-top"
						leaveFrom="opacity-50 scale-y-50 translate-y-0"
						leaveTo="scale-y-0 opacity-0 -translate-y-1"
					>
						<ListboxOptions
							class="w-full shadow-dropdown-hover bg-c-bg absolute top-0 right-0 rounded-lg rounded-t-none border border-t-0 
							border-c-on-bg-10 overflow-hidden flex flex-col items-stretch"
						>
							{#each farms as farm, index}
								{#if index != selectedFarmIndex}
									<ListboxOption
										as="button"
										class="w-full font-semibold px-4 py-2.5 hover:bg-c-on-bg-15 transition flex flex-row items-center"
										value={index}
									>
										<p class="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
											{farm.pair}
											<span class="opacity-50 font-normal"
												>({ChainOptions[farms[index].chain]})</span
											>
										</p>
									</ListboxOption>
								{/if}
							{/each}
						</ListboxOptions>
					</Transition>
				</div>
			</Listbox>
		</div>
		<label for="amountToDistribute" class="w-full mt-5">
			<p class="px-2 text-c-on-bg-75 font-medium">
				Amount to Distribute <span class="text-c-on-bg-40">(wBAN)</span>
			</p>
			<input
				id="amountToDistribute"
				type="text"
				placeholder="Amount"
				autocomplete="off"
				on:keyup|preventDefault={updateTextView}
				class="w-full text-lg font-semibold mt-2 bg-c-on-bg-05 border border-transparent rounded-lg 
				px-4 py-2 hover:border-c-on-bg-25 focus:border-c-primary transition"
			/>
		</label>
		<label for="timeInDays" class="w-full mt-5">
			<p class="px-2 text-c-on-bg-75 font-medium">
				Time <span class="text-c-on-bg-40">(Days)</span>
			</p>
			<input
				id="timeInDays"
				type="number"
				placeholder="Days"
				autocomplete="off"
				bind:value={timeInDays}
				class="w-full text-lg font-semibold mt-2 bg-c-on-bg-05 border border-transparent rounded-lg 
				px-4 py-2 hover:border-c-on-bg-25 focus:border-c-primary transition"
			/>
		</label>
	</form>
	<Transition
		show={amountToDistribute !== null &&
			!isNaN(amountToDistribute) &&
			timeInDays !== null &&
			!isNaN(timeInDays)}
		enter="transition-all duration-250 transform origin-top"
		enterFrom="scale-y-95 opacity-90 -translate-y-2"
		enterTo="scale-y-100 opacity-100 translate-y-0"
		leave="transition-all duration-250 transform origin-top"
		leaveFrom="scale-y-100 opacity-75 translate-y-0"
		leaveTo="scale-y-75 opacity-0 -translate-y-2"
		class="max-w-full"
	>
		<div class="bg-c-on-bg-05 w-[70rem] max-w-full rounded-xl p-6 container mt-8">
			<!-- Step 1 -->
			<div class="w-full flex flex-col">
				<p class="font-bold text-xl px-2">Step 1</p>
				<p class="text-c-on-bg-75 px-2 mt-1">
					Change the wBAN rewards given each second by the farm by running the command below:
				</p>
				<p
					class="bg-c-primary-10 border border-c-primary-20 rounded-lg px-4 py-3 mt-4 text-sm font-medium text-c-primary break-all font-mono"
				>
					{getStepOneCommand(
						ChainOptions[farms[selectedFarmIndex].chain].toLowerCase(),
						farms[selectedFarmIndex].address,
						floorTo(amountToDistribute / (timeInDays * dayInSeconds), maxDecimalPoints)
					)}
				</p>
			</div>
			<!-- Step 2 -->
			<div class="w-full flex flex-col mt-8">
				<p class="font-bold text-xl px-2">Step 2</p>
				<p class="text-c-on-bg-75 px-2 mt-1">
					Extend the time that the farm would run for by running the command below:
				</p>
				<p
					class="bg-c-primary-10 border border-c-primary-20 rounded-lg px-4 py-3 mt-4 text-sm font-medium text-c-primary break-all font-mono"
				>
					{getStepTwoCommand(
						ChainOptions[farms[selectedFarmIndex].chain].toLowerCase(),
						farms[selectedFarmIndex].address,
						timeInDays * dayInSeconds
					)}
				</p>
			</div>
		</div>
	</Transition>
</div>

<style>
	input::placeholder {
		color: var(--c-on-bg-40);
		font-weight: 400;
	}
</style>
