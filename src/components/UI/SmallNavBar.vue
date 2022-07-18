<template>
	<div class="container">
		<span
			:class="getClass(element)"
			@click="disabled ? () => {} : handleClick(element)"
			v-for="(element, index) in elements"
			:key="index"
			><span v-if="element === 'Salaries'">{{
				$t('home.small-nav-bar[0]')
			}}</span>
			<span v-if="element === 'Employment'">{{
				$t('home.small-nav-bar[1]')
			}}</span>
			<span v-if="element === 'Top 10'">{{ $t('home.small-nav-bar[2]') }}</span>
			<span v-if="element === 'Ranking'">{{
				$t('home.small-nav-bar[3]')
			}}</span></span
		>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: 'SmallNavBar',
				elementsSalaries: ['Salaries', 'Top 10', 'Ranking'],
				elementsEmployment: ['Employment', 'Top 10', 'Ranking'],
				elements: [],
				clickedElement: '',
			};
		},
		watch: {
			salaryOrEmployment: function (newValue) {
				if (newValue === 'Salaries') {
					this.elements = this.elementsSalaries;
					this.clickedElement = 'Salaries';
				} else if (newValue === 'Employment') {
					this.elements = this.elementsEmployment;
					this.clickedElement = 'Employment';
				} else {
					this.elements = ['Career Comparer'];
				}
			},
		},
		props: {
			salaryOrEmployment: {
				type: String,
				default: 'Salaries',
			},
			disabled: {
				type: Boolean,
				default: true,
			},
		},
		mounted() {
			if (this.salaryOrEmployment === 'Salaries') {
				this.elements = this.elementsSalaries;
				this.clickedElement = 'Salaries';
			} else {
				this.elements = this.elementsEmployment;
				this.clickedElement = 'Employment';
			}
		},
		methods: {
			handleClick(element) {
				this.clickedElement = element;
				this.$emit('clickedSubElement', element);
			},
			getClass(element) {
				if (this.clickedElement === element) {
					return 'navbar-element navbar-element-clicked ';
				}
				return 'navbar-element';
			},
		},
	};
</script>

<style scoped>
	.container {
		padding-top: 0.7rem;
		background: white;
		display: flex;
	}
	.navbar-element {
		padding: 0.5rem 1rem 0.5rem 1rem;
		border-radius: 5px;
		margin: 0.7rem 0.7rem 0.7rem 0rem;
		cursor: pointer;
	}
	.navbar-element-clicked {
		color: white;
		background: var(--color-primary-foggy) !important;
	}
	.navbar-element:hover {
		background: rgb(244, 246, 247);
	}
</style>
