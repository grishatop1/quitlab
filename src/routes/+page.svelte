<script lang="ts">
	import CircularBtn from '$lib/CircularBtn.svelte';
	import Title from '$lib/Title.svelte';
</script>

<header>
	<Title small />
</header>

<div class="list"></div>

<div class="add">
	<CircularBtn />
</div>

<style>
	header {
		padding: 16px;
	}
	.add {
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
</style>
