import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;

// use beforeEach route guard to set the language
router.beforeEach((to, from, next) => {
	// use the language from the routing param or default language
	let language = to.params.lang;
	if (!language) {
		language = 'es';
	}

	// set the current language for i18n.
	i18n.locale = language;
	next();
});

new Vue({
    i18n,
    router,
    store,
    vuetify,
    render: (h) => h(App)
}).$mount('#app');
