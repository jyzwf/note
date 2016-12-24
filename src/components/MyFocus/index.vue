<template lang='jade'>
	.my-focus(v-if='showFocus')
		.no-aboutmy(v-show='!focusList[0]')
			img(src='../../assets/img-empty-state.svg')
			.attention 当前没有关注的对象哦
			p
				router-link(to='/') 四处逛逛
		ul
			li(v-for='(item,idx) in focusList')
				a.focus-cell(@click='goCenter(item._id)')
						img.be-focuser-heading.qk-round(v-lazy='item.headimgurl')
						.comment-main
								.commenter-info.ele-justify
									.comment-left
										p.nickname.line-clamp {{item.username}}
										p.be-focused
											span 笔记{{item.pages.length}}篇丨
											span 收藏{{item.keep.length}}篇
									.focus(@click.prevent.stop='cancelFocus(item,idx)',v-if='showFocusBtn')
										button.init-btn(:class="{unfocused:false}") 取消关注

		p.loading(v-show='focusList[0]') {{loadingWords}}		
</template>

<style scoped lang='less'>
@white:#fff;
@words:rgba(0, 0, 0, 0.54);
@btn-bg:#f8f8f8;
@focus-color:#ff2741;
@black-a:rgba(0, 0, 0, 0.87);

	.my-focus{
		
		.loading{
		 	text-align:center;
		 	padding:0.1rem;
	    }

		.focus-cell{
			display: flex;
			padding:.12rem 0.04rem;
			align-items:center;

			&:last-child{
				border:none;
			}
		}

		.comment-main{
			flex:auto;
		}

		.comment-left{
			color:@black-a;
			font-size: 0.13rem;
			letter-spacing:0.01rem;

			.nickname{
  				font-weight: 500;
  				margin-bottom:0.02rem;
  				max-width:1.5rem;
  				width:1.5rem;
  				-webkit-line-clamp: 1;
			}
		}


		.be-focuser-heading{
			width:.4rem;
			min-width:.4rem;
			height:.4rem;
			margin-right:.2rem;
		}

		button{
			color:@words;
			/*width:0.76rem;
			min-width:0.76rem;*/
			padding:0.04rem 0.12rem;
			/*height:0.27rem;
			line-height:0.27rem;*/
			font-size:0.13rem;
			background:@btn-bg;
			margin-left:0.03rem;

			&.unfocused{
				background:@focus-color;
				color:@white;
				border:none
			}
		}
	}
</style>


<script>
	export default{
		props:['opId'],
		data(){
           return{
           	   focusList:[],
           	   page:1,
           	   pageOver:false,
           	   loadingWords:'正在加载...',
           	   renderOver:false,
           	   showFocus:false

           }
		},
		computed:{
			sendDate(){
				return {
					page:this.page,
					user_id:this.opId
				}
			},
			showFocusBtn(){
				return this.$store.state.baseConfig.userInfo._id === this.$store.state.userCenterConfig.userId;
			}
		},
		methods:{
			goCenter(focuserId){
				this.$store.commit('SAVEUSERID',{
            		_id:focuserId
            	})
            	this.$router.push('/mycenter/'+focuserId)
			},

			cancelFocus(item,idx){
				let t = confirm('你确定要取消关注吗><');
				if(t){

					let sendDate = {
						focuser_id:item._id,
						user_id:this.$store.state.baseConfig.userInfo._id,
						type:'cancle'
					};

					this.$http.post(`${this.$store.state.baseConfig.host}focus/user`,sendDate,{"emulateJSON":true,"emulateHTTP":true})
					.then((res)=>{		//取消关注成功
						if(res.data.code === 0){
							this.focusList.splice(idx,1);
							this.$emit('cancelfocus');
						}
						
					},(err)=>{		//关注失败
						alert('服务器开小差啦')
					})
				}
				
			},

			loadMore(){
				let scrollT = document.documentElement.scrollTop || document.body.scrollTop,
					loadinfT = document.querySelector('.my-focus .loading').offsetTop,
					windowH = window.innerHeight,
					loadingH = document.querySelector('.my-focus .loading').offsetHeight;

				if(scrollT + windowH >= loadinfT+loadingH){
					if(this.renderOver){
						this.getData();
					}
				}
			},

			getData(){

				this.renderOver = false;

				this.$http.post(`${this.$store.state.baseConfig.host}users/focus/`,this.sendDate,{"emulateJSON":true,"emulateHTTP":true})
				.then((data)=>{
					let formatData = data.data;

					if(formatData.code === 0){
						this.focusList =[...this.focusList,...formatData.msg.focus];
						this.pageOver = formatData.msg.over;
						this.showFocus = true;
						if(this.pageOver){
							this.loadingWords = '没了,别拉了';
							this.renderOver = false;
							let t = setTimeout(()=>{
								this.loadingWords = '';
								clearTimeout(t)
							},1500)
							window.removeEventListener('scroll',this.loadMore,false)
							return false;
						}
						this.page++;
						this.renderOver = true;
					}
					
				},(data)=>{
					this.showFocus = true;
				})
			}
		},
		mounted(){
			this.getData();
			window.addEventListener('scroll',this.loadMore,false)
		},
		beforeDestroy(){
			window.removeEventListener('scroll',this.loadMore,false)
		}
	}
</script>