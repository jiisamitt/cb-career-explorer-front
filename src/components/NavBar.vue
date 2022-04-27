<template>
	<div>
		<span
			:class="getClass(element)"
			@click="handleClick(element)"
			v-for="(element, index) in elements"
			:key="index"
			>{{ element }}</span
		>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: 'NavBar',
				elements: ['Salarios', 'Empleabilidad', 'Comparador de Carreras'],
				clickedElement: 'Salarios',
			};
		},
		methods: {
			handleClick(element) {
				this.clickedElement = element;
				if (element === 'Comparador de Carreras') {
					this.$emit('clickedElement', 'Comparador');
				} else {
					this.$emit('clickedElement', element);
				}
			},
			getClass(element) {
				if (this.clickedElement === element) {
					return 'navbar-element navbar-element-clicked ';
				}
				return 'navbar-element';
			},
		},
	};
</script>

<style scoped>
	.navbar-element {
		background: rgb(182, 221, 235);
		padding: 0.5rem;
		border-radius: 5px;
		margin: 0.5rem;
		cursor: pointer;
	}
	.navbar-element-clicked {
		background: rgb(48, 132, 163);
	}
	.navbar-element:hover {
		background: rgb(130, 187, 207);
	}
	.navbar-element:active {
		background: rgb(101, 135, 148);
	}
</style>
