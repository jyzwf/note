<template lang='jade'>
	#user-info-header.ele-justify
		.left-part(@click='goCenter(noterInfo._id)')
			img.qk-round.img-margin-right(:src='noterInfo.headimgurl')
			span {{noterInfo.username}}
		button.init-btn(:class="{'isFocus':noterInfo.isfocus}",@click='focus',v-if='!isSelf') {{noterInfo.isfocus?'已关注':'+关注'}}
</template>

<style lang='less' scoped>
@white:#fff;
@focus-color:rgba(0, 0, 0, 0.87);
@words:#ddd;
@before-color:rgba(0, 0, 0, 0.12);
	#user-info-header{
		padding:0.1rem 0.16rem;
		background:@white;
		font-size:0.15rem;
		position:fixed;
		bottom:0;
		left:0;
		width:100%;
		z-index:9;

		img{
			width:0.35rem;
			height:0.35rem;
		}

		button{
			padding:0.04rem 0.08rem;
			background:@focus-color;
			color:@white;
			font-size:0.15rem;

			&.isFocus{
				background:transparent;
				border:0.01rem solid @words;
				color:@words;
			}
		}
	}
</style>

<script>
	export default{
		props:['noterInfo','isSelf'],
		computed:{
			sendData(){
				return {
					focuser_id:this.noterInfo._id,
					user_id:this.$store.state.baseConfig.userInfo._id,
					type:this.type
				}
			},
			type(){
				return this.noterInfo.isfocus ? 'cancle' : 'confirm'
			}
		},
		methods:{
			focus(){
				this.$http.post(`${this.$store.state.baseConfig.host}focus/user`,this.sendData,{"emulateJSON":true,"emulateHTTP":true})
					.then((res)=>{		//关注成功
						if(res.data.code === 0){
							if(this.type === 'cancle'){
								this.$emit('aboutFocus',0)
							}else{
								this.$emit('aboutFocus',1)
							}
						}
						
					},(err)=>{		//关注失败
						alert('服务器开小差啦')
					})
			},
			goCenter(focuserId){
				this.$store.commit('SAVEUSERID',{
            		_id:focuserId
            	})
            	this.$router.push('/mycenter/'+focuserId)
			},
		}
	}
</script>