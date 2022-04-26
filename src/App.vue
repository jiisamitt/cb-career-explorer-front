<template>
	<div id="app"></div>
</template>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Karla');
	@import url('https://fonts.googleapis.com/css?family=Montserrat');
	:root {
		--color-blue-1: #1161f8;
		--color-blue-2: #0c38c2;
		--color-pink-1: #ffd6d6;
		--color-pink-2: #c290f3;
		--color-red-1: #ff0c4f;
	}
	#app {
		font-family: Montserrat, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
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
