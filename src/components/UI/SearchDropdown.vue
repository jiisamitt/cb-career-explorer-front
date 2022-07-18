<template>
	<div
		style="position: relative; width: 15rem; height: 2rem"
		v-click-outside="displayOff"
	>
		<!-- searchbar -->
		<input
			style="
				padding-left: 1rem;
				box-sizing: border-box;
				width: 100%;
				height: 1.7rem;
				border: 1px solid #888a91;
				border-radius: 4px;
				color: #4a4b4f;
				font-weight: 700;
				z-index: -10;
			"
			maxlength="10"
			class="small karla"
			type="text"
			@keyup="handleSearch"
			ref="searchbar"
			:placeholder="getPlaceholder()"
			@keypress.enter="handleEnter"
			@focus="displayOn"
			@click="displayOn"
			v-model="computedValue"
		/>
		<img
			style="
				position: relative;
				float: right;
				bottom: 0.9rem;
				right: 0.6rem;
				pointer-events: none;
			"
			src="@/assets/vector.svg"
			alt="vector"
		/>
		<!-- end searchbar -->

		<!-- display content -->
		<div
			style="
				position: relative;
				width: 99.5%;
				background: white;
				overflow-y: scroll;
				max-height: 8rem;
				border: 1px solid #ccc;
				z-index: 100;
			"
			v-if="isDisplayed"
			tabindex="0"
		>
			<div
				style="padding: 0.5rem; border: 1px solid #ccc"
				:style="highlightSelectedElement(element)"
				class="element"
				v-for="(element, index) in elementsFiltered"
				:key="index"
				@click="handleSelect(element)"
			>
				{{ element }}
			</div>
		</div>
		<!-- end display content -->
	</div>
</template>

<script>
	import ClickOutside from 'vue-click-outside';
	export default {
		directives: {
			ClickOutside,
		},
		data() {
			return {
				name: 'SearchBar',
				textEntered: '',
				isDisplayed: false,
				isSelected: '',
				placeholderTexts: [
					this.$t('home.search-bar-elements[0]'),
					this.$t('home.search-bar-elements[1]'),
					this.$t('home.search-bar-elements[2]'),
					this.$t('home.search-bar-elements[3]'),
				],
				elementsFiltered: [],
			};
		},
		props: {
			searchType: {
				type: String,
				default: '',
			},
			options: {
				type: Array,
				default: () => [],
			},
			value: {
				type: String,
			},
		},
		mounted() {
			this.elementsFiltered = this.options;
			this.isSelected = this.elementsFiltered[0];
		},
		computed: {
			elements() {
				return this.options;
			},
			computedValue: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				},
			},
		},
		//watch: {
		//	value: function (newValue) {
		//		this.computedValue = newValue;
		//	},
		//},
		methods: {
			getPlaceholder() {
				if (this.searchType === 'year') {
					return this.placeholderTexts[0];
				}
				if (this.searchType === 'level') {
					return this.placeholderTexts[1];
				}
				if (this.searchType === 'area') {
					return this.placeholderTexts[2];
				}
				if (this.searchType === 'career') {
					return this.placeholderTexts[3];
				}
			},
			normalize(str) {
				return str
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '');
			},
			displayOn() {
				this.isDisplayed = true;
				this.elementsFiltered = this.elements;
			},
			displayOff() {
				this.isDisplayed = false;
				this.elementsFiltered = this.elements;
			},
			handleSearch() {
				let text = this.value;
				let elements = this.elements;
				if (text && text.length > 0) {
					let result = elements.filter((element) => {
						return this.normalize(element).includes(this.normalize(text));
					});
					this.elementsFiltered = result;
					this.isSelected = this.elementsFiltered[0];
				}
			},
			handleEnter() {
				this.computedValue = this.isSelected;
				this.displayOff();
				this.$emit('chosenOption', this.isSelected);
				/* eslint-disable-next-line */
				this.$refs.searchbar.blur();
			},
			handleSelect(element) {
				this.isSelected = element;
				this.computedValue = element;
				this.displayOff();
				// emit an event saying theres a valid selected year if this.isSeLected is not empty or undefined
				this.$emit('chosenOption', this.isSelected);
			},
			highlightSelectedElement(element) {
				if (this.isSelected === element) {
					return {
						background: '#eff1f6',
					};
				}
			},
		},
	};
</script>
<style scoped>
	::placeholder {
		max-width: 80%;
	}
	.element:hover {
		background: #eff1f6;
	}
</style>
