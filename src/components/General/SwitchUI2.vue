<template>
	<div class="general-switch-2">
		<!-- left -->
		<span
			class="general-switch-left"
			:class="classGetter('left')"
			@click="handleClick('left')"
			>{{ left }}</span
		>
		<!-- right -->
		<span
			class="general-switch-right"
			:class="classGetter('right')"
			@click="handleClick('right')"
			>{{ right }}</span
		>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				leftOrRight: 'left',
			};
		},
		props: {
			left: {
				type: String,
				required: true,
			},
			right: {
				type: String,
				required: true,
			},
		},
		methods: {
			handleClick(clickedElement) {
				if (clickedElement != this.leftOrRight) {
					if (clickedElement === 'left') {
						this.leftOrRight = 'left';
						this.$emit('handleChange', 'Salary');
					} else {
						this.leftOrRight = 'right';
						this.$emit('handleChange', 'Employability');
					}
				}
			},

			classGetter(type) {
				if (this.leftOrRight === type) {
					return 'general-switch-selected';
				}
			},
		},
	};
</script>

<style scoped>
	.general-switch-2 {
		font-size: 1rem;
		white-space: nowrap;
	}
	.general-switch-left {
		background: #dde1fe;
		border-radius: 4px 0px 0px 4px;
		padding: 0.7rem 1.4em;
		color: #9aa5fd;
		cursor: pointer;
	}
	.general-switch-right {
		background: #dde1fe;
		border-radius: 0px 4px 4px 0px;
		padding: 0.7rem 1.4rem;
		color: #9aa5fd;
		cursor: pointer;
	}
	.general-switch-selected {
		background: #7887fc;
		color: white;
	}
	.general-switch-left:first-letter {
		text-transform: uppercase;
	}
	.general-switch-right:first-letter {
		text-transform: uppercase;
	}
</style>
