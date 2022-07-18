<template>
	<div v-click-outside="displayOff" class="ranking-modal-container">
		<div>Lista</div>
		<table class="ranking-modal-container-table">
			<tr>
				<th>Posición</th>
				<th>Nivel</th>
				<th>Área</th>
				<th>Carrera</th>
				<th>Salario o empleabilidad (cambiar)</th>
			</tr>
			<tr class="" v-for="(element, index) in list" :key="index">
				<td>{{ index }}</td>
				<td>{{ element.level }}</td>
				<td>{{ element.area }}</td>
				<td>{{ element.career }}</td>
				<td v-if="listType === 'Salaries'">${{ element.salary }}</td>
				<td v-else>{{ element.employment }}%</td>
			</tr>
		</table>
	</div>
</template>

<script>
	import ClickOutside from 'vue-click-outside';
	export default {
		directives: {
			ClickOutside,
		},
		props: {
			list: {
				type: Array,
				required: true,
			},
			listType: {
				type: String,
				required: true,
			},
		},
		methods: {
			displayOff() {
				this.$emit('closeRankingModal');
			},
		},
	};
</script>
<style scoped>
	.ranking-modal-container {
		position: absolute;
		background: white;
		z-index: 11;
		max-height: 60%;
		width: 80%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.ranking-modal-container-table {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	}
</style>
