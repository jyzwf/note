<!-- 消息提示列表 -->
<template lang='jade'>
	.msg-list
		header 消息
		.no-aboutmy.no-msg.pos-center(v-if='!msgList[0]')
			img(src='../assets/img-empty-state.svg')
			.attention 当前没有消息哦
		ul
			li(v-for='msg in msgList',@click='watchMsg(msg)')
				.detail-msg(v-if='msg.type!=3')
					img.icon-msg.qk-round(v-lazy='msg.who.headimgurl')
					.msg-snapshot
						.msg-title <b>{{msg.who.username}}</b> {{msgType[msg.type]}}你的文章 <b>{{msg.page.title}}</b>
						.article-msg
							img(v-lazy='msg.page.img')
							.article-snap {{msg.page.content.replace(/&lt;[^>]*?&gt;/gi,'').slice(0,40)}}
						time {{msg.time}}

				.detail-msg(v-if='msg.type == 3')
					img.icon-msg.qk-round(:src='msg.who.headimgurl')
					.msg-snapshot
						.msg-title <b>{{msg.who.username}}</b>开始关注了你
						time 2016-11-18 11:49

</template>

<style lang='less' scoped>
	header{
		height:0.48rem;
		line-height: 0.48rem;
		padding: 0 0.2rem;
		font-size: 0.18rem;
		font-weight: 500;
		letter-spacing: .02rem;
		 box-shadow: 0 0.01rem 0 0 rgba(0, 0, 0, 0.12);
		 background-color: rgba(255,255,255,.9);
		 position: fixed;
		 top:0;
		 left:0;
		 width:100%;
	}
	
	.no-msg{
		position: fixed;
	}
	
	ul{
		padding-top: 0.54rem;
		padding-left: 0.16rem;
		margin-bottom: 1rem;
	}

	.detail-msg{
		margin-top: 0.17rem;
		display: flex;
		align-items: flex-start;


		.icon-msg{
			margin-right: 0.16rem;
			width:0.4rem;
			min-width:0.4rem;
			height:0.4rem;
			object-fit: cover
		}

		.msg-title{
			font-size: 0.15rem;
			font-weight: 500;
			letter-spacing: 0.02rem;
			margin-bottom: 0.1rem;
		}
		
		.msg-snapshot{
			flex:auto;
			display: flex;
			flex-direction: column;
			padding-bottom: 0.1rem;
			padding-right: 0.16rem;
			border-bottom: 0.01rem solid rgba(0, 0, 0, 0.08)
		}

		.article-snap{
			font-size: 0.14rem;
		}

		.article-msg{
			display: flex;
			align-items: center;
			color:rgba(0, 0, 0, 0.54);
			font-size:0.12rem;
			margin-bottom: 0.11rem; 
			img{
				width:0.64rem;
				min-width:0.64rem;
				height:0.64rem;
				border-radius: 0.08rem;
				margin-right: 0.1rem;
				object-fit: cover
			}
		}

		time{
			font-size: .13rem;
		}
	}

	


</style>

<script>


	export default{
		data(){
			return {
				msgList:[],
				msgType:{
					1:'赞了',
					2:'收藏了',
					3:'关注了',
					4:'评论了'
				}
			}
		},
		methods:{
			getMsgList(){
				this.$http.post(`${this.$store.state.baseConfig.host}message/list`,{
					user_id:this.$store.state.baseConfig.userInfo._id
				},{"emulateJSON":true,"emulateHTTP":true})
				.then((data)=>{
					let formatData = data.data;
					if(formatData.code === 0){
						this.msgList = formatData.msg;
					}else{
						alert('服务器开小差啦')
					}
				},err=>{
					alert('服务器开小差啦')
				})
			},
			watchMsg(msg){
				if(msg.flag){
					return false;
				}

				msg.flag = true;
				this.$http.post(`${this.$store.state.baseConfig.host}message/check`,{
					msg_id:msg._id
				},{"emulateJSON":true,"emulateHTTP":true})
				.then(data=>{
					let formatData = data.data;
					if(formatData.code === 0){
						if(msg.type!=3){
							this.$store.commit('ACTIVENOTEID',{		//获取当前笔记的nodeId
								noteId:msg.page._id
							});
							this.$router.push('/note-detail/'+msg.page._id);
						}else if(msg.type==3){
							this.$store.commit('SAVEUSERID',{
            					_id:msg.who._id
            				})
            				this.$router.push('/mycenter/'+msg.who._id)
						}
					}else{
						alert('服务器开小差啦')
					}

					msg.flag = false;
				},err=>{
					alert('服务器开小差啦');
					msg.flag = false;
				})
			}
		},
		mounted(){
			this.getMsgList();
			this.$store.commit('REMOVEBADGE');
		}
	}
</script>