<template>
	<div class="navbar-container">
		<!-- start desktop -->
		<div class="navbar-elements">
			<span
				:class="getClass(element)"
				@click="handleClick(element)"
				v-for="(element, index) in elements"
				:key="index"
			>
				<span v-if="element === 'Landing'">{{
					$t('home.nav-bar-elements[0]')
				}}</span>
				<span
					style="white-space: nowrap"
					v-if="element === 'Career Comparer'"
					>{{ $t('home.nav-bar-elements[1]') }}</span
				>
				<!-- pronto simulador -->
				<!-- 
			<span style="white-space: nowrap" v-if="element === 'Simulator'">{{
				$t('home.nav-bar-elements[2]')
			}}</span> 
            -->
			</span>
		</div>
		<!-- end desktop -->

		<!-- start mobile -->
		<v-icon @click.stop="drawer = !drawer" class="navbar-menu-icon" dark>
			mdi-menu
		</v-icon>
		<v-navigation-drawer
			class="navbar-drawer"
			v-model="drawer"
			app
			temporary
			right
			width="70%"
		>
			<v-list-item class="purple--text text--base-1"> Menu </v-list-item>

			<v-divider></v-divider>

			<v-list dense>
				<v-list-item
					@click="routeClick(item)"
					v-for="item in items"
					:key="item.title"
				>
					<v-list-item-icon>
						<v-icon color="purple base-1">{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title class="purple--text text--base-1">{{
							item.title
						}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
	<!-- end mobile -->
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				name: 'NavBar',
				elements: ['Landing', 'Career Comparer', 'Simulator'],
				drawer: null,
				items: [
					{ title: 'Inicio', icon: 'mdi-home', route: 'Landing' },
					{
						title: 'Comparador de carreras',
						icon: 'mdi-briefcase-search-outline',
						route: 'Career Comparer',
					},
				],
			};
		},
		computed: {
			...mapGetters({
				clickedElement: 'base/selectedView',
			}),
		},
		methods: {
			...mapActions({
				setSelectedView: 'base/setSelectedView',
			}),
			handleClick(element) {
				this.setSelectedView(element);
			},
			getClass(element) {
				if (this.clickedElement === element) {
					return 'navbar-element navbar-element-clicked ';
				}
				return 'navbar-element';
			},
			routeClick(item) {
				this.setSelectedView(item.route);
				this.drawer = false;
			},
		},
	};
</script>
<style scoped>
	.navbar-container {
		position: relative;
		width: max-content;
	}
	.navbar-elements {
		display: inline;
	}
	.navbar-element {
		color: var(--color-black-foggy);
		padding: 0.5rem;
		border-radius: 5px;
		margin: 0.5rem 0rem 0.5rem 1rem;
		cursor: pointer;
	}
	.navbar-element-clicked {
		color: var(--color-black);
	}
	.navbar-element:hover {
		background: rgb(239, 241, 241);
	}
	.navbar-element:active {
		background: rgb(229, 233, 233);
	}
	.navbar-menu-icon {
		display: none;
	}
	.navbar-drawer {
		color: #5669fb !important;
	}
	@media (max-width: 700px) {
		.navbar-elements {
			display: none;
		}
		.navbar-menu-icon {
			background: var(--color-purple-1);
			padding: 5px 8px;
			border-radius: 5px;
			display: inline;
			position: relative;
			top: 3px;
		}
		.navbar-container {
		}
	}
</style>
