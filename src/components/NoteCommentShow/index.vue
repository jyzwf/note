<template lang='jade'>
	.note-comment
		slot(name='my-comment')
		.comment-list
			.comment-item.b-border(v-for='item in commentList',@click='showSheet(item)')
				.commenter
					img(:src='item.commenter.headimgurl')
				.comment-main
					.commenter-info
						span.nickname {{item.commenter.username}}
						time {{item.time}}
					.comment-words
						span(v-show='item.type==2') 回复了
							em {{item.toname}}: 
						span.break-comment {{item.content}}
		slot(name='watch-all')
		action-sheet(v-show='maskActive',@hide='hideSheet')
			.sheet-cell.b-border(slot='reply')
				router-link(to='/reply',replace) 回复
</template>


<style scoped lang='less'>
@white:#fff;
@zan-color:#ddd;
@black-a:rgba(0, 0, 0, 0.87);


	.comment-list{
		padding-left: 0.15rem;
		padding-right: 0.15rem;
	}

	.comment-item{
		display: flex;
		padding:0.1rem 0;

		&:last-child{
			border:none;
		}
		.commenter{
			img{
				width:0.32rem;
				min-width:0.32rem;
				height:0.32rem;
				margin-right:0.12rem;
				border-radius:0.03rem;
			}
		}

		.comment-main{
			flex:auto;
			padding-right:0.15rem;
			font-size:0.14rem;
			
		}

		.commenter-info{
			color:@zan-color;
			font-size:0.12rem;
			span{
				vertical-align:inherit;
				color:@black-a;
				margin-right:0.08rem;
			}
			img{
				width:0.16rem;
				height:0.18rem;
			}
		}

		.comment-words{
			margin:0.1rem 0;
			font-size:0.12rem;

			span{
				display: inline
			}

			  .break-comment{
			  	word-break: break-all;
			  }

			em{
				color:@zan-color;
			}
		}
	}
</style>

<script>
	import ActionSheet from 'components/ActionSheet';

	export default{
		props:['commentList'],
		components:{
			ActionSheet
		},
		data(){
			return {
				maskActive:false
			}
		},
		methods:{
			showSheet(item){
				this.$store.commit('CHOOSEACTIVE',{
					isReply:true,
					activeInfo:{
						commentId:item._id,
						nickname:item.commenter.username
					}
				})
				this.maskActive = true;
			},
			hideSheet(){
				this.$store.commit('CLEARACTIVE')
				this.maskActive = false;
			}
		}
	}
</script>