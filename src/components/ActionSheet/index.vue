<template lang='jade'>
	.action-sheet
		.action-mask.sheet-mask(@click='cancelMask')
		.sheet-group
			slot(name='reply')
			<!-- .sheet-cell.b-border 举报 -->
			slot(name='delete')
			.sheet-cell.t-border.sheet-cancel(@click='cancelMask') 取消
</template>

<style scoped lang='less'>
@sheet-bg:#eee;
@cell-bg:#fff;
	.action-mask{
		position:fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		z-index:9;
	}

	.sheet-group{
		position:fixed;
		z-index:9;
		background:@sheet-bg;
		bottom:0;
		width:100%;
		
		font-size:0.18rem;

		.sheet-cell{
			padding:0.1rem;
			text-align:center;
			background:@cell-bg;

			a{
				display: block;
				width:100%;
			}
		}

		.sheet-cancel{
			margin-top:0.08rem;
		}
	}
</style>

<script>
	export default{
		methods:{
			cancelMask(){
				this.$emit('hide')
			}
		}
	}
</script>