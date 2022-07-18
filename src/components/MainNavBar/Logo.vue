<template>
	<div class="row logo-container">
		<img src="@/assets/logo.svg" alt="" />
		<h1 class="uppercase logo-title">{{ $t('home.title') }}</h1>
	</div>
</template>
<style scoped>
	.logo-container {
		max-width: max-content;
		flex-flow: nowrap;
	}
	.logo-title {
		font-family: 'Roboto';
		font-size: 1.6rem;
		letter-spacing: 0.15rem;
		color: #2a3280;
		white-space: nowrap;
	}
	@media (max-width: 700px) {
		.logo-title {
			display: none;
		}
	}
</style>
