<template lang='jade'>
	#action-header.ele-justify
		.action-icon
			router-link(to='/searchnote')
					img(src='../../assets/toolbar-search.svg')
			router-link.writeNote(to='/writenote')
					img(src='../../assets/toolbar-create.svg')
			router-link.watchMsg(to='/msgnotice')
					img(src='../../assets/toolbar-noti.svg')
					span.qk-round.badge(v-show='qkBadge')
			a(@click='goCenter')
					img(src='../../assets/toolbar-user.svg')
			
</template>

<style scoped lang='less'>

@white-a:rgba(255,255,255,.9);
@badge-color:red;
	#action-header{
		height:0.56rem;
		padding:0 0.16rem;
		position:fixed;
		top:0;
		left:0;
		width:100%;
		z-index:8;
		background:@white-a;
		justify-content: flex-end;

		a{
			cursor:pointer;
			display: inline-block;
		}


		img{
			width:0.21rem;
			height:.21rem;
			cursor:pointer;
		}
		.watchMsg{
			margin-right: 0.28rem;
			position: relative;

			span{
				position: absolute;
				width:0.06rem;
				height:0.06rem;
				background-color: @badge-color;
				right: -0.04rem;
    			top: -0.02rem;

			}
		}
		.writeNote{
			margin:0 .28rem;
		}
	}
</style>

<script>
	export default{
		props:['type'],
		data(){
            return {
            	mask:false,
            }
		},
		computed:{
			qkBadge(){
				return this.$store.state.indexMsgConfig.hasBadge
			}
		},
		
		methods:{
            goCenter(){
            	this.$store.commit('SAVEUSERID',{
            		_id:this.$store.state.baseConfig.userInfo._id
            	});

            	this.$router.push('/mycenter/'+this.$store.state.baseConfig.userInfo._id);

            	this.$store.commit('TOGGLENAV',{
  		  			type:'NoteList',
  		  			index:0,
  		  			left:0
  		  		});
            }
		}
	}
</script>