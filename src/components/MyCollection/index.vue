<template lang='jade'>
	.my-collection(v-if='showCollect')
		.no-aboutmy(v-show='!CollectList[0]')
			img(src='../../assets/img-empty-state.svg')
			.attention 当前没有收藏的文章哦
			p
				router-link(to='/') 四处逛逛
		ul
			li(@click='toDetail(item._id)' v-for='item in CollectList')
				.collection-cell.v-h-center.b-border
					img.be-focuser-heading(v-lazy='item.img[0]')
					p.note-title {{item.title}}
					.collect-info.v-h-center
						span.nickname {{item.poster.username}}
						b
						span.views
							img.img-margin-right(src='http://7xlxny.com1.z0.glb.clouddn.com/h5/v2/home/views.png')
							b {{item.pv}}
						span.comm
							img.img-margin-right(src='http://7xlxny.com1.z0.glb.clouddn.com/h5/v2/home/comm.png')
							b {{item.comment.length}}
		p.loading(v-show='CollectList[0]') {{loadingWords}}
</template>

<style scoped lang='less'>
@white:#fff;
@words:#999;
	.my-collection{
		/*margin-top:0.1rem;*/
		background:@white;
		margin-bottom:0.2rem;
	}

	.collection-cell{
		flex-direction:column;
		align-items:inherit;
		text-align:center;
		padding:0.1rem 0.16rem;

		&>img{
			max-height: 1.5rem;
    		object-fit: cover;
		}

		.note-title{
			margin:.1rem 0;
		}

		.collect-info{
			font-size:0.12rem;
			color:@words;

			.nickname{
				margin-right:0.08rem;
			}

			span{
				vertical-align:inherit;
			}

			&>b{
				display: inline-block;
				width:0.01rem;
				height:0.1rem;
				background:@words;
			}

			.views,.comm{
				margin-left:0.11rem;

				img{
					width:0.11rem;
					height:0.09rem;

				}
			}

		}
	}


	.loading{
		text-align:center;
		padding:0.1rem;
	}
</style>

<script>
	export default{
		props:['opId'],
		data(){
           return{
           	   CollectList:[],
           	   page:1,
           	   pageOver:false,
           	   loadingWords:'正在加载...',
           	   renderOver:false,
           	   showCollect:false
           }
		},
		computed:{
			sendDate(){
				return {
					page:this.page,
					user_id:this.opId
				}
			}
		},
		methods:{
			toDetail(noteId){
				this.$store.commit('ACTIVENOTEID',{
					noteId:noteId
				});

				this.$router.push('/note-detail/'+noteId)

				this.$store.commit('TOGGLENAV',{
  		  			type:'NoteList',
  		  			index:0,
  		  			left:0
  		  		});

				
			},

			loadMore(){
				let scrollT = document.documentElement.scrollTop || document.body.scrollTop,
					loadinfT = document.querySelector('.my-collection .loading').offsetTop,
					windowH = window.innerHeight,
					loadingH = document.querySelector('.my-collection .loading').offsetHeight;

				if(scrollT + windowH >= loadinfT+loadingH){
					if(this.renderOver){
						this.getData();
					}
				}

			},

			getData(){

				

				this.renderOver = false;

				this.$http.post(`${this.$store.state.baseConfig.host}users/keep/`,this.sendDate,{"emulateJSON":true,"emulateHTTP":true})
				.then((data)=>{
					let formatData = data.data;

					if(formatData.code === 0){
						this.CollectList =[...this.CollectList,...formatData.msg.keep];
						this.showCollect = true;
						this.pageOver = formatData.msg.over;
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
					this.showCollect = true;
				})
			}
		},
		mounted(){
			// alert(787)
			this.getData();
			window.addEventListener('scroll',this.loadMore,false)
		},
		beforeDestroy(){
			window.removeEventListener('scroll',this.loadMore,false)
		}
	}
</script>