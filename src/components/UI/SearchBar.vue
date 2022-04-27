<template>
	<div
		style="width: 20rem; height: 10rem; background: pink; margin-left: 500px"
	>
		<div style="background: lightblue; margin: 3px">
			<input
				style="width: 80%; height: 100%"
				type="search"
				@keyup="handleSearch"
				placeholder="Seleccione el año"
				id="searchbar"
				@keypress.enter="handleEnter"
				@click="displayOn"
				v-model="textSearched"
			/>
		</div>

		<div
			style="background: lightblue; margin 3px; overflow-y: scroll; height: 80%"
			v-if="isDisplayed"
			@focusout="displayOff"
			tabindex="0"
		>
			<div
				style="background: lightgray; margin: 0.5rem; padding: 0.5rem"
				v-for="(element, index) in elementsFiltered"
				:key="index"
			>
				{{ element }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: 'SearchBar',
				textSearched: '',
				textEntered: '',
				isDisplayed: false,
				isSelected: '',
				elements: [
					'2007',
					'2008',
					'2009',
					'2010',
					'2011',
					'2012',
					'2013',
					'2014',
					'2015',
				],
				elementsFiltered: [
					'2007',
					'2008',
					'2009',
					'2010',
					'2011',
					'2012',
					'2013',
					'2014',
					'2015',
				],
			};
		},
		mounted() {
			this.isSelected = this.elementsFiltered[0];
		},
		methods: {
			normalize(str) {
				return str
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '');
			},
			displayOn() {
				this.isDisplayed = true;
				console.log('its on');
			},
			displayOff() {
				this.isDisplayed = false;
				console.log('its off');
			},
			handleSearch() {
				let text = this.textSearched;
				let elements = this.elements;
				let result = elements.filter((element) => {
					return this.normalize(element).includes(this.normalize(text));
				});
				this.elementsFiltered = result;
				this.isSelected = this.elementsFiltered[0];
				console.log('selected item', this.isSelected);
			},
			handleEnter() {
				console.log('enter');
				this.displayOff();
				// emit an event saying theres a valid selected year if this.isSeLected is not empty or undefined
				if (this.isSelected) {
					this.$emit('selectedYear', this.isSelected);
				}
			},
		},
	};
</script>
