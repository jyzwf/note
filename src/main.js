import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuex/store'
import VueLazyload from 'vue-lazyload'

import flexible from './libs/flexible';
import Reset from './less/reset'

Vue.use(VueResource);
Vue.use(VueLazyload);

router.beforeEach((to,from,next)=>{
	store.commit('SETROUTERLOADING',{
		loading:true
	});
	next();
});

router.afterEach(route=>{
	store.commit('SETROUTERLOADING',{
		loading:false
	});
})

Vue.mixin({
	beforeCreate(){
		function onBridgeReady(){
      	 WeixinJSBridge.call('hideOptionMenu');
      	}
      	
      	if (typeof WeixinJSBridge == "undefined"){
      	    if( document.addEventListener ){
      	        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      	    }else if (document.attachEvent){
      	        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
      	        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      	    }
      	}else{
      	    onBridgeReady();
      	}
	}
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
});




Vue.config.devtools = true
