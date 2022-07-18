<template>
	<div class="general-container">
		<!-- start loader -->
		<v-progress-circular
			v-if="loadingCount < numberOfRequests"
			style="margin: auto; margin-top: 5rem"
			class="mt2"
			:size="70"
			:width="7"
			color="purple base-1"
			indeterminate
		></v-progress-circular>
		<!-- end loader -->

		<!-- start content -->
		<div class="general-content-container">
			<!-- start career title and switch -->
			<!-- <v-scale-transition origin="center"> -->
			<div class="general-title mt2" v-show="loadingCount === numberOfRequests">
				<div style="margin-left: 0.5rem; font-size: 1.5rem; font-weight: 700">
					{{ searchValues.career.name }}
				</div>
				<div class="mb1" style="margin-left: 0.5rem">
					{{ searchValues.institution.label }}
				</div>
				<SwitchUI
					:left="$t('general.switch-left')"
					:right="$t('general.switch-right')"
					@handleChange="changeShownInfo"
				/>
			</div>
			<!-- </v-scale-transition> -->
			<!-- end career title and switch -->

			<!-- start career salary/employability -->
			<!-- <v-scale-transition origin="center"> -->
			<div style="overflow-x: auto" v-show="loadingCount === numberOfRequests">
				<div class="general-average-values">
					<AverageValues
						style="margin-left: 1rem"
						:general="false"
						:option="shownInfo"
						:name="searchValues.career.name"
						:value="careerShownValue"
					/>
					<AverageValues
						style="margin-right: 1rem"
						:general="true"
						:option="shownInfo"
						:name="searchValues.area.name"
						:value="areaShownValue"
					/>
				</div>
			</div>
			<!-- </v-scale-transition> -->
			<!-- end career salary/employability -->

			<!-- start top 10 & ranking -->
			<!-- <v-scale-transition origin="center"> -->
			<div class="general-top-rank" v-show="loadingCount === numberOfRequests">
				<div class="general-top-rank-subcontainer">
					<div class="mb2 general-top-rank-text">
						{{ $t('general.top.common') }}
						<span v-if="shownInfo === 'Salary'" style="font-weight: bolder"
							>Salario</span
						>
						<span v-else style="font-weight: bolder">Empleabilidad</span>
						<!-- {{ $t('general.top.common-2') }} -->
					</div>
					<v-btn
						class="white--text float-left ml3 mb1"
						@click="showTop = true"
						color="purple base-2"
					>
						{{ $t('general.modal-btn') }}
						<v-icon class="ml3">mdi-arrow-right</v-icon></v-btn
					>
				</div>
				<div class="general-top-rank-subcontainer">
					<h3 class="mb2 general-top-rank-text">
						{{ $t('general.ranking') }}
					</h3>
					<v-btn
						class="white--text float-left ml3 mb1"
						@click="showRanking = true"
						color="purple base-2"
					>
						{{ $t('general.modal-btn')
						}}<v-icon class="ml3">mdi-arrow-right</v-icon></v-btn
					>
				</div>
			</div>
			<!-- Start Top modal-->
			<v-dialog v-model="showTop" width="75%" height="75%"
				><Top
					v-if="showTop"
					:shownInfo="shownInfo"
					:areaId="searchValues.area.id"
					:careerId="searchValues.career.id"
			/></v-dialog>
			<!-- End Top modal-->
			<!-- Start Ranking modal-->
			<v-dialog v-model="showRanking" width="75%" height="75%"
				><Ranking
					v-if="showRanking"
					:shownInfo="shownInfo"
					:careerId="searchValues.career.id"
			/></v-dialog>
			<!-- End Ranking modal-->
			<!-- </v-scale-transition> -->
			<!-- end top 10 & ranking -->

			<!-- start graph -->
			<div
				class="general-graph mb2 general-graph-text"
				v-show="loadingCount === numberOfRequests"
			>
				<div class="mb1" v-if="yearsOrInstitution === 'Years'">
					{{ $t('general.graph.years') }}
				</div>
				<div class="mb1" v-if="yearsOrInstitution === 'Institution'">
					{{ $t('general.graph.institution') }}
				</div>
				<SwitchUI2
					class="mb2"
					:left="$t('general.graph.switch-left')"
					:right="$t('general.graph.switch-right')"
					@handleChange="changeGraph"
				/>

				<Graph
					class="general-graph-container"
					:shownInfo="shownInfo"
					:yearsOrInstitution="yearsOrInstitution"
					:dataSet="dataSet"
				/>
			</div>
			<!-- end graph -->
		</div>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex';
	import SwitchUI from './SwitchUI.vue';
	import AverageValues from './AverageValues.vue';
	import Ranking from './RankingModal.vue';
	import Top from './TopModal.vue';
	import Graph from './Graph/Graph.vue';
	import SwitchUI2 from './SwitchUI2.vue';
	export default {
		data() {
			return {
				shownInfo: 'Salary',
				careerSalary: 0,
				areaSalary: 0,
				careerEmployability: 0,
				areaEmployability: 0,
				careerShownValue: 0,
				areaShownValue: 0,
				showRanking: false,
				showTop: false,
				yearsOrInstitution: 'Years',
				//loadingCount has to be 8 to stop the loader, because there are 4 requests (then)
				loadingCount: 0,
				numberOfRequests: 7,
				dataSet: [{ average: 30 }, { average: 20 }],
				dataSetSalaryYears: [],
				dataSetSalaryInstitution: [],
				dataSetEmployabilityYears: [],
				dataSetEmployabilityInstitution: [],
			};
		},
		components: {
			SwitchUI,
			AverageValues,
			Ranking,
			Top,
			Graph,
			SwitchUI2,
		},
		computed: {
			...mapGetters({
				searchValues: 'base/searchValues',
			}),
		},
		mounted() {
			// start getting information of career from endpoint
			// average salaries and employability rates
			this.getValue({
				criteria: 'Salary',
				type: 'Career',
				id: this.searchValues.career.id,
			}).then((res) => {
				this.loadingCount++;
				this.careerSalary = res.salary__avg;
			});
			this.getValue({
				criteria: 'Salary',
				type: 'Area',
				id: this.searchValues.area.id,
			}).then((res) => {
				this.loadingCount++;
				this.areaSalary = res.percent_employability__avg;
			});
			this.getValue({
				criteria: 'Employability',
				type: 'Career',
				id: this.searchValues.career.id,
			}).then((res) => {
				this.loadingCount++;
				this.careerEmployability = res.salary__avg;
			});
			this.getValue({
				criteria: 'Employability',
				type: 'Area',
				id: this.searchValues.area.id,
			}).then((res) => {
				this.loadingCount++;
				this.areaEmployability = res.percent_employability__avg;
			});
			//salaries and employability rates of career by years after grad
			this.getCareersByYears({
				criteria: 'Salary',
				careerId: this.searchValues.career.id,
			}).then((res) => {
				this.loadingCount++;
				this.dataSetSalaryYears = res.map((x) => x.average);
				//default dataset
				this.dataSet = this.dataSetSalaryYears;
			});
			this.getCareersByYears({
				criteria: 'Employability',
				careerId: this.searchValues.career.id,
			}).then((res) => {
				this.loadingCount++;
				this.dataSetEmployabilityYears = res.map((x) => x.average);
			});
			this.getCareersByLevel({
				criteria: 'Salary',
				careerId: this.searchValues.career.id,
			}).then((res) => {
				this.loadingCount++;
				this.dataSetSalaryInstitution = Object.keys(res).map(
					(x) => res[x].average
				);
			});
			this.getCareersByLevel({
				criteria: 'Employability',
				careerId: this.searchValues.career.id,
			}).then((res) => {
				this.loadingCount++;
				this.dataSetEmployabilityInstitution = Object.keys(res).map(
					(x) => res[x].average
				);
			});
			//end getting information of career from endpoint
		},
		methods: {
			...mapActions({
				getValue: 'base/getAverageSalaryOrEmployability',
				getCareersByYears: 'base/getCareersByYearsAfterGrad',
				getCareersByLevel: 'base/getCareersByLevel',
			}),
			changeShownInfo(newShownInfo) {
				this.shownInfo = newShownInfo;
				if (this.shownInfo === 'Employability') {
					this.careerShownValue = this.careerEmployability;
					this.areaShownValue = this.areaEmployability;
					if (this.yearsOrInstitution === 'Years') {
						this.dataSet = this.dataSetEmployabilityYears;
					} else {
						this.dataSet = this.dataSetEmployabilityInstitution;
					}
				} else {
					this.careerShownValue = this.careerSalary;
					this.areaShownValue = this.areaSalary;
					if (this.yearsOrInstitution === 'Years') {
						this.dataSet = this.dataSetSalaryYears;
					} else {
						this.dataSet = this.dataSetSalaryInstitution;
					}
				}
			},
			changeGraph() {
				if (this.yearsOrInstitution === 'Years') {
					this.yearsOrInstitution = 'Institution';
					if (this.shownInfo === 'Employability') {
						this.dataSet = this.dataSetEmployabilityInstitution;
					} else {
						this.dataSet = this.dataSetSalaryInstitution;
					}
				} else {
					this.yearsOrInstitution = 'Years';
					if (this.shownInfo === 'Employability') {
						this.dataSet = this.dataSetEmployabilityYears;
					} else {
						this.dataSet = this.dataSetSalaryYears;
					}
				}
			},
		},
	};
</script>
<style scoped>
	.general-container {
		width: 100vw;
		height: 100%;
	}
	.general-content-container {
		width: 100vw;
		margin: auto;
		padding-left: 10%;
		padding-right: 10%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.general-title {
		height: 7rem;
		text-align: start;
		color: var(--color-black-1);
	}

	.general-average-values {
		height: 8rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1rem 0 1rem 0;
		background: #5669fb;
		border-radius: 6px;
		min-width: 54rem;
	}

	.general-top-rank {
		height: 10rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	.general-top-rank-subcontainer {
		width: 100%;
		height: 100%;
		background: white;
		border-radius: 6px;
		box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.1);
	}
	.general-top-rank-text {
		padding-left: 1rem;
		font-weight: 500;
		font-size: 1.2rem;
		color: var(--color-black-1);
		text-align: left;
	}
	.general-graph {
		height: 35rem;
		align-items: center;
		justify-content: center;
		background: white;
		box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.1);
	}
	.general-graph-text {
		padding-left: 1rem;
		font-weight: 500;
		font-size: 1.2rem;
		color: var(--color-black-1);
		text-align: left;
	}
	.general-graph-container {
		width: 80%;
	}
	@media (max-width: 700px) {
		.general-content-container {
			margin: auto;
			padding-left: 0;
			padding-right: 0;
		}
		.general-top-rank {
			height: 25rem;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1rem;
		}
	}
	@media (max-width: 340px) {
		.general-content-container {
			gap: 3rem;
		}
	}
</style>
