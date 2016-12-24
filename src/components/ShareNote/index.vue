<!-- 分享页面 -->
<template lang='jade'>
	#share-article(@touchmove='forbid($event)',@click.self='hide')
		p 请长按复制下面id
		p.share-words {{articeId}}
		.wrapper-img
			img(src='../../assets/share.jpg')
		
</template>

<style lang="less" scoped>
@sheet-bg:rgba(255,255,255,.9);
@black-a:rgba(0,0,0,1);
	#share-article{
		position:fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		z-index:9;
		text-align:center;
		&:before{
			content:'';
			left:0;
			top:0;
			right:0;
			bottom:0;
			position:absolute;
			background:@sheet-bg
		}
	}

	.noticeCopySuccess{
		position:absolute;
		height:0.56rem;
		line-height:0.56rem;
		text-align:center;
		color:@black-a;
		left:0;
		top:0;
		width:100%;
		font-size:0.16rem;
	}
	
	.operate-id{
		position:relative;
		padding:0.6rem 0.15rem 0.2rem;
	}

	button{
		position:relative;
		color:#fff;
		font-size:0.16rem;
	}
	

	p{
		color:@black-a;
		letter-spacing:0.01rem;
		font-size:0.16rem;
		text-align:center;
		position:relative;

		&:first-child{
			margin-top:0.4rem;
			user-select: none;
		}
	}

	.share-words{
		padding:0.15rem 0;
	}

	.wrapper-img{
		padding:0 .15rem;
		position:relative;
		img{
			width:100%;
		}
	}

	
  	.copy-fade-enter-active, .copy-fade-leave-active {
  	  transition: all .25s ease;
  	}

	.copy-fade-enter,.copy-fade-leave-active{
  	  opacity:0;
  	  transform:translateY(-2rem);
  	}
</style>

<script type="text/javascript">
	export default{
		props:['articeId'],
		data(){
			return {
				toggleNotice:false,
				btnFlag:false
			}
		},
		methods:{
			forbid(ev){
				ev.preventDefault();
			},
			hide(){
				this.$emit('operateShare');
			}
			// toCopy(){
			// 	this.btnFlag = true;
			// 	var noteId=document.querySelector(".input-id");
			// 	console.log(noteId);
			// 	noteId.select(); // 选择对象
			// 	document.execCommand("Copy"); // 执行浏览器复制命令
			// 	this.toggleNotice = true;
			// 	let t = setTimeout(()=>{
			// 		this.toggleNotice = false;
			// 		this.btnFlag = false;
			// 		clearTimeout(t)
			// 	},1200)
			// }
		},

		mounted(){

		}
	}
</script>