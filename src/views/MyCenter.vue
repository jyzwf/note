<template lang='jade'>
	.my-center
		user-Center-header(:userMsg='userInfo')
		.my-detail
			transition(name="qukecenter-fade" mode="out-in")
				components(:is='nav',:opId='openId',noteUrl="users/page/",@cancelfocus='subFocus')
					.no-aboutmy(slot='writeNote',v-if='showWrite')
						img(src='../assets/img-empty-state.svg')
						.attention 当前没有笔记哦
						p
							router-link.center-write(to='/writenote') 我要写笔记
</template>

<style scoped lang='less'>
@white:#fff;

	.my-detail{
		padding:1.15rem 0.16rem 0.16rem;
	}

	.qukecenter-fade-enter-active, .qukecenter-fade-leave-active {
    transition: all .25s ease;
  }

  .qukecenter-fade-enter{
    opacity:0;
    transform:translateX(3rem);
  }

   .qukecenter-fade-leave-active {
    opacity:0;
    transform:translateX(-3rem);
  }



</style>

<script>
	import { mapState } from 'vuex';
	import UserCenterHeader from 'components/UserCenterHeader';
	import NoteList from 'components/NoteList';
	import MyFocus from 'components/MyFocus';
	import MyCollect from 'components/MyCollection';

	export default{
		data(){
			return{
				userInfo:{}
			}
		},
		computed:{
			openId(){
				return this.$store.state.userCenterConfig.userId;
			},
			showWrite(){
				return this.$store.state.userCenterConfig.noteResult;
			},
			...mapState({
				nav(){
					console.log(this.$store.state.toggleNav.nowNav+'*********')
					return this.$store.state.toggleNav.nowNav
				}
			})
		},
		components:{
			UserCenterHeader,
			NoteList,
			MyFocus,
			MyCollect
		},

		watch: {
  		  '$route' (to, from) {
  		  	this.$store.commit('TOGGLENAV',{
  		  		type:'NoteList',
  		  		index:0,
  		  		left:0
  		  	});

  		    this.$http.get(`${this.$store.state.baseConfig.host}users/base/${to.params.userId}`).then((data)=>{
				let formatData = data.data;
				this.userInfo = {...formatData.msg};
			});
  		  }
  		},
  		methods:{
  			subFocus(){
  				this.userInfo.count.focus_length -=1;
  			}
  		},

		mounted(){


			this.$store.commit('TOGGLENAV',{
				type:'NoteList',
				index:0,
				left:0
			});


			// 加载一开始的数据 ---我的信息
			this.$http.get(`${this.$store.state.baseConfig.host}users/base/${this.openId}`).then((data)=>{
				let formatData = data.data;
				this.userInfo = {...formatData.msg};
			});

		}
	}
</script>