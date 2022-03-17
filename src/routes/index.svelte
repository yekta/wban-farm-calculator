<script lang="ts">
	import Divider from '$lib/components/Divider.svelte';
	import IconCopy from '$lib/components/icons/IconCopy.svelte';
	import IconTick from '$lib/components/icons/IconTick.svelte';
	import { banExplorer, defiFundAddress, NETWORKS } from '$lib/ts/constants';
	import { NetworkOptions } from '$lib/ts/enums';
	import { getNumber, updateTextView, floorTo } from '$lib/ts/helpers';
	import { steps } from '$lib/ts/steps';

	import {
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import { copy } from 'svelte-copy';

	const dayInSeconds = 60 * 60 * 24;
	const maxDecimalPoints = 10;
	let selectedNetworkIndex = 0;
	let amountToDistribute: number;
	let amountToDistributeString: string;
	let timeInDays: number;
	let timeInDaysString: string;
	const copyDelay = 1000;

	$: if (amountToDistributeString !== undefined)
		amountToDistribute = getNumber(amountToDistributeString);
	$: if (timeInDaysString !== undefined) timeInDays = getNumber(timeInDaysString);

	function setSelectedNetwork(e) {
		selectedNetworkIndex = e.detail;
	}
</script>

<div class="w-full min-h-screen flex flex-col items-center justify-start py-8 px-4 text-c-on-bg">
	<!-- REWARDS -->
	<form
		class="w-full md:w-auto max-w-full flex flex-col md:flex-row gap-5 md:gap-6 items-center justify-center bg-c-on-bg-05 rounded-xl px-6 pt-5 pb-6"
		on:submit|preventDefault
	>
		<div class="w-full md:w-56 max-w-full flex flex-col pb-1">
			<p class="px-2 text-c-on-bg-75 font-medium">Network</p>
			<Listbox
				class="w-full relative text-c-on-bg-75 flex flex-col items-stretch mt-2"
				value={selectedNetworkIndex}
				on:change={setSelectedNetwork}
				let:open
			>
				<ListboxButton
					as="button"
					style="color: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()})"
					class="text-lg w-full bg-c-on-bg-05 font-semibold pl-4 pr-2.5 py-2.5 border border-transparent hover:border-c-on-bg-25 rounded-lg
						flex flex-row justify-between items-center transition-all duration-250 {open
						? 'rounded-b-none shadow-dropdown-hover'
						: 'shadow-dropdown'}"
				>
					<p class="mr-1 max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
						{NetworkOptions[NETWORKS[selectedNetworkIndex].network]}
					</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 flex-shrink-0 transition duration-250 transform text-c-on-bg-50 {open
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
							{#each NETWORKS as farm, index}
								{#if index != selectedNetworkIndex}
									<ListboxOption
										as="button"
										style="color: var(--c-{NetworkOptions[NETWORKS[index].network].toLowerCase()})"
										class="w-full text-lg font-semibold px-4 py-2.5 hover:bg-c-on-bg-15 transition flex flex-row items-center"
										value={index}
									>
										<p class="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
											{NetworkOptions[NETWORKS[index].network]}
										</p>
									</ListboxOption>
								{/if}
							{/each}
						</ListboxOptions>
					</Transition>
				</div>
			</Listbox>
		</div>
		<label for="amountToDistribute" class="w-full md:w-56 max-w-full hover:cursor-text">
			<p class="px-2 text-c-on-bg-75 font-medium">
				Amount <span class="text-c-on-bg-40">(wBAN)</span>
			</p>
			<input
				id="amountToDistribute"
				type="text"
				placeholder="Amount"
				autocomplete="off"
				bind:value={amountToDistributeString}
				on:keyup|preventDefault={updateTextView}
				class="w-full text-lg font-semibold mt-2 bg-c-on-bg-05 border border-transparent rounded-lg 
				px-4 py-2.5 hover:border-c-on-bg-25 focus:border-c-on-bg-75 transition"
			/>
		</label>
		<label for="timeInDays" class="w-full md:w-56 max-w-full hover:cursor-text">
			<p class="px-2 text-c-on-bg-75 font-medium">
				Timeframe <span class="text-c-on-bg-40">(Days)</span>
			</p>
			<input
				id="timeInDays"
				type="text"
				placeholder="Days"
				autocomplete="off"
				bind:value={timeInDaysString}
				on:keyup|preventDefault={updateTextView}
				class="w-full text-lg font-semibold mt-2 bg-c-on-bg-05 border border-transparent rounded-lg 
				px-4 py-2.5 hover:border-c-on-bg-25 focus:border-c-on-bg-75 transition"
			/>
		</label>
	</form>
	<!-- STEPS -->
	<Transition
		show={amountToDistribute !== null &&
			!isNaN(amountToDistribute) &&
			timeInDays !== null &&
			!isNaN(timeInDays) &&
			timeInDays !== 0 &&
			amountToDistribute !== 0}
		enter="transition-all duration-250 transform origin-top"
		enterFrom="scale-y-95 opacity-90 -translate-y-2"
		enterTo="scale-y-100 opacity-100 translate-y-0"
		leave="transition-all duration-250 transform origin-top"
		leaveFrom="scale-y-100 opacity-75 translate-y-0"
		leaveTo="scale-y-75 opacity-0 -translate-y-2"
		class="max-w-full"
	>
		<div class="w-full md:w-[42rem] max-w-full bg-c-on-bg-05 rounded-xl p-6 container mt-8">
			<!-- Step: Send to intermediate account -->
			<div class="w-full flex flex-col pb-1">
				<p class="font-bold text-xl px-2">Step 1</p>
				<p class="text-c-on-bg-75 px-2 mt-1">
					{@html steps.send_from_defi.descriptionFunc(
						amountToDistribute.toLocaleString('en-US'),
						NetworkOptions[NETWORKS[selectedNetworkIndex].network].toLowerCase(),
						banExplorer,
						NETWORKS[selectedNetworkIndex].wrapAddressBAN,
						defiFundAddress
					)}
				</p>
				<p class="px-2 text-c-on-bg-75 font-semibold mt-6">DeFi Fund</p>
				<p
					style="background: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}-10); color: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}); border-color: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}-20);"
					class="border rounded-lg pl-4 pr-14 py-3 mt-2 text-sm font-medium text-c-primary 
					break-all font-mono relative overflow-hidden"
				>
					{defiFundAddress}
					<button
						on:click={() => {
							steps.send_from_defi.defiFundAddressCopied = true;
							if (steps.send_from_defi.defiFundAddressTimeout)
								clearTimeout(steps.send_from_defi.defiFundAddressTimeout);
							setTimeout(() => {
								steps.send_from_defi.defiFundAddressCopied = false;
							}, copyDelay);
						}}
						use:copy={defiFundAddress}
						class="h-full absolute right-0 top-0 flex flex-row items-center justify-center px-3 transition group"
					>
						<div
							style="background: var(--c-{NetworkOptions[
								NETWORKS[selectedNetworkIndex].network
							].toLowerCase()}-20);"
							class="absolute left-0 top-0 w-full h-full opacity-0 group-hover:opacity-100 transition"
						/>
						{#if steps.send_from_defi.defiFundAddressCopied}
							<IconTick />
						{:else}
							<IconCopy />
						{/if}
					</button>
				</p>
				<p class="px-2 text-c-on-bg-75 font-semibold mt-6">Wrap BAN Account</p>
				<p
					style="background: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}-10); color: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}); border-color: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}-20);"
					class="border rounded-lg pl-4 pr-14 py-3 mt-2 text-sm font-medium text-c-primary 
					break-all font-mono relative overflow-hidden"
				>
					{NETWORKS[selectedNetworkIndex].wrapAddressBAN}
					<button
						on:click={() => {
							steps.send_from_defi.wrapAddressCopied = true;
							if (steps.send_from_defi.wrapAddressTimeout)
								clearTimeout(steps.send_from_defi.wrapAddressTimeout);
							setTimeout(() => {
								steps.send_from_defi.wrapAddressCopied = false;
							}, copyDelay);
						}}
						use:copy={NETWORKS[selectedNetworkIndex].wrapAddressBAN}
						class="h-full absolute right-0 top-0 flex flex-row items-center justify-center px-3 transition group"
					>
						<div
							style="background: var(--c-{NetworkOptions[
								NETWORKS[selectedNetworkIndex].network
							].toLowerCase()}-20);"
							class="absolute left-0 top-0 w-full h-full opacity-0 group-hover:opacity-100 transition"
						/>
						{#if steps.send_from_defi.wrapAddressCopied}
							<IconTick />
						{:else}
							<IconCopy />
						{/if}
					</button>
				</p>
			</div>
			<Divider />
			<!-- Step: Wrap and send -->
			<div class="w-full flex flex-col pb-1">
				<p class="font-bold text-xl px-2">Step 2</p>
				<p class="text-c-on-bg-75 px-2 mt-1">
					{@html steps.wrap_and_send.descriptionFunc(
						amountToDistribute.toLocaleString('en-US'),
						NetworkOptions[NETWORKS[selectedNetworkIndex].network].toLowerCase(),
						NETWORKS[selectedNetworkIndex].explorer,
						NETWORKS[selectedNetworkIndex].farmManagerAddress
					)}
				</p>
				<p class="px-2 text-c-on-bg-75 font-semibold mt-6">Farm Manager Contract</p>
				<p
					style="background: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}-10); color: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}); border-color: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}-20);"
					class="border rounded-lg pl-4 pr-14 py-3 mt-2 text-sm font-medium text-c-primary 
					break-all font-mono relative overflow-hidden"
				>
					{NETWORKS[selectedNetworkIndex].farmManagerAddress}
					<button
						on:click={() => {
							steps.wrap_and_send.copied = true;
							if (steps.wrap_and_send.timeout) clearTimeout(steps.wrap_and_send.timeout);
							setTimeout(() => {
								steps.wrap_and_send.copied = false;
							}, copyDelay);
						}}
						use:copy={NETWORKS[selectedNetworkIndex].farmManagerAddress}
						class="h-full absolute right-0 top-0 flex flex-row items-center justify-center px-3 transition group"
					>
						<div
							style="background: var(--c-{NetworkOptions[
								NETWORKS[selectedNetworkIndex].network
							].toLowerCase()}-20);"
							class="absolute left-0 top-0 w-full h-full opacity-0 group-hover:opacity-100 transition"
						/>
						{#if steps.wrap_and_send.copied}
							<IconTick />
						{:else}
							<IconCopy />
						{/if}
					</button>
				</p>
			</div>
			<Divider />
			<!-- Step: Change Rewards -->
			<div class="w-full flex flex-col pb-1 ">
				<p class="font-bold text-xl px-2">Step 3</p>
				<p class="text-c-on-bg-75 px-2 mt-1">
					{steps.change_rewards.descriptionFunc()}
				</p>
				<p
					style="background: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}-10); color: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}); border-color: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}-20);"
					class="border rounded-lg pl-4 pr-14 py-3 mt-4 text-sm font-medium text-c-primary 
					break-all font-mono relative overflow-hidden"
				>
					{steps.change_rewards.commandTextFunc({
						network: NetworkOptions[NETWORKS[selectedNetworkIndex].network].toLowerCase(),
						address: NETWORKS[selectedNetworkIndex].farmManagerAddress,
						banASecond: floorTo(amountToDistribute / (timeInDays * dayInSeconds), maxDecimalPoints)
					})}
					<button
						on:click={() => {
							steps.change_rewards.copied = true;
							if (steps.change_rewards.timeout) clearTimeout(steps.change_rewards.timeout);
							steps.change_rewards.timeout = setTimeout(() => {
								steps.change_rewards.copied = false;
							}, copyDelay);
						}}
						use:copy={steps.change_rewards.commandTextFunc({
							network: NetworkOptions[NETWORKS[selectedNetworkIndex].network].toLowerCase(),
							address: NETWORKS[selectedNetworkIndex].farmManagerAddress,
							banASecond: floorTo(
								amountToDistribute / (timeInDays * dayInSeconds),
								maxDecimalPoints
							)
						})}
						class="h-full absolute right-0 top-0 flex flex-row items-center justify-center px-3 transition group"
					>
						<div
							style="background: var(--c-{NetworkOptions[
								NETWORKS[selectedNetworkIndex].network
							].toLowerCase()}-20);"
							class="absolute left-0 top-0 w-full h-full opacity-0 group-hover:opacity-100 transition"
						/>
						{#if steps.change_rewards.copied}
							<IconTick />
						{:else}
							<IconCopy />
						{/if}
					</button>
				</p>
			</div>
			<Divider />
			<!-- Step Extend Time -->
			<div class="w-full flex flex-col pb-1">
				<p class="font-bold text-xl px-2">Step 4</p>
				<p class="text-c-on-bg-75 px-2 mt-1">
					{steps.extend_time.descriptionFunc()}
				</p>
				<p
					style="background: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}-10); color: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}); border-color: var(--c-{NetworkOptions[
						NETWORKS[selectedNetworkIndex].network
					].toLowerCase()}-20);"
					class="border rounded-lg pl-4 pr-14 py-3 mt-4 text-sm font-medium text-c-primary 
					break-all font-mono relative overflow-hidden"
				>
					{steps.extend_time.commandTextFunc({
						network: NetworkOptions[NETWORKS[selectedNetworkIndex].network].toLowerCase(),
						address: NETWORKS[selectedNetworkIndex].farmManagerAddress,
						timeInSeconds: timeInDays * dayInSeconds
					})}
					<button
						on:click={() => {
							steps.extend_time.copied = true;
							if (steps.extend_time.timeout) clearTimeout(steps.extend_time.timeout);
							setTimeout(() => {
								steps.extend_time.copied = false;
							}, copyDelay);
						}}
						use:copy={steps.extend_time.commandTextFunc({
							network: NetworkOptions[NETWORKS[selectedNetworkIndex].network].toLowerCase(),
							address: NETWORKS[selectedNetworkIndex].farmManagerAddress,
							timeInSeconds: timeInDays * dayInSeconds
						})}
						class="h-full absolute right-0 top-0 flex flex-row items-center justify-center px-3 transition group"
					>
						<div
							style="background: var(--c-{NetworkOptions[
								NETWORKS[selectedNetworkIndex].network
							].toLowerCase()}-20);"
							class="absolute left-0 top-0 w-full h-full opacity-0 group-hover:opacity-100 transition"
						/>
						{#if steps.extend_time.copied}
							<IconTick />
						{:else}
							<IconCopy />
						{/if}
					</button>
				</p>
			</div>
		</div>
	</Transition>
</div>
