<template>
	<div id="app">
		<h1>Explorador de carreras</h1>
		<NavBar @clickedElement="handleELement" />
		<br />
		<div><component :is="clickedElement" /></div>
		<br />
		<SearchBar />
	</div>
</template>
<script>
	import NavBar from './components/NavBar';
	import Salarios from './components/Salarios';
	import Empleabilidad from './components/Empleabilidad';
	import Comparador from './components/Comparador';
	import SearchBar from './components/UI/SearchBar';
	export default {
		data() {
			return {
				name: 'App',
				clickedElement: 'Salarios',
			};
		},
		components: {
			NavBar,
			Salarios,
			Empleabilidad,
			Comparador,
			SearchBar,
		},
		methods: {
			handleELement(element) {
				this.clickedElement = element;
			},
		},
	};
</script>
<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Karla');
	@import url('https://fonts.googleapis.com/css?family=Montserrat');
	:root {
		--color-blue-1: #0c38c2;
		--color-blue-2: #1161f8;
		--color-pink-1: #ffd6d6;
		--color-pink-2: #c290f3;
		--color-red-1: #ff0c4f;
	}
	#app {
		font-family: Montserrat, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: var(--color-blue-1);
		margin-top: 2rem;
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
</style>
