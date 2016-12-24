<template lang='jade'>
	.carousel
		.swiper-container#swiper1
			.swiper-wrapper
				.swiper-slide.quke-img(v-for="item in carousels",:class="{'carousel-padding':overOne}",@click='watchBig(item)')
					img.carousel-img(:src="type==1?item:'//qiniu.xtongtong.com/'+item")
		watch-big-img(:bigImg='bigActiveImg',v-show='showBig',@hideOrigin='hideBig')

</template>

<style lang='less' scoped>
@white:#fff;

	@import "../../../node_modules/swiper/dist/css/swiper.min.css";
	.quke-img{
		width:3rem;
		height:2rem;
		border-radius:0.04rem;
	}
	.carousel-img{
		width:100%;
		height:100%;
		border-radius:0.04rem;
		object-fit: cover;
		user-select: none;
	}

	.carousel-padding{
		width:100%;
		padding-left:0.2rem;
		padding-right:0.2rem;
	}
	
</style>

<script>
	import Swiper from 'swiper';
	import WatchBigImg from 'components/WatchBigImg';
	export default{
		props: ['carousels','type'],
		data(){
			return {
				bounce_w:0,
				space_w:0,
				showBig:false,
				bigActiveImg:''
			}
		},
		computed:{
			overOne(){
				return this.carousels.length === 1
			}
		},
		components:{
			WatchBigImg
		},
		methods:{
			swiper(){
					new Swiper('#swiper1',{
            		    observer: true,
            		    lazyLoading: true,
            		    resistanceRatio: 0,
            		    slidesOffsetBefore:this.bounce_w,
            		    slidesOffsetAfter:this.bounce_w,
            		    slidesPerView:'auto',
            		    spaceBetween:this.space_w,
            		    centeredSlides:false,
					})
			},
			watchBig(item){			//查看大图
				let big = '';
				this.type == 1? big = item : big = '//qiniu.xtongtong.com/'+item;
  				this.showBig = true;
  				this.bigActiveImg = big;
  			},
  			hideBig(){			//隐藏大图
  				this.showBig =false;
  				this.bigActiveImg = '';
  			},
		},
		mounted(){

			let htmlFont = parseFloat(window.document.documentElement.style.fontSize);	//获取根字体大小

			this.$nextTick(()=>{
				if(this.carousels.length>1){
					this.bounce_w = 0.2 * htmlFont,
					this.space_w = 0.09 * htmlFont;
					this.swiper();
				}
			})
			
		}
	}
</script>