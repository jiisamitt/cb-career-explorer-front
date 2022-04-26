<template>
	<div>
		<span v-for="(element, index) in elements" :key="index">{{ element }}</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: 'NavBar',
				elements: ['Salarios', 'Empleabilidad', 'Comparador de Carreras'],
			};
		},
	};
</script>

<style scoped></style>
