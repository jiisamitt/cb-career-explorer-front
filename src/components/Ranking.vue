<template>
	<div>
		<!-- start title -->
		<div class="row ml1">
			<h1 style="max-width: 50%; text-align: left">
				Ranking de esta carrera en relación al resto de programas
			</h1>
		</div>
		<!-- end title -->

		<!-- start subtitle -->
		<div class="row ml1 mb1">
			<h3
				style="
					max-width: 40%;
					text-align: left;
					color: var(--color-black-foggy);
				"
			>
				{{ ranking }} de {{ total }}
			</h3>
		</div>
		<!-- end subtitle -->

		<!-- start list -->
		<div class="mb1 ranking-list">
			<div class="mb1" v-for="(element, index) in listRanking" :key="index">
				<ListElement
					:style="backgroundGetter(index)"
					class="general-white-container"
					:rank="listRanking[index].rank"
					:level="listRanking[index].level"
					:area="listRanking[index].area"
					:career="listRanking[index].career"
					:salary="listRanking[index].salary"
					:employment="listRanking[index].employment"
					:salaryOrEmployment="salaryOrEmployment"
				/>
			</div>
		</div>
		<!-- end list -->
		<button class="white small karla pdf-button" @click="downloadPDF()">
			Descargar PDF
		</button>
		<div style="display: none"><PDFContent id="to-pdf" /></div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import html2pdf from 'html2pdf.js';
	import ListElement from './UI/ListElement';
	import PDFContent from './UI/PDFContent';
	export default {
		data() {
			return {
				listRanking: [
					// dummy list from 1 to 20
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
						level: 'Universitario',
						area: '1',
						career: '1',
						salary: '1',
						employment: '1',
					},
					{
						rank: '3',
						level: 'Universitario',
						area: '1',
						career: '1',
						salary: '1',
						employment: '1',
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
						level: 'Universitario',
						area: '1',
						career: '1',
						salary: '1',
						employment: '1',
					},
					{
						rank: '6',
						level: 'Universitario',
						area: '1',
						career: '1',
						salary: '1',
						employment: '1',
					},
				],
				ranking: '5',
			};
		},
		components: {
			ListElement,
			PDFContent,
		},
		props: {
			salaryOrEmployment: {
				type: String,
				default: '',
			},
			total: {
				type: String,
				default: '',
			},
		},
		methods: {
			...mapActions({
				getAllCareersByCriteria: 'base/getAllCareersByCriteria',
			}),
			backgroundGetter(index) {
				if (index.toString() === (this.ranking - 1).toString()) {
					return {
						background: 'var(--color-background)',
					};
				}
			},
			downloadPDF() {
				// Choose the element that our invoice is rendered in.
				const element = document.getElementById('to-pdf');

				// clone the element
				var clonedElement = element.cloneNode(true);

				// change display of cloned element
				clonedElement.style.setProperty('display', 'block');

				// Choose the clonedElement and save the PDF for our user.
				/*var opt = {
        filename: `Programa ${this.phase.name}.pdf`,
      };*/
				var opt = {
					filename: `Ranking de ${this.listRanking[0].area}.pdf`,
					image: { type: 'jpeg', quality: 0.98 },
					html2canvas: { scale: 2 },
					jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
				};

				// New Promise-based usage:
				html2pdf().from(clonedElement).set(opt).save();

				// remove cloned element
				clonedElement.remove();
			},
		},
	};
</script>
<style scoped>
	.ranking-list {
		max-height: 40rem;
		overflow-y: scroll;
	}
	.pdf-button {
		border: 0px;
		background-color: var(--color-primary);
		border-radius: 40px;
		height: 2rem;
		width: 7rem;
		cursor: pointer;
	}
	.pdf-button:active {
		background-color: var(--color-primary-foggy);
	}
</style>
