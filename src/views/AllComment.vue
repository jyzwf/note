<template lang='jade'>
	.all-comment
		common-header(title='评论',url='javascript:window.history.back();return false;')
		note-comment-show.comment-bottom(:commentList='allComment')
		.my-comment.t-border(slot='my-comment')
			img.qk-round(:src='headingImg')
			button.init-btn.to-reply(@click='toComment') 想勾搭先评论
</template>

<style lang='less' scoped>
@my-comment:#f5f5f5;
@comment-words:#999;
@white:#fff;
	
	.comment-bottom{
		margin-bottom:0.7rem;
	}

	.my-comment{
		background:@white;
		padding:0.1rem 0.15rem;
		display: flex;
		position:fixed;
		bottom:0;
		left:0;
		right:0;

		img{
			width:0.32rem;
			height:0.32rem;
			margin-right:0.08rem;
		}

		.to-reply{
			flex:auto;
			padding-left:0.15rem;
			background:@my-comment;
			color:@comment-words;
			text-align:left;
			font-size:0.12rem;
		}
	}
</style>

<script>
	import CommonHeader from 'components/CommonHeader';
	import NoteCommentShow from 'components/NoteCommentShow';

	export default{
		data(){
			return {
				allComment:[]
			}
		},
		components:{
			CommonHeader,
			NoteCommentShow
		},
		computed:{
			commentId(){
				return this.$route.params.commentId
			},
			headingImg(){
				return this.$store.state.baseConfig.userInfo.headimgurl;
			}
		},
		methods:{
			toComment(){
				this.$store.commit('CHOOSEACTIVE',{
					isReply:false,
					activeInfo:{}
				})

				this.$router.push('/reply')
			}
		},
		mounted(){
			// 加载一开始的数据
			this.$http.get(`${this.$store.state.baseConfig.host}homepage/comment/${this.commentId}`).then((data)=>{
				let formatData = data.data;
				this.allComment = formatData.msg.comment;
			})
		}
	}
</script>