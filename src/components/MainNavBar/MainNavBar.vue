<template>
	<div class="row main-nav-bar-container">
		<Logo class="main-nav-bar-element" />
		<SearchBar class="main-nav-bar-element" />
		<NavBar class="main-nav-bar-element" />
	</div>
</template>

<script>
	import Logo from './Logo.vue';
	import SearchBar from './SearchBar.vue';
	import NavBar from './NavBar.vue';
	export default {
		components: {
			Logo,
			SearchBar,
			NavBar,
		},
	};
</script>
<style scoped>
	.main-nav-bar-element {
	}
	.main-nav-bar-container {
		padding: 1% 3% 1% 3%;
		align-items: center;
		justify-content: center;
		gap: 2%;
		box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.1);
		height: 10%;
		flex-flow: nowrap;
	}
	@media (max-width: 700px) {
		.main-nav-bar-container {
			gap: 5%;
		}
	}
</style>
