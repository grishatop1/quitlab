<script lang="ts">
	import { goto } from '$app/navigation';
	import CircularBtn from '$lib/CircularBtn.svelte';
</script>

<div class="list"></div>

<div class="add">
	<CircularBtn
		onclick={() => {
			goto('/home/new');
		}}
	/>
</div>

<style>
	.add {
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
</style>
