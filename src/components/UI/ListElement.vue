<template>
	<div class="element-container row center">
		<span class="ml1 element-rank small">{{ rank }}</span>
		<table class="list-table-container">
			<tr>
				<th style="width: 15%" class="list-table-border-bottom">Nivel</th>
				<th
					style="width: 30%"
					class="list-table-border-left list-table-border-bottom"
				>
					Área
				</th>
				<th
					style="width: 40%"
					class="list-table-border-left list-table-border-bottom"
				>
					Carrera
				</th>
				<th
					style="width: 15%"
					class="list-table-border-left list-table-border-bottom"
				>
					<span v-if="salaryOrEmployment === 'Salaries'">Salario (CLP)</span>
					<span v-else>Empleabilidad (%)</span>
				</th>
			</tr>
			<tr>
				<td>{{ level }}</td>
				<td class="list-table-border-left">{{ area }}</td>
				<td class="list-table-border-left">{{ career }}</td>
				<td
					v-if="salaryOrEmployment === 'Salaries'"
					class="list-table-border-left"
				>
					{{ truncateNumber(salary) }}
				</td>
				<td v-else class="list-table-border-left">
					{{ truncateNumber(toPercentage(employment)) }}
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: 'ListElement',
			};
		},
		props: {
			rank: {
				type: String,
				default: '-1',
			},
			level: {
				type: String,
				default: 'NAN',
			},
			area: {
				type: String,
				default: 'NAN',
			},
			career: {
				type: String,
				default: 'NAN',
			},
			salary: {
				type: String,
				default: '-1',
			},
			// en caso de que empresas exista
			// isRanked: {
			//     type: Boolean,
			//     default: false,
			// },
			// isRanked: {
			//     type: Boolean,
			//     default: true,
			// },
			employment: {
				type: String,
				default: '-1',
			},
			salaryOrEmployment: {
				type: String,
				default: '',
			},
		},
		methods: {
			//aproximate number to 2 decimal places
			truncateNumber(number) {
				return Math.round(number);
			},
			// change number to percentage from 0-1 to 0-100
			toPercentage(number) {
				return Math.trunc(number * 100);
			},
		},
	};
</script>
<style scoped>
	.element-container {
		box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.15),
			0px 2px 6px 2px rgba(0, 0, 0, 0.1);
	}
	.element-rank {
		background: #5669fb;
		border-radius: 2px;
		min-width: 17px;
		min-height: 17px;
		color: white;
		padding: 0.25rem;
	}
	.list-table-container {
		text-align: left;
		width: 95%;
		margin: auto;
		border-spacing: 0px;
	}
	.list-table-border-left {
		border-left: 1px solid #dddddd73;
		padding: 0.5rem;
		padding-left: 1rem;
	}
	.list-table-border-bottom {
		border-bottom: 1px solid #94979e;
	}
</style>
