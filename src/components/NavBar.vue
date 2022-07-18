<template>
	<div class="uppercase navbar-container">
		<span
			:class="getClass(element)"
			@click="disabled ? () => {} : handleClick(element)"
			v-for="(element, index) in elements"
			:key="index"
		>
			<span v-if="element === 'Salaries'">{{
				$t('home.nav-bar-elements[0]')
			}}</span>
			<span v-if="element === 'Employment'">{{
				$t('home.nav-bar-elements[1]')
			}}</span>
			<span style="white-space: nowrap" v-if="element === 'Career Comparer'">{{
				$t('home.nav-bar-elements[2]')
			}}</span></span
		>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: 'NavBar',
				elements: ['Salaries', 'Employment', 'Career Comparer'],
				clickedElement: 'Salaries',
			};
		},
		props: {
			disabled: {
				type: Boolean,
				default: true,
			},
		},
		methods: {
			handleClick(element) {
				this.clickedElement = element;
				if (element === 'Career Comparer') {
					this.$emit('clickedElement', 'Career Comparer');
				} else {
					this.$emit('clickedElement', element);
				}
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
	.navbar-container {
		position: relative;
		width: max-content;
	}
	.navbar-element {
		color: var(--color-black-foggy);
		padding: 0.5rem;
		border-radius: 2px;
		margin: 0.5rem 0rem 0.5rem 1rem;
		cursor: pointer;
	}
	.navbar-element-clicked {
		border-bottom: 2px solid var(--color-primary);
		color: var(--color-black);
	}
	.navbar-element:hover {
		background: rgb(244, 246, 247);
	}
</style>
