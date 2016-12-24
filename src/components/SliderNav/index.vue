<template lang='jade'>
	.classification
		.swiper-container.quke-container
			.swiper-wrapper
				.swiper-slide.quke-slide(v-for="item in tag") {{item.name}}
			<!-- .swiper-pagination -->
</template>

<style lang='less' scoped>
@white:#fff;

	@import "../../../node_modules/swiper/dist/css/swiper.min.css";
	
	.quke-container{
		background:#fc4766;

		.quke-slide{
			background:white;
			width:30%;
			height:0.4rem;
			line-height:0.4rem;
			text-align:center;
		}
	}

</style>

<script>
	import Swiper from 'swiper';
	export default{
		data(){
			return {
				tag:[
					{
						name:'推荐'
					},
					{
						name:'护肤'
					},
					{
						name:'时尚'
					},
					{
						name:'彩妆'
					},
					{
						name:'生活'
					},
					{
						name:'旅行'
					},
					{
						name:'男人'
					}
				]
			}
		},
		mounted(){
			new Swiper('.swiper-container',{
                observer: true,
                resistanceRatio: 0,
                slidesPerView:'auto',
                centeredSlides:false,
                freeMode:true,
                freeModeMomentumBounce:false
			})
		}
	}
</script>