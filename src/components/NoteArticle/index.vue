<template lang='jade'>
	.note-article
		article
			h2.article-title {{articlePart.title}}
			.info-note
				span.tag.single-ellipsis {{'#'+articlePart.topic[0]}}
				span.count-msg {{articlePart.pv}} 浏览 | {{articlePart.keeps}} 收藏
				slot(name='delete')
				
			carousel(:carousels='articlePart.imgs',type='1')

			.article-content(v-html='articlePart.content')

		.article-info.ele-justify
			time {{articlePart.time}}
			.article-act
				button.init-btn.img-margin-right(@click='keep') {{articlePart.iskeep?'已收藏':'我要收藏'}}
				button.init-btn(@click='spot') {{articlePart.isspot?'已赞':'赞'}} {{'('+articlePart.spot+')'}}
				slot(name='share')

</template>

<style scoped lang='less'>
@white:#fff;
@black-a:rgba(0, 0, 0, 0.87);
@btn-border:#e6e6e6;
@collect-color:#ff2741;
@article-info-color:#999;


	.note-article{
		padding:0.16rem 0;
		font-size:0.15rem;
		background:@white;
		h2{
			font-size:0.24rem;
			font-weight: bold;
			letter-spacing: 0.02rem;
		}

		h2,.info-note,.article-content,.article-info{
			padding-left:0.2rem;
			padding-right:0.2rem;
		}


		.info-note{
			margin:0.16rem 0;
			font-size:0.12rem;

			.tag{
				background:@black-a;
				height:0.2rem;
				line-height:0.2rem;
				padding:0 0.08rem;
				color:@white;
				border-radius:0.03rem;
				margin-right:0.12rem;
				max-width: 1.2rem;
			}

			.count-msg{
				color:@black-a;
				letter-spacing: 0.01rem;
				font-weight:500;
			}
		}

		.article-content{
			font-size:0.15rem;
			line-height:1.8;
			color:@black-a;
			margin-top:0.12rem;
		}

		.article-info{
			font-size:0.12rem;
			margin-top:0.2rem;
			color:@article-info-color;
		}

		button{
			padding:0.04rem 0.08rem;
			font-size:.12rem;
			letter-spacing: 1px;
			color:@black-a;

		}
	}
</style>

<script>

	import Carousel from 'components/Carousel';

	export default{
		props:['articlePart'],
		data(){
			return {
				type:''
			}
		},
		components:{
			Carousel
		},
		computed:{
			sendData(){
				return{
					page_id:this.$store.state.aboutNote.activeNoteId,
					user_id:this.$store.state.baseConfig.userInfo._id,
					type:this.type
				}
			},
			spState(){
				return this.articlePart.isspot ? 'cancle' : 'confirm'
			},
			keepState(){
				return this.articlePart.iskeep ? 'cancle' : 'confirm'
			}
		},
		methods:{
			
			keep(){		//收藏
				this.type = this.keepState;
				this.$http.post(`${this.$store.state.baseConfig.host}keep/page`,this.sendData,{"emulateJSON":true,"emulateHTTP":true})
					.then((res)=>{		//收藏成功
						if(res.data.code === 0){
							if(this.keepState === 'cancle'){
								this.$emit('aboutKeep',0)
							}else{
								this.$emit('aboutKeep',1)
							}
						}
					
					},(err)=>{		//收藏失败
					alert('服务器开小差啦')
					})
			},

			spot(){		//点赞
				this.type = this.spState;
				this.$http.post(`${this.$store.state.baseConfig.host}spot/page`,this.sendData,{"emulateJSON":true,"emulateHTTP":true})
					.then((res)=>{		//点赞成功
						if(res.data.code === 0){
							if(this.spState === 'cancle'){
								this.$emit('aboutSpot',0)
							}else{
								this.$emit('aboutSpot',1)
							}
						}
					
					},(err)=>{		//点赞失败
					alert('服务器开小差啦')
					})
			}
		}
	}
</script>