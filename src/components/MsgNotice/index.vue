<!-- 消息提示 -->
<template lang='jade'>
	section
		.msg-notice(v-if='closeBanner&&showIndexMsg')
			img.active-banner(v-lazy='bannerImg',@click.self='toSearch')
			img.remove-active(src='../../assets/ic_highlight_off.svg',@click='removeBanner')
</template>

<style lang="less" scoped>
	.msg-notice{
		position:relative;
		margin-bottom:0.16rem;

		img.active-banner{
			width:100%;
			height:0.56rem;
			object-fit:cover
		}
		
		.remove-active{
			width:0.22rem;
			height:0.22rem;
			position:absolute;
			top:50%;
			transform:translateY(-50%);
			right:0.08rem;
			cursor:pointer;
		}
    	
	}
</style>

<script>
	export default{
		computed:{
			activeName(){
				return this.$store.state.indexMsgConfig.indexMsg
			},
			showIndexMsg(){
				return this.$store.state.indexMsgConfig.hasIndexMsg
			},
			closeBanner(){
				return this.$store.state.indexMsgConfig.isClose
			},
			bannerImg(){
				return this.$store.state.indexMsgConfig.indexMsg
			}
		},
		methods:{
			removeBanner(){
				this.$store.commit('CHANGESTATEBANNER');
			},
			toSearch(){
				this.$store.commit('SETSEARCHTAG',{
					search:'味噌，感恩有你'
				});
				this.$router.push('/searchresult');
			},
		}
	}
</script>