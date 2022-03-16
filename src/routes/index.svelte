<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import { copy } from 'svelte-copy';

	const dayInSeconds = 60 * 60 * 24;
	const maxDecimalPoints = 9;
	let selectedFarmIndex = 0;
	let amountToDistribute: number;
	let timeInDays: number;
	let stepOneCopied = false;
	let stepTwoCopied = false;
	let stepOneTimeout;
	let stepTwoTimeout;
	const copyDelay = 1000;

	interface FarmManager {
		chain: ChainOptions;
		address: string;
	}
	enum ChainOptions {
		Polygon,
		BSC,
		Fantom
	}

	const farmManagers: FarmManager[] = [
		{
			chain: ChainOptions.Fantom,
			address: '0xd91f84d4e2d9f4fa508c61356a6cb81a306e5287'
		},
		{
			chain: ChainOptions.Polygon,
			address: '0xefa4aED9Cf41A8A0FcdA4e88EfA2F60675bAeC9F'
		},
		{
			chain: ChainOptions.BSC,
			address: '0x1E30E12e82956540bf870A40FD1215fC083a3751'
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
						{ChainOptions[farmManagers[selectedFarmIndex].chain]}
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
							{#each farmManagers as farm, index}
								{#if index != selectedFarmIndex}
									<ListboxOption
										as="button"
										class="w-full font-semibold px-4 py-2.5 hover:bg-c-on-bg-15 transition flex flex-row items-center"
										value={index}
									>
										<p class="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
											{ChainOptions[farmManagers[index].chain]}
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
		<div class="bg-c-on-bg-05 w-[72rem] max-w-full rounded-xl p-6 container mt-8">
			<!-- Step 1 -->
			<div class="w-full flex flex-col">
				<p class="font-bold text-xl px-2">Step 1</p>
				<p class="text-c-on-bg-75 px-2 mt-1">
					Change the wBAN rewards given each second by the farm by running the command below:
				</p>
				<p
					class="bg-c-primary-10 border border-c-primary-20 rounded-lg pl-4 pr-12 py-3 mt-4 text-sm font-medium text-c-primary break-all font-mono relative overflow-hidden"
				>
					{getStepOneCommand(
						ChainOptions[farmManagers[selectedFarmIndex].chain].toLowerCase(),
						farmManagers[selectedFarmIndex].address,
						floorTo(amountToDistribute / (timeInDays * dayInSeconds), maxDecimalPoints)
					)}
					<button
						on:click={() => {
							stepOneCopied = true;
							if (stepOneTimeout) clearTimeout(stepOneTimeout);
							stepOneTimeout = setTimeout(() => {
								stepOneCopied = false;
							}, copyDelay);
						}}
						use:copy={getStepOneCommand(
							ChainOptions[farmManagers[selectedFarmIndex].chain].toLowerCase(),
							farmManagers[selectedFarmIndex].address,
							floorTo(amountToDistribute / (timeInDays * dayInSeconds), maxDecimalPoints)
						)}
						class="h-full absolute right-0 top-0 flex flex-row items-center justify-center hover:bg-c-primary-10 px-3 transition"
					>
						{#if stepOneCopied}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
						{/if}
					</button>
				</p>
			</div>
			<!-- Step 2 -->
			<div class="w-full flex flex-col mt-8">
				<p class="font-bold text-xl px-2">Step 2</p>
				<p class="text-c-on-bg-75 px-2 mt-1">
					Extend the time that the farm would run for by running the command below:
				</p>
				<p
					class="bg-c-primary-10 border border-c-primary-20 rounded-lg pl-4 pr-12 py-3 mt-4 text-sm font-medium text-c-primary break-all font-mono relative overflow-hidden"
				>
					{getStepTwoCommand(
						ChainOptions[farmManagers[selectedFarmIndex].chain].toLowerCase(),
						farmManagers[selectedFarmIndex].address,
						timeInDays * dayInSeconds
					)}
					<button
						on:click={() => {
							stepTwoCopied = true;
							if (stepTwoTimeout) clearTimeout(stepTwoTimeout);
							setTimeout(() => {
								stepTwoCopied = false;
							}, copyDelay);
						}}
						use:copy={getStepTwoCommand(
							ChainOptions[farmManagers[selectedFarmIndex].chain].toLowerCase(),
							farmManagers[selectedFarmIndex].address,
							timeInDays * dayInSeconds
						)}
						class="h-full absolute right-0 top-0 flex flex-row items-center justify-center hover:bg-c-primary-10 px-3 transition"
					>
						{#if stepTwoCopied}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
						{/if}
					</button>
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
