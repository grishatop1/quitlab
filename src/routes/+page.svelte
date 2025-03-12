<script>
	import Title from '$lib/Title.svelte';
	import Button from '$lib/basic/Button.svelte';
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
	}
	.title {
		display: flex;
		justify-content: center;
	}
	.desc {
		margin: 20px;
	}
	.btn {
		text-align: center;
	}
</style>
