<template>
	<Bar
		:chart-options="chartOptions"
		:chart-data="chartData"
		:chart-id="chartId"
		:dataset-id-key="datasetIdKey"
		:plugins="plugins"
		:css-classes="cssClasses"
		:styles="styles"
		:width="width"
		:height="height"
	/>
</template>

<script>
	import { Bar } from 'vue-chartjs/legacy';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
	} from 'chart.js';

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale
	);
	import { mapGetters } from 'vuex';

	export default {
		name: 'BarChart',
		components: { Bar },
		props: {
			chartId: {
				type: String,
				default: 'bar-chart',
			},
			datasetIdKey: {
				type: String,
				default: 'label',
			},
			width: {
				type: Number,
				default: 9,
			},
			height: {
				type: Number,
				default: 3,
			},
			cssClasses: {
				default: '',
				type: String,
			},
			styles: {
				type: Object,
				default: () => {},
			},
			plugins: {
				type: Object,
				default: () => {},
			},
			shownInfo: {
				type: String,
				default: '',
			},
			dataSet: {
				type: Array,
				required: true,
			},
			yearsOrInstitution: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				dataList: [],
				chartData: {
					labels: this.getLabels(this.dataSet),
					datasets: [
						{
							data: this.dataSet,
							backgroundColor: '#a0abfa',
							label: '',
						},
					],
				},
				chartOptions: {
					responsive: true,
					scales: {
						x: {
							grid: {
								display: false,
							},
							ticks: {
								font: {
									family: 'Karla',
									size: 14,
								},
							},
							title: {
								display: true,
								text:
									this.yearsOrInstitution === 'Years'
										? 'Años de Graduados'
										: 'Nivel educativo',
								font: {
									family: 'Karla',
									size: 20,
								},
							},
						},
						y: {
							ticks: {
								font: {
									family: 'Karla',
									size: 14,
								},
							},
							title: {
								display: true,
								text: this.shownInfo === 'Salary' ? 'Salario' : 'Empleabilidad',

								font: {
									family: 'Karla',
									size: 20,
								},
							},
						},
					},
					plugins: {
						legend: {
							display: false,
						},
					},
				},
			};
		},
		computed: {
			...mapGetters({
				institutions: 'base/institutions',
			}),
		},
		methods: {
			// if dataset is length 1 return ['1']
			//if data set is length 2 return ['1', '2']
			//if data set is length 3 return ['1', '2', '3']
			// and so on

			getLabels(datasetarray) {
				const labels = [];
				for (let i = 1; i <= datasetarray.length; i++) {
					labels.push(i.toString());
				}
				return labels;
			},
		},
		watch: {
			dataSet: function (newValue) {
				this.dataSet = newValue;
				this.chartData.datasets[0].data = this.dataSet;
				this.chartData.labels = this.getLabels(this.dataSet);
			},
			shownInfo: function (newValue) {
				this.shownInfo = newValue;
				this.chartOptions.scales.y.title.text =
					this.shownInfo === 'Salary' ? 'Salario' : 'Empleabilidad';
			},
			yearsOrInstitution: function (newValue) {
				this.yearsOrInstitution = newValue;
				this.chartOptions.scales.x.title.text =
					this.yearsOrInstitution === 'Years'
						? 'Años de Graduados'
						: 'Nivel educativo';
			},
		},
	};
</script>
<style scoped></style>
