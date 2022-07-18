<template>
	<div>
		<div class="general-white-container average-container row">
			<div style="width: 70%" class="average-text-column">
				<div style="width: max-content" class="uppercase average-area-tag">
					{{ area }}
				</div>
				<h4>
					<div v-if="dataType === 'Salaries' && !general">
						{{ textSalaries[0] }}
					</div>
					<div v-if="dataType === 'Salaries' && general">
						{{ textSalaries[1] }}
					</div>
					<div v-if="dataType === 'Employment' && !general">
						{{ textEmployment[0] }}
					</div>
					<div v-if="dataType === 'Employment' && general">
						{{ textEmployment[1] }}
					</div>
				</h4>
				<div class="average-career-font">{{ career }}</div>
			</div>
			<div class="division"></div>
			<h3 class="center">
				<div v-if="dataType === 'Salaries'">
					<div v-if="!checkNumber(valueSalary)">No disponible</div>
					<div v-else>{{ textSalaries[2] }}{{ this.addDot(valueSalary) }}</div>
				</div>
				<div v-if="dataType === 'Employment'">
					<div v-if="!checkNumber(valueEmployment)">No disponible</div>
					<div v-else>
						{{ this.addZero(valueEmployment) }} de <br />
						cada 100
					</div>
				</div>
			</h3>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Average',
		props: {
			dataType: {
				type: String,
				required: true,
			},
			general: {
				type: Boolean,
				required: true,
			},
			area: {
				type: String,
				required: true,
				default: 'Área',
			},
			career: {
				type: String,
				required: true,
				default: 'Carrera',
			},
			valueSalary: {
				type: Number,
				default: 0,
			},
			valueEmployment: {
				type: Number,
				default: 0,
			},
		},
		watch: {
			valueSalary: function (newValue) {
				this.valueSalary = newValue;
			},
			valueEmployment: function (newValue) {
				this.valueEmployment = newValue;
			},
		},
		data() {
			return {
				textSalaries: [
					'Salario promedio profesionales',
					'Salario promedio profesionales',
					'$',
				],
				textEmployment: [
					'Empleabilidad promedio profesionales',
					'Empleabilidad promedio profesionales',
				],
			};
		},
		methods: {
			// this function adds a dot to the number if it is higher than 1000
			addDot(number) {
				if (number >= 1000) {
					number = Math.round(number);
					return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
				}
				return number;
			},
			// if number is 0, return information not available
			checkNumber(number) {
				if (number) {
					return false;
				}
				return true;
			},
		},
	};
</script>

<style scoped>
	.average-text-column {
		display: flex;
		flex-direction: column;
		text-align: left;
	}
	.average-career-font {
		font-weight: 700;
		color: var(--color-black-foggy);
	}
	.average-area-tag {
		background: #5669fb;
		border-radius: 2px;
		color: white;
		padding: 0.15rem 0.35rem 0.15rem 0.35rem;
	}
	.average-container {
		margin-right: 0.5rem;
		box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.15),
			0px 2px 6px 2px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		padding: 0.7rem 1.6rem 0.7rem 1.6rem;
	}
	.division {
		margin-left: 5px;
		width: 1px;
		background: var(--color-primary);
		margin-right: 5px;
		margin-top: 0.6rem;
		margin-bottom: 0.6rem;
	}
</style>
