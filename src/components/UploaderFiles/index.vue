<template lang='jade'>
	.up-filers
		slot
		.swiper-container.quke-files#swiper2
			.swiper-wrapper
				.swiper-slide.quke-img(v-for='(item,idx) in upFiles')
					img.carousel-img(:src="'//qiniu.xtongtong.com/'+item")
					span(@click='deleteFile(idx)')

</template>

<style lang='less' scoped>
@white:#fff;

	@import "../../../node_modules/swiper/dist/css/swiper.min.css";
	.quke-files{
		margin:0;
	}
	.quke-img{
		border-radius:0.02rem;
		position:relative;
		width:0.64rem;
		height:0.64rem;

		span{
			width:0.16rem;
			height:0.16rem;
			position:absolute;
			right:0;
			top:0;
			background:url(../../assets/ic-del-pic.svg) center center no-repeat;
			background-size:cover;
			cursor:pointer;
			border-top-right-radius:0.02rem;
		}
	}
	.carousel-img{
		width:100%;
		height:100%;
		object-fit: cover;
		border-radius:0.02rem;
	}

	
</style>

<script>
	import Swiper from 'swiper';
	export default{
		props: ['upFiles'],
		data(){
			return {
				space_w:0
			}
		},
		watch:{
			upFiles(val){
				this.swiper();
			}
		},
		methods:{
			swiper(){		//轮播
					new Swiper('#swiper2',{
            		    observer: true,
            		    lazyLoading: true,
            		    resistanceRatio: 0,
            		    slidesPerView:'auto',
            		    spaceBetween:this.space_w,
            		    centeredSlides:false,
            		    freeMode:true,
            		    freeModeMomentumBounce:false
					})
			},
			deleteFile(idx){		//删除图片
  				this.$emit('deletePic',idx)
  			}
		},
		mounted(){

			let htmlFont = parseFloat(window.document.documentElement.style.fontSize);	//获取根字体大小

			this.space_w = 0.08 * htmlFont;

			// this.$nextTick(()=>{
			// 	if(this.upFiles.length>1){
			// 		this.space_w = 0.08 * htmlFont;
			// 		this.swiper();
			// 	}
			// })
			
		}
	}
</script>