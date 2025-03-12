<script>
	import Button from '$lib/basic/Button.svelte';
	import Title from '$lib/Title.svelte';
</script>

<main>
	<div class="title">
		<Title />
	</div>
	<div class="desc">
		QuitLab helps you take control of your habits—breaking bad ones and building mental clarity for
		a better you.
	</div>
	<div class="btn">
		<Button>I'm ready</Button>
	</div>
</main>

<style>
	main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.desc {
		margin: 20px;
	}
</style>
