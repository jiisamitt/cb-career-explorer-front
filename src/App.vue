<template>
	<v-app id="app">
		<!-- start main navbar and title-->

		<MainNavBar />

		<!-- end main navbar and title -->

		<!-- start content/component (welcome, general info, career comparer) -->
		<Welcome v-if="selectedView === 'Landing'" />
		<General v-if="selectedView === 'General'" />
		<CareerComparer v-if="selectedView === 'Career Comparer'" />
		<!-- eventually simulator 
		<Simulator />
		-->
		<!-- end end content/component (welcome, general info, career comparer) -->
	</v-app>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex';
	import MainNavBar from './components/MainNavBar/MainNavBar.vue';
	import Welcome from './components/Welcome/Welcome.vue';
	import General from './components/General/General.vue';
	import CareerComparer from './components/CareerComparer/CareerComparer.vue';

	export default {
		data() {
			return {
				name: 'App',
			};
		},
		components: {
			MainNavBar,
			Welcome,
			General,
			CareerComparer,
		},
		computed: {
			...mapGetters({
				selectedView: 'base/selectedView',
			}),
		},
		methods: {
			...mapActions({}),
			/*
			setShowPopUp() {
				this.showPopUp = true;
				setTimeout(() => {
					this.showPopUp = false;
				}, 4000);
			},
			closePopUp() {
				this.showPopUp = false;
			},
			handleELement(element) {
				this.clickedElement = element;
				if (this.clickedElement === 'Career Comparer') {
					this.clickedSubElement = 'Empty';
				}
			},
			handleSubElement(element) {
				this.averageDisplayed = true;
				if (element === 'Top 10') {
					this.clickedSubElement = 'Top10';
				} else if (element === 'Salaries' || element === 'Employment') {
					this.clickedSubElement = 'GeneralInfo';
				} else {
					this.clickedSubElement = element;
				}
			},
			handleSearch(sentDictionary) {
				// HERE IS WHERE YOU WILL GET DATA FROM API AND FILTER ACCORDING TO THE SEARCH
				// If the search is not empty in every field, then it will be considered as a valid search
				for (let key in sentDictionary) {
					if (sentDictionary[key].id === '') {
						this.isSearched = false;
						this.setShowPopUp();
						return;
					}
				}
				this.isLoading = true;
				this.searchedValues = sentDictionary;
				this.dataSetGraduatedYearsSalary = null;
				this.dataSetLevelsSalary = null;
				this.dataSetGraduatedYearsEmployment = null;
				this.dataSetLevelsEmployment = null;
				//get general info
				this.getAverageSalaryOrEmploymentInArea({
					criteria: 'Salaries',
					areaId: this.searchedValues.area.id,
				}).then((res) => {
					this.valueSalaryGeneral = res.salary__avg;
				});
				this.getAverageSalaryOrEmploymentInCareer({
					criteria: 'Salaries',
					careerId: this.searchedValues.career.id,
				}).then((res) => {
					this.valueSalaryCareer = res.salary__avg;
				});
				this.getAverageSalaryOrEmploymentInArea({
					criteria: 'Employment',
					areaId: this.searchedValues.area.id,
				}).then((res) => {
					this.valueEmploymentGeneral = res.percent_employability__avg;
				});
				this.getAverageSalaryOrEmploymentInCareer({
					criteria: 'Employment',
					careerId: this.searchedValues.career.id,
				}).then((res) => {
					this.valueEmploymentCareer = res.percent_employability__avg;
				});
				//get info for bar chart
				this.getAverageSalaryByCareer(this.searchedValues.career.id).then(
					(res) => {
						console.log('salary', res);
						this.dataSetLevelsSalary = res.map((x) => x.average.toString());
						this.dataSetGraduatedYearsSalary = res.map((x) =>
							x.average.toString()
						);
					}
				);
				this.getAverageEmploymentByCareer(this.searchedValues.career.id).then(
					(res) => {
						console.log('employm', res);
						this.dataSetLevelsEmployment = res.map((x) => x.average.toString());
						this.dataSetGraduatedYearsEmployment = res.map((x) =>
							x.average.toString()
						);
					}
				);
				// get info for top 10 // bottom 10
				//top10 salary
				this.getTopOrBottomCareersByArea({
					criteria: '-salary',
					areaId: this.searchedValues.area.id,
				}).then((res) => {
					this.topSalary = res;
				});
				//bottom 10 salary
				this.getTopOrBottomCareersByArea({
					criteria: 'salary',
					areaId: this.searchedValues.area.id,
				}).then((res) => {
					this.bottomSalary = res;
				});
				//top10 employment
				this.getTopOrBottomCareersByArea({
					criteria: 'employability',
					areaId: this.searchedValues.area.id,
				}).then((res) => {
					this.topEmployment = res;
				});
				//bottom 10 employment
				this.getTopOrBottomCareersByArea({
					criteria: '-employability',
					areaId: this.searchedValues.area.id,
				}).then((res) => {
					this.bottomEmployment = res;
					this.isLoading = false;
				});
				// get ranking
				//this.getAllCareersByCriteria('-employability').then((res) => {
				//	this.bottomEmployment = res;
				//});
				this.isSearched = true;
				if (!this.firstSearch) {
					this.clickedSubElement = 'GeneralInfo';
					this.firstSearch = true;
				}
			},
			displayList() {
				this.showRanking = !this.showRanking;
			},
			*/
		},
	};
</script>
<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Karla');
	@import url('https://fonts.googleapis.com/css?family=Montserrat');
	:root {
		--color-primary: #5669fb;
		--color-primary-foggy: #7887fc;
		--color-welcome-background: #d9deff;
		--color-main-background: #f6f8ff;
		--color-black-1: #4a4b4f;
		--color-black-foggy: #888a91;
		--color-blue-2: #1161f8;
		--color-pink-1: #ffd6d6;
		--color-pink-2: #c290f3;
		--color-red-1: #ff0c4f;
		--color-white-1: white;
		--color-purple-1: #5463ff;
	}
	#app {
		font-family: Karla, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: black;
		background: var(--color-main-background);
		overflow-y: hidden;
	}
	/* margin elements */
	.mt1 {
		margin-top: 1.5rem;
	}
	.mt2 {
		margin-top: 3rem;
	}
	.mb1 {
		margin-bottom: 1.5rem;
	}
	.mb2 {
		margin-bottom: 3rem;
	}
	.mb3 {
		margin-bottom: 0.7rem;
	}
	.ml1 {
		margin-left: 2rem;
	}
	.ml2 {
		margin-left: 4rem;
	}
	.ml3 {
		margin-left: 1rem;
	}
	.mr1 {
		margin-right: 2rem;
	}

	/* colors */

	.blue-1 {
		color: var(--color-blue-1);
	}
	.blue-2 {
		color: var(--color-blue-2);
	}
	.pink-1 {
		color: var(--color-pink-1);
	}
	.pink-2 {
		color: var(--color-pink-2);
	}
	.red-1 {
		color: var(--color-red-1);
	}
	.white {
		color: #fff;
	}
	.black {
		color: #000;
	}

	/* fonts */

	.karla {
		font-family: 'Karla';
	}
	.montserrat {
		font-family: 'Montserrat';
	}

	/* sizes */

	.tiny {
		font-size: 0.625rem;
	}
	.small {
		font-size: 0.8rem;
	}
	.medium {
		font-size: 1.2rem;
	}
	.large {
		font-size: 1.6rem;
	}

	/* weights */

	.bold {
		font-weight: 700;
	}
	.light {
		font-weight: 200;
	}
	.bolder {
		font-weight: 900;
	}

	/* upper case */
	.uppercase {
		text-transform: uppercase;
	}
	/* lower case */
	.lowercase {
		text-transform: lowercase;
	}
	/* capitalize */
	.capitalize {
		text-transform: capitalize;
	}

	/* display columns */
	.col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* display rows */
	.row {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	/* align items */
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* float left */
	.float-left {
		float: left;
	}

	/* float right */
	.float-right {
		float: right;
	}

	/* shadow */
	.shadow {
		box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.2);
	}

	/* background */

	.white-bg {
		background: white;
	}
	.black-background {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.247);
		z-index: 10;
	}

	/* main navigation bar */
	.app-main-nav-bar {
		align-items: center;
		box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.1);
		background: var(--color-welcome-background);
	}
	/* general container */
	.general-white-container {
		border-radius: 4px;
		box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.1);
		background: white;
		margin-left: 2rem;
		margin-right: 2rem;
	}
	/* transition */
	.transition-enter-active,
	.transition-leave-active {
		transition: opacity 0.5s ease-in-out, transform 0.5s ease;
	}
	.transition-enter-active {
		transition-delay: 0.3s;
	}
	.transition-enter {
		opacity: 0;
	}
	.transition-enter-to {
		opacity: 1;
	}
	.transition-leave {
		opacity: 1;
	}
	.transition-leave-to {
		opacity: 0;
	}
	@media (min-width: 700px) {
		/* sizes */

		.tiny {
			font-size: 0.4rem;
		}
		.small {
			font-size: 0.5rem;
		}
		.medium {
			font-size: 0.8rem;
		}
		.large {
			font-size: 1.2rem;
		}
	}
</style>
