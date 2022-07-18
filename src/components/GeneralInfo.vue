<template>
	<div class="general-info-container">
		<img
			style="
				transform: scale(1.7);
				float: right;
				clear: right;
				margin-top: -1rem;
				margin-right: 2.5rem;
			"
			src="@/assets/vector.svg"
			v-if="!averageDisplayed"
			@click="openClose"
		/>
		<div v-if="averageDisplayed" style="gap: 0rem" class="row mb1">
			<Average
				:data-type="salaryOrEmployment"
				:general="false"
				:area="area"
				:career="career"
				:valueSalary="valueSalaryCareer"
				:valueEmployment="valueEmploymentCareer"
			/>
			<Average
				:data-type="salaryOrEmployment"
				:general="true"
				:area="area"
				:career="'General'"
				:valueSalary="valueSalaryGeneral"
				:valueEmployment="valueEmploymentGeneral"
			/>
		</div>
		<img
			style="
				transform: scale(1.7) rotate(180deg);
				float: right;
				clear: right;
				margin-top: -1rem;
				margin-right: 2.5rem;
			"
			src="@/assets/vector.svg"
			v-if="averageDisplayed"
			@click="openClose"
		/>
		<hr
			v-if="averageDisplayed"
			style="border: 0.5px solid #a7aebe"
			class="ml1 mr1 mb1 mt1"
		/>
		<br />
		<div class="average-text-column ml1">
			<div style="width: max-content" class="uppercase average-area-tag">
				{{ area }}
			</div>
			<h2>{{ career }}</h2>
			<h4 style="margin-top: -0.2rem">
				<div v-if="salaryOrEmployment === 'Salaries'">Salario</div>
				<div v-if="salaryOrEmployment === 'Employment'">Empleabilidad</div>
			</h4>
			<div>
				<SwitchUI
					:leftOrRight="leftOrRight"
					:optionLeft="'Años de graduado'"
					:optionRight="'Nivel educativo'"
					@handleClick="selectGraph"
				/>
			</div>
		</div>
		<div class="row mt1 ml1">
			<Graph
				:salaryOrEmployment="salaryOrEmployment"
				:graduatedYearsOrLevel="graduatedYearsOrLevel"
				:dataSet="dataSet"
			/>
		</div>
	</div>
</template>

<script>
	import SwitchUI from './General/SwitchUI.vue';
	import Average from '../components/Average';
	import Graph from '../components/UI/Graph/Graph';
	export default {
		data() {
			return {
				leftOrRight: 'left',
				graduatedYearsOrLevel: 'GraduatedYears',
				dataSetSalary: [10, 20, 30, 40],
				dataSetEmployment: [50, 60, 70, 80],
				dataSet: [1, 2, 3, 4],
				averageDisplayed: true,
			};
		},
		mounted() {
			this.dataSetSalary = this.dataSetGraduatedYearsSalary;
			this.dataSetEmployment = this.dataSetGraduatedYearsEmployment;
			if (this.salaryOrEmployment === 'Salaries') {
				this.dataSet = this.dataSetSalary;
			} else {
				this.dataSet = this.dataSetEmployment;
			}
		},
		props: {
			salaryOrEmployment: {
				type: String,
				default: '',
			},
			area: {
				type: String,
				required: true,
			},
			career: {
				type: String,
				required: true,
			},
			valueSalaryCareer: {
				type: Number,
				default: 0,
			},
			valueSalaryGeneral: {
				type: Number,
				default: 0,
			},
			valueEmploymentCareer: {
				type: Number,
				default: 0,
			},
			valueEmploymentGeneral: {
				type: Number,
				default: 0,
			},
			/*
			year: {
				type: String,
				required: true,
			},
			*/
			dataSetGraduatedYearsSalary: {
				type: Array,
			},
			dataSetLevelsSalary: {
				type: Array,
			},
			dataSetGraduatedYearsEmployment: {
				type: Array,
			},
			dataSetLevelsEmployment: {
				type: Array,
			},
		},
		components: {
			Average,
			Graph,
			SwitchUI,
		},
		watch: {
			valueSalaryCareer: function () {
				if (this.salaryOrEmployment === 'Salaries') {
					this.dataSet = this.dataSetGraduatedYearsSalary;
				} else {
					this.dataSet = this.dataSetGraduatedYearsEmployment;
				}
			},

			salaryOrEmployment: function (newValue) {
				this.salaryOrEmployment = newValue;
				if (this.salaryOrEmployment === 'Salaries') {
					this.dataSet = this.dataSetGraduatedYearsSalary;
				} else {
					this.dataSet = this.dataSetGraduatedYearsEmployment;
				}
			},
		},
		methods: {
			selectGraph(clickedElement) {
				if (clickedElement != this.graduatedYearsOrLevel) {
					if (clickedElement === 'left') {
						this.leftOrRight = 'left';
						this.graduatedYearsOrLevel = 'GraduatedYears';
						if (this.salaryOrEmployment === 'Salaries') {
							this.dataSet = this.dataSetGraduatedYearsSalary;
						} else {
							this.dataSet = this.dataSetGraduatedYearsEmployment;
						}
					} else {
						this.leftOrRight = 'right';
						this.graduatedYearsOrLevel = 'Level';
						if (this.salaryOrEmployment === 'Salaries') {
							this.dataSet = this.dataSetLevelsSalary;
						} else {
							this.dataSet = this.dataSetLevelsEmployment;
						}
					}
				}
			},
			classGetter(type) {
				if (this.graduatedYearsOrLevel === type) {
					return 'general-info-selector-selected';
				}
			},
			openClose() {
				this.averageDisplayed = !this.averageDisplayed;
				this.$emit('closeAverage');
			},
		},
	};
</script>
<style scoped>
	.general-info-selector-left {
		background: #bbc3fd;
		border-radius: 4px 0px 0px 4px;
		padding: 0.3rem 1rem 0.3rem 1rem;
		color: white;
		cursor: pointer;
	}
	.general-info-selector-right {
		background: #bbc3fd;
		border-radius: 0px 4px 4px 0px;
		padding: 0.3rem 1rem 0.3rem 1rem;
		color: white;
		cursor: pointer;
	}
	.general-info-selector-selected {
		background: #5669fb;
	}
	.general-info-container {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}
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
		padding: 0.3rem 0.5rem 0.3rem 0.5rem;
	}
</style>
