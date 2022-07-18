<template>
	<div
		style="
			z-index: 1000;
			position: absolute;
			background: #5669fb;
			padding: 1rem;
			bottom: 1rem;
			right: 1rem;
			color: white;
			border-radius: 3px;
		"
	>
		<span>{{ getText(popUpType) }}</span>
		<span
			style="
				position: absolute;
				top: 0.03rem;
				right: 0.3rem;
				color: white;
				cursor: pointer;
			"
			@click="closePopUp"
			>x</span
		>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				texts: ['Falta completar los campos de búsqueda'],
			};
		},
		props: {
			popUpType: {
				type: Number,
				default: 0,
			},
		},
		methods: {
			getText(idx) {
				return this.texts[idx];
			},
			closePopUp() {
				this.$emit('closePopUp');
			},
		},
	};
</script>

<style scoped></style>
