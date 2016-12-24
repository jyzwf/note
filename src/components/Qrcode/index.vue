<!-- 二维码 -->
<template lang='jade'>
	.qrCode(@touchstart.self='forbid($event)')
		.qrcode-wrapper
			.bg-wave
			p 好像出了点问题? 长按识别二维码关注味噌公众号, 或者重新打开页面.
			img.qrcode-img(src='../../assets/qrcode.jpg')
			img.quke-logo.qk-round(src='../../assets/logo.png')
</template>	

<style	lang='less' scoped>
@qrcode-bg:rgba(0, 0, 0, 0.5);
@white:#fff;
@black-a:rgba(0, 0, 0, 0.87);

	.qrCode{
		position:fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		z-index:999;
		display:flex;
		background:@qrcode-bg;
		text-align:center;
	}

	.qrcode-wrapper{
		margin:auto;
		width:2.8rem;
		background:@white;
		border-radius:0.08rem;
		position:relative;
	}

	.bg-wave{
		height:0.56rem;
		width:100%;
		background:url(../../assets/dialog-wave.svg) center repeat;
		background:cover;
	}

	p{
		font-size:0.13rem;
		letter-spacing:0.01rem;
		padding:0 0.24rem;
		color:@black-a;
	}

	.qrcode-img{
		width:2.4rem;
		height:2.4rem;
		margin-top:0.08rem;
		margin:0.2rem;
	}

	.quke-logo{
		position:absolute;
		width:0.8rem;
		height:.8rem;
		left:50%;
		margin-left:-0.4rem;
		top:-0.4rem;
	}
</style>

<script type="text/javascript">
	export default{
		methods:{
			forbid(ev){
				ev.preventDefault();
			}
		}
	}
</script>