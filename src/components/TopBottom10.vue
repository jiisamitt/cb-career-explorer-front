<template>
	<div>
		<!-- start title -->
		<div class="row ml1">
			<h1 style="max-width: 50%; text-align: left">
				Carreras de nivel <span class="lowercase">{{ level }}</span> con
				<span v-if="topOrBottom === 'Top'">mayor </span>
				<span v-else>menor </span>
				<span v-if="salaryOrEmployment === 'Salaries'">salario</span>
				<span v-else>empleabilidad</span>
				<!-- 
				en el
				{{ year }}
				-->
			</h1>
		</div>
		<!-- end title -->

		<!-- start switcher -->
		<SwitchUI
			style="text-align: left"
			:leftOrRight="leftOrRight"
			:optionLeft="switchTextGetter(salaryOrEmployment, 'Top', level)"
			:optionRight="switchTextGetter(salaryOrEmployment, 'Bottom', level)"
			@handleClick="selectTopBottom"
			class="mb1 ml1"
		/>
		<!-- end switcher -->

		<!-- start subtitle -->
		<h3
			style="color: var(--color-black-foggy); text-align: left"
			class="ml1 mb1"
		>
			Mostrando top 10 carreras con
			<span v-if="topOrBottom === 'Top'">mayor </span>
			<span v-else>menor </span>
			<span v-if="salaryOrEmployment === 'Salaries'">salario</span>
			<span v-else>empleabilidad</span>
		</h3>
		<!-- end subtitle -->
		<!-- start list -->
		<div class="mb1" v-for="(element, index) in selectedList" :key="index">
			<ListElement
				class="general-white-container"
				:rank="(index + 1).toString()"
				:level="selectedList[index].type.toString()"
				:area="selectedList[index].area.toString()"
				:career="selectedList[index].name.toString()"
				:salary="selectedList[index].salary.toString()"
				:employment="selectedList[index].employability.toString()"
				:salaryOrEmployment="salaryOrEmployment"
			/>
		</div>
		<!-- end list -->
	</div>
</template>

<script>
	import ListElement from './UI/ListElement';
	import SwitchUI from './UI/SwitchUI';
	export default {
		data() {
			return {
				topOrBottom: 'Top',
				leftOrRight: 'left',
				topList: [
					{
						rank: '1',
						level: 'Universitario',
						area: '1',
						career: '1',
						salary: '1',
						employment: '1',
					},
					{
						rank: '2',
						level: 'Grado',
						area: '2',
						career: '2',
						salary: '2',
						employment: '2',
					},
					{
						rank: '3',
						level: 'Técnico Profesional',
						area: '3',
						career: '3',
						salary: '3',
						employment: '3',
					},
					{
						rank: '4',
						level: 'Universitario',
						area: '1',
						career: '1',
						salary: '1',
						employment: '1',
					},
					{
						rank: '5',
						level: 'Grado',
						area: '2',
						career: '2',
						salary: '2',
						employment: '2',
					},
					{
						rank: '6',
						level: 'Técnico Profesional',
						area: '3',
						career: '3',
						salary: '3',
						employment: '3',
					},
					{
						rank: '7',
						level: 'Universitario',
						area: '1',
						career: '1',
						salary: '1',
						employment: '1',
					},
					{
						rank: '8',
						level: 'Grado',
						area: '2',
						career: '2',
						salary: '2',
						employment: '2',
					},
					{
						rank: '9',
						level: 'Técnico Profesional',
						area: '3',
						career: '3',
						salary: '3',
						employment: '3',
					},
					{
						rank: '10',
						level: 'Universitario',
						area: '1',
						career: '1',
						salary: '1',
						employment: '1',
					},
				],
				bottomList: [
					{
						rank: '100',
						level: 'Universitario',
						area: '1',
						career: '1',
						salary: '1',
						employment: '1',
					},
					{
						rank: '101',
						level: 'Grado',
						area: '2',
						career: '2',
						salary: '2',
						employment: '2',
					},
					{
						rank: '102',
						level: 'Técnico Profesional',
						area: '3',
						career: '3',
						salary: '3',
						employment: '3',
					},
					{
						rank: '103',
						level: 'Universitario',
						area: '1',
						career: '1',
						salary: '1',
						employment: '1',
					},
					{
						rank: '104',
						level: 'Grado',
						area: '2',
						career: '2',
						salary: '2',
						employment: '2',
					},
					{
						rank: '105',
						level: 'Técnico Profesional',
						area: '3',
						career: '3',
						salary: '3',
						employment: '3',
					},
					{
						rank: '106',
						level: 'Universitario',
						area: '1',
						career: '1',
						salary: '1',
						employment: '1',
					},
					{
						rank: '107',
						level: 'Grado',
						area: '2',
						career: '2',
						salary: '2',
						employment: '2',
					},
					{
						rank: '108',
						level: 'Técnico Profesional',
						area: '3',
						career: '3',
						salary: '3',
						employment: '3',
					},
					{
						rank: '109',
						level: 'Universitario',
						area: '1',
						career: '1',
						salary: '1',
						employment: '1',
					},
				],
				selectedList: [],
			};
		},
		mounted() {
			this.selectedList = this.topSalary;
			this.topList = this.topSalary;
			this.bottomList = this.bottomSalary;
		},
		components: {
			ListElement,
			SwitchUI,
		},
		props: {
			salaryOrEmployment: {
				type: String,
				default: '',
			},
			level: {
				type: String,
				default: '',
			},
			career: {
				type: String,
				default: '',
			},
			/*
			year: {
				type: String,
				default: '',
			},
			*/
			topSalary: {
				type: Array,
			},
			bottomSalary: {
				type: Array,
			},
			topEmployment: {
				type: Array,
			},
			bottomEmployment: {
				type: Array,
			},
		},
		watch: {
			salaryOrEmployment: function (newValue) {
				if (newValue === 'Salaries') {
					this.topList = this.topSalary;
					this.bottomList = this.bottomSalary;
				} else {
					this.topList = this.topEmployment;
					this.bottomList = this.bottomEmployment;
				}
			},
		},
		methods: {
			selectTopBottom(selection) {
				if (selection === 'left') {
					this.leftOrRight = 'left';
					this.topOrBottom = 'Top';
					this.selectedList = this.topList;
				} else {
					this.leftOrRight = 'right';
					this.topOrBottom = 'Bottom';
					this.selectedList = this.bottomList;
				}
			},
			switchTextGetter(salaryOrEmployment, topOrBottom, level) {
				const area =
					salaryOrEmployment === 'Salaries' ? 'salario' : 'empleabilidad';
				const comparison = topOrBottom === 'Top' ? 'mayor' : 'menor';
				return this.capitalize(
					`Carreras de ${level} con ${comparison} ${area}`
				);
			},
			// function to return the first letter of the string in uppercase and the rest in lowercase
			capitalize(string) {
				return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
			},
		},
	};
</script>
