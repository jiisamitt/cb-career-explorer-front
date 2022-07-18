<template>
	<div class="row container">
		<!-- 
		<SearchDropdown
			:searchType="'year'"
			:options="years.map((x) => x.name.toString())"
			v-model="chosenYear"
			@chosenOption="updateInfo('year', $event)"
		/>
		-->
		<SearchDropdown
			style="width: 25rem"
			class="searchbar-dropdown"
			:searchType="'level'"
			:options="levels.map((x) => x.name.toString())"
			v-model="chosenLevel"
			@chosenOption="updateInfo('level', $event)"
		/>
		<SearchDropdown
			style="width: 27rem"
			class="searchbar-dropdown"
			:searchType="'area'"
			:options="areas.map((x) => x.name.toString())"
			v-model="chosenArea"
			@chosenOption="updateInfo('area', $event)"
		/>
		<SearchDropdown
			style="width: 27rem"
			class="searchbar-dropdown"
			:searchType="'career'"
			:options="careers.map((x) => x.name.toString())"
			v-model="chosenCareer"
			@chosenOption="updateInfo('career', $event)"
		/>
		<SearchButton
			style="margin-left: 1rem; margin-bottom: 0.5rem"
			class="searchbar-button"
			@search="handleSearch()"
		/>
	</div>
</template>

<script>
	import { mapActions /*, mapGetters*/ } from 'vuex';
	import SearchDropdown from './UI/SearchDropdown';
	import SearchButton from './UI/SearchButton';
	export default {
		data() {
			return {
				years: [],
				levels: [],
				areas: [],
				careers: [],
				chosenYear: '',
				chosenYearId: '',
				chosenLevel: '',
				chosenLevelId: '',
				chosenArea: '',
				chosenAreaId: '',
				chosenCareer: '',
				chosenCareerId: '',
			};
		},
		mounted() {
			this.getYears().then((res) => {
				this.years = res;
			});
			this.getInstitutions().then((res) => {
				this.levels = res;
			});
		},
		components: {
			SearchDropdown,
			SearchButton,
		},
		computed: {},
		methods: {
			...mapActions({
				getYears: 'base/getAllYears',
				getInstitutions: 'base/getAllInstitutionTypes',
				getAreas: 'base/getAllAreasByInstitutionType',
				getCareers: 'base/getAllCareersByAreaAndInstitutionType',
			}),
			handleSearch() {
				this.$emit('search', {
					//year: { id: this.chosenYearId, name: this.chosenYear },
					level: { id: this.chosenLevelId, name: this.chosenLevel },
					area: { id: this.chosenAreaId, name: this.chosenArea },
					career: { id: this.chosenCareerId, name: this.chosenCareer },
				});
				this.chosenLevelId = '';
				this.chosenAreaId = '';
				this.chosenCareerId = '';
				this.chosenLevel = '';
				this.chosenArea = '';
				this.chosenCareer = '';
				this.areas = [];
				this.careers = [];
			},
			updateInfo(type, value) {
				/*
				if (type === 'year') {
					this.chosenYear = value;
					this.chosenYearId = this.years.find((x) => x.name == value).id;
					this.chosenArea = '';
					this.chosenCareer = '';
				}
				*/
				if (type === 'level') {
					this.chosenLevel = value;
					this.chosenLevelId = this.levels.find((x) => x.name == value).id;
					this.chosenArea = '';
					this.chosenCareer = '';
					this.getAreas(
						this.levels.find((x) => x.name == this.chosenLevel).id
					).then((res) => {
						this.areas = res;
					});
				}
				if (type === 'area') {
					this.chosenArea = value;
					this.chosenAreaId = this.areas.find((x) => x.name == value).id;
					this.chosenCareer = '';
					this.getCareers({
						areaId: this.areas.find((x) => x.name == this.chosenArea).id,
						institutionTypeId: this.levels.find(
							(x) => x.name === this.chosenLevel
						).id,
					}).then((res) => {
						this.careers = res;
					});
				}
				if (type === 'career') {
					this.chosenCareer = value;
					this.chosenCareerId = this.careers.find((x) => x.name == value).id;
				}
			},
		},
	};
</script>

<style scoped>
	.container {
		position: relative;
		max-height: 2.5rem;
		justify-content: left;
		align-items: center;
		padding: 1rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
		gap: 3rem;
		background: white;
	}
	@media (max-width: 500px) {
		.container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			max-height: fit-content;
			padding: 1rem;
		}
		.searchbar-dropdown {
			max-width: 18rem;
		}
		.searchbar-button {
			align-self: flex-end;
		}
	}
</style>
