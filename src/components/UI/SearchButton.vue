<template>
	<div style="">
		<button class="white small karla search-bar-button" @click="clickSearch()">
			{{ $t('home.search-bar-button') }}
		</button>
	</div>
</template>

<script>
	export default {
		methods: {
			clickSearch() {
				this.$emit('search');
			},
		},
	};
</script>

<style scoped>
	.search-bar-button {
		border: 0px;
		background-color: var(--color-primary);
		border-radius: 40px;
		height: 2rem;
		width: 7rem;
		cursor: pointer;
	}
	.search-bar-button:active {
		background-color: var(--color-primary-foggy);
	}
</style>
