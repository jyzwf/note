<template lang='jade'>
	.user-center-header.ele-justify
		.user-base
			p.user-name {{userMsg.base.username}}
			ul
				li(@click='slide(nav,index,$event)',v-for='(nav,index) in navTag')
					span.num {{nav.num}}
					span.tag {{nav.tag}}
				li.slider(:style="{'left':sliderLeft+'px'}")

		.user-heading
			img.qk-round(:src='userMsg.base.headimgurl')
		

</template>

<style lang='less' scoped>
@white:#fff;
@black-a:rgba(0, 0, 0, 0.87);
	.user-center-header{
		padding:0.16rem 0.24rem;
		align-items: flex-start;
		color:@black-a;
		position:fixed;
		width:100%;
		z-index:8;
		background:@white;

		img{
			width:0.8rem;
			min-width:0.8rem;
			height:.8rem;
		}

		.user-name{
			font-size: 0.2rem;
  			font-weight: 500;
  			letter-spacing: 0.02rem;
  			margin-bottom:0.08rem;
		}

		ul{
			display:flex;
			padding-bottom:0.1rem;
			position:relative;

			li:not(.slider){
				display:flex;
				flex-direction:column;
				letter-spacing: 0.01rem;
				align-items: baseline;

				&:nth-of-type(2){
					margin:0 0.4rem;
				}
			}

			.slider{
				position:absolute;
				bottom:0;
				left:0;
				height:0.02rem;
				width:0.32rem;
				background:@black-a;
				transition:all .3s cubic-bezier(0.25, 0.1, 0.72, 1.18);
			}

			.num{
				font-size:0.16rem;
				font-weight: 500;
				margin-bottom:0.01rem;
				padding:0 0.03rem;
			}

			.tag{
				font-size:0.12rem;
				padding:0 0.03rem;

			}
		}
	}
</style>

<script>
	import { mapState } from 'vuex';

	export default{
		props:['userMsg'],
		computed:{
			navTag(){
				return [
					{
						type:'NoteList',
						tag:'笔记',
						num:this.userMsg.count.pages_length
					},
					{
						type:'MyFocus',
						tag:'关注',
						num:this.userMsg.count.focus_length
					},
					{
						type:'MyCollect',
						tag:'收藏',
						num:this.userMsg.count.keep_length
					}
				]
			},
			...mapState({
				sliderLeft(){
					return this.$store.state.toggleNav.sliderLeft 
				},
			})
		},
		methods:{
			slide(nav,idx,ev){
				//改变滑动块
				this.$store.commit('TOGGLENAV',{
					type:nav.type,
					index:idx,
					left:ev.target.offsetLeft
				})
			}
		},
		mounted(){
		}
	}
</script>