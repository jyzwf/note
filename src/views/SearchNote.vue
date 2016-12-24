<template lang='jade'>
	.search-note
		header.ele-justify
			input(placeholder='输入或选择笔记标签',type='search',v-model='searchNote')
			.operate-search
				img(src='../assets/toolbar-search.svg',@click='toSearch(searchNote)')
				img.close(src='../assets/toolbar-search-copy.svg',@click='closeSearch')

		ul
			li(v-for='tag in searchTags',@click='toSearch(tag.link)') {{tag.name}}
</template>

<style lang='less' scoped>
	@black-border:rgba(0,0,0,.12);
	@input-bg:#f5f5f5;
	@black-a:rgba(0, 0, 0, 0.87);
	header{
		border-bottom:0.01rem solid @black-border;
		height:0.56rem;
		padding:0 0.24rem 0 0.12rem;

		input{
			background:@input-bg;
			height:.36rem;
			padding:0.08rem 0.12rem;
			width:2.41rem;
			font-size:0.14rem;
			letter-spacing:0.01rem;
			border-radius:0.03rem;
		}

		img{
			width:.24rem;
			min-width:.24rem;
			height:0.24rem;
			cursor: pointer;

			&.close{
				margin-left:.2rem;
			}
		}
	}

	ul{
			padding:0.24rem;

			li{
				font-size:0.16rem;
				font-weight: 500;
				margin-bottom:0.16rem;
				letter-spacing:.02rem;
				color:@black-a;
			}
		}
</style>

<script>
	export default{
		data(){
			return {
				searchTags:[
					// {
					// 	name:'#即时热度',
					// 	link:'即时热度'
					// },
					// {
					// 	name:'#热门收藏',
					// 	link:'热门收藏'
					// },
					// {
					// 	name:'#热门评论',
					// 	link:'热门评论'
					// },
					// {
					// 	name:'#其他关键词',
					// 	link:'其他关键词'
					// }
				],
				searchNote:''
			}
		},
		methods:{
			toSearch(name){
				if(name.trim() == ''){
					alert('请输入搜索内容');
					return false;
				}
				this.$store.commit('SETSEARCHTAG',{
					search:name
				});
				this.$router.push('/searchresult');
			},
			closeSearch(){
				this.$router.push('/');
			}
		},
		mounted(){
			this.$http.get(`${this.$store.state.baseConfig.host}topic/hot`).then(data=>{
				if(data.data.code == 0){
					this.searchTags = data.data.msg
				}
			})
		}
	}
</script>