<template lang='jade'>
	#note-detail
		transition(name="detail-fade")
			user-info-header(:noterInfo='noteDetailData.common.poster',:isSelf='noteDetailData.common._isself',@aboutFocus='operateFocus',v-show='isDetail')

		note-article(:articlePart='noteDetailData.common.main',@aboutKeep='operateKeep',@aboutSpot='operateSpot')
			span.delete-note(slot='delete',v-if='noteDetailData.common._isself',@click='showMask') 删除笔记
			button.init-btn.share-note(slot='share',v-if='noteDetailData.common._isself',@click='showSHare') 分享
		note-comment-show.detail-comment(:commentList='noteDetailData.common.comment')
			.my-comment(slot='my-comment')
				img(:src='noteDetailData.user.headimgurl')
				button.init-btn.to-reply(@click='toComment') 发表评论…
			router-link.watch-all.t-border(slot='watch-all',:to="'/note-comment/'+noteId",v-if='noteDetailData.common.commentLength>3') 查看全部{{noteDetailData.common.commentLength}}条评论

		action-sheet(v-show='maskActive',@hide='hideSheet')
			.sheet-cell.b-border(slot='delete',@click='deleteNote') 删除
		
		share-note(:articeId='noteId',v-if='openShare',@operateShare = 'hideShare')

</template>	

<style scoped lang='less'>

@comment-words:#999;
@btn-color:rgba(0, 0, 0, 0.54);
@comment-bg:#f5f5f5;
@white:#fff;
@delete-color:#ff2d2d;

	.my-comment{
		padding:0.1rem 0.16rem;
		display: flex;
		img{
			width:0.32rem;
			height:0.32rem;
			margin-right:0.12rem;
			border-radius:0.03rem;
		}

		.to-reply{
			flex:auto;
			padding-left:0.12rem;
			background:@white;
			color:@btn-color;
			text-align:left;
			font-size:0.12rem;
		}
	}

	.delete-note{
		color:@delete-color;
		letter-spacing: 0.01rem;
		margin-left:0.08rem;
		font-weight: 500;
		cursor: pointer;
		font-size:0.12rem;
	}


	.watch-all{
		padding:0.1rem;
		text-align:center;
		display: block;
		color:@comment-words;
		margin-bottom:0.15rem;
		font-size:0.14rem;
	}

	.detail-comment{
		margin-bottom:0.7rem;
		background:@comment-bg;
		border-radius:0.12rem;
	}

	.detail-fade-enter-active, .detail-fade-leave-active {
    transition: all .4s ease;
  }

  .detail-fade-enter,.detail-fade-leave-active{
    transform:translateY(1rem);
  }

</style>

<script>
	import CommonHeader from 'components/CommonHeader';
	import UserInfoHeader from 'components/UserInfoHeader';
	import Carousel from 'components/Carousel';
	import NoteArticle from 'components/NoteArticle';
	import NoteCommentShow from 'components/NoteCommentShow';
	import RecommendGoods from 'components/RecommendGoods';
	import ActionSheet from 'components/ActionSheet';
	import ShareNote from 'components/ShareNote';

	export default{
		components:{
			CommonHeader,
			UserInfoHeader,
			Carousel,
			NoteArticle,
			NoteCommentShow,
			RecommendGoods,
			ActionSheet,
			ShareNote
		},
		data(){
			return{
				noteDetailData:{},
				maskActive:false,
				isDetail:true,
				detailScroll:0,
				openShare:false
			}
		},
		computed:{
			noteId(){
				return this.$route.params.noteId
			},
			openId(){
				return this.$store.state.baseConfig.userInfo._id
			},
			
		},
		methods:{
			toComment(){		//	去评论
				this.$store.commit('CHOOSEACTIVE',{
					isReply:false,
					activeInfo:{}
				})

				this.$router.push('/reply')
			},

			showSHare(){
				this.openShare = true;
			},
			hideShare(){
				this.openShare = false;
			},

			operateFocus(type){		//关注
				if(type === 1){
					this.noteDetailData.common.poster.isfocus = true;
				}else{
					this.noteDetailData.common.poster.isfocus = false;
				}
			},

			operateKeep(type){		//收藏
				if(type === 1){
					this.noteDetailData.common.main.iskeep = true;
				}else{
					this.noteDetailData.common.main.iskeep = false;
				}
			},

			operateSpot(type){		//点赞
				if(type === 1){
					this.noteDetailData.common.main.isspot = true;
					// this.noteDetailData.common.main.spot = +this.noteDetailData.common.main.spot + 1;
					this.noteDetailData.common.main.spot += 1;
				}else{
					this.noteDetailData.common.main.isspot = false;
					this.noteDetailData.common.main.spot = this.noteDetailData.common.main.spot - 1;
				}
			},

			showMask(){		//显示遮罩
				this.maskActive = true;
			},

			hideSheet(){		//隐藏遮罩
				this.maskActive = false;
			},
			showHost(){
				let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
				// console.log(scrollT,this.detailScroll)
				if(scrollT>200 && scrollT>this.detailScroll){
					this.isDetail = false;
				}else if(scrollT<=this.detailScroll){
					this.isDetail = true;
				}
					this.detailScroll = scrollT;
			},
			deleteNote(){	//删除笔记
				console.log(this.$store.state.aboutNote.activeNoteId)
				let t = confirm('主人,你真不要我了吗><');
				if(t){
					this.$http.post(`${this.$store.state.baseConfig.host}delete/page`,{
						page_id:this.noteId,
						user_id:this.openId
					},{"emulateJSON":true,"emulateHTTP":true})
					.then((data)=>{
						let formatData = data.data;
						if(formatData.code === 0){
							this.$router.replace('/')
						}
					})
				}
				
			}


		},
		mounted(){
			this.$store.commit('ACTIVENOTEID',{		//获取当前笔记的nodeId
				noteId:this.noteId
			});

			this.detailScroll = window.scrollY; 
			// 加载一开始的数据
			this.$http.post(`${this.$store.state.baseConfig.host}homepage/detail`,{
				page_id:this.noteId,
				user_id:this.openId
			},{"emulateJSON":true,"emulateHTTP":true})
			.then((data)=>{
				let formatData = data.data;
				this.noteDetailData = formatData.msg;
			})

			window.addEventListener('scroll',this.showHost,false)
		},
		beforeDestroy(){
			window.removeEventListener('scroll',this.showHost,false)
		}
	}
</script>