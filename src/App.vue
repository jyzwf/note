<template>
  <div id="app">
      <quke-loading v-show='showLoading'></quke-loading>
  		<transition name="quke-fade" mode="out-in">
        	<router-view></router-view>
   	 	</transition>	
  </div>
</template>

<script>
import QukeLoading from 'components/QukeLoading';
export default {
  name: 'app',
  computed:{
    showLoading(){
      return this.$store.state.baseConfig.isLoading;
    }
  },
  components:{
    QukeLoading
  }
}
</script>

<style lang='less'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .quke-fade-enter-active, .quke-fade-leave-active {
    transition: all .25s ease;
  }

  .quke-fade-enter{
    opacity:0;
    transform:translateX(3rem);
  }

   .quke-fade-leave-active {
    opacity:0;
    transform:translateX(-3rem);
  }

}
</style>
