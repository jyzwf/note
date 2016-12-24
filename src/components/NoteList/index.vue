<template lang='jade'>
	.note-list
		slot(name='writeNote')
		ul.leftPart.water-container
		ul.rightPart.water-container
		p.loadingOver(:class="{over:loadingOver}")	已全部加载
</template>


<style lang='less'>
@white:#fff;
@init-color:#ddd;
@note-content:rgba(0, 0, 0, 0.54);
	.note-list{
		position:relative;
		

		&:after{
			content:'';
			display: block;
			clear:both;
		}


		.leftPart{
			float:left;
		}

		.rightPart{
			float:right;
			flex:1
		}

		.loadingOver{
			clear: both;
    		margin: 0.1rem;
    		text-align: center;
    		&.over{
    			opacity:0;
    		}
		}

		.note-container{
			padding-bottom:0.12rem;
			cursor: pointer;

		}

		
		.note-items{
			display: flex;
			flex-direction:column;
			font-size:0.12rem;
			
			&>.cover-container{
				width:100%;
				background:@init-color;
				border-radius: 0.08rem;
				img{
					width:100%;
					border-radius: 0.08rem;
					user-select: none;
				}
			}

			.note-header{
				margin:0.08rem 0;
				display:flex;
				justify-content:space-between;
				align-items: baseline;

				h5{
					flex:auto;
					-webkit-line-clamp: 2;
					line-height:1.5;
					letter-spacing: 0.01rem;
					font-size:0.12rem;
				}
    			
    			span{
    				font-size:0.1rem;
    				min-width:0.4rem;
    				width:0.4rem;
    				color:@note-content;
    				margin-left:0.04rem;
    				text-align: right;
    			}
			}
			.note-content{
    			-webkit-line-clamp: 3;
    			margin-bottom:0.04rem;
    			color:@note-content;
    			line-height:1.5;
    			letter-spacing: 0.006rem;
			}

		
		}
	}
</style>


<script>
// 获取每个note的宽度
function getWidth(){
	var win_w = window.innerWidth,
		cell = 2,
		note_w=0;
		var isIPhone = window.navigator.appVersion.match(/iphone/gi);
		

		if(isIPhone){
			note_w = (win_w - 96)/2;
		}else{
			note_w = (win_w - 48)/2;
		}
	return Math.floor(note_w);
}



// note模板字符串
function noteModel(obj){
	return `<li class="note-container" data-link='${obj._id}'>
	<div class="note-items">
		<div class="cover-container" >
			<img src="${obj.img[0]}" height='${getWidth()/obj.ratio}' alt="">
		</div>

		<div class="note-bottom">
			<div class='note-header'>
				<h5 class='line-clamp'>${obj.title}</h5>
				<span>UP${obj.up}</span>
			</div>
			<div class="note-content line-clamp">${obj.content.replace(/<[^>]*?>/gi,'').slice(0,50)}</div>
		</div>
	</div>
</li>`
}

import QukeLoading from 'components/QukeLoading';

	export default{
		props:['noteUrl'],
		data(){
			return {
				noteList:[],
				note_list_copy:[],
				min_h:0,
				note_wrapper:0,
				win_h:0,
				page:1, 		//分页数,
				pageOver:false,	//页数是否结束,
				renderOver:false,	//渲染结束
				loadingOver:true,
				showNotice:false

			}
		},
		computed:{
			sendDate(){
				if(this.noteUrl === 'users/page/'){
					return {
						page:this.page,
						user_id:this.$store.state.userCenterConfig.userId
					}
				}else if(this.noteUrl === 'homepage'){
					return {
						page:this.page
					}
				}else if(this.noteUrl === 'topic/search'){
					return {
						page:this.page,
						key:this.$store.state.searchConfig.searchTag
					}
				}
			}
		},
		components:{
			QukeLoading
		},
		watch: {
  		  '$route' (to, from) {
  		  		this.$store.commit('SAVEUSERID',{
  		  			_id:to.params.userId
  		  		});
  		  		
  		  		document.querySelector('.leftPart').innerHTML = '';
  		  		document.querySelector('.rightPart').innerHTML = '';
  		  		this.pageOver = false;
  		  		this.getWaterfalData();
  		  }
  		},
		methods:{
			goDetail(link){		//到详情页
				this.$store.commit('ACTIVENOTEID',{
					noteId:link
				});
				this.$router.push('/note-detail/'+link)
			},
			scrollLoad(){		//滚动加载
				let scrollT = document.documentElement.scrollTop || document.body.scrollTop,
					min_h = Math.min(document.querySelector('.leftPart').offsetHeight,document.querySelector('.rightPart').offsetHeight);

				if(scrollT + this.win_h >= min_h * 0.8){
					if(this.renderOver){
						this.getWaterfalData();
					}
				}
			},
			waterfall (){
					//浮动瀑布流
					if(this.note_list_copy.length==0){
						this.showNotice = false;
						this.renderOver = true;
						return false;
					}

					let nowNote = this.note_list_copy.shift(),
						str = noteModel(nowNote),
						l_h = document.querySelector('.leftPart').offsetHeight,
						r_h = document.querySelector('.rightPart').offsetHeight;
				
					document.querySelector('.leftPart').style.width = `${this.note_wrapper}px`;
					document.querySelector('.rightPart').style.width = `${this.note_wrapper}px`;

					if(l_h<=r_h){
						document.querySelector('.leftPart').innerHTML += str;
					}else{
						document.querySelector('.rightPart').innerHTML += str;
					}

					let lis = Array.from(document.querySelectorAll('body .note-container'));

					lis.forEach((item)=>{
						item.onclick = ()=>{
							let noteId = item.getAttribute('data-link')
							this.goDetail(noteId)
						}
					})
				this.waterfall();
			},
			getWaterfalData(){

				if(this.pageOver){
					this.loadingOver = false;
					let t = setTimeout(()=>{
                    	this.loadingOver = true;
                    	clearTimeout(t)
                    },1800);
					window.removeEventListener('scroll',this.scrollLoad,false);
					return false;
				}
				this.renderOver = false;
				this.$http.post(`${this.$store.state.baseConfig.host}${this.noteUrl}`,this.sendDate,{"emulateJSON":true,"emulateHTTP":true}).then((data)=>{
					
					let formatData = data.data;
					if(formatData.code === 0){
						this.noteList = formatData.msg.pages;
						this.pageOver = formatData.over;
						let _this = this;
						if(this.noteUrl === 'homepage' && !this.$store.state.baseConfig.userInfo.username){
							this.$store.commit('SAVEUSERINFO',formatData.userinfo);
						}
						
						if(this.noteUrl === 'homepage'){
							this.$store.commit('SAVEINDEXMSG',{
								msg:formatData.message,
								badge:formatData.badge
							});
						}

						if(this.noteUrl === 'topic/search'){
							this.$store.commit('SETSEARCHRESULT',{
								result:false
							})
						}else if(this.noteUrl === 'users/page/'){
							this.$store.commit('SETNOTERESULT',{
								result:!_this.noteList[0]
							})
						}

						this.note_list_copy = this.noteList.slice();
						this.waterfall();
						this.page +=1;
					}else{
						this.showNotice = false;
						
						if(this.noteUrl === 'topic/search'){
							this.$store.commit('SETSEARCHRESULT',{
								result:true
							})
							return false;
						}else if(this.noteUrl === 'users/page/'){
							this.$store.commit('SETNOTERESULT',{
								result:true
							})
							return false;
						}
						alert('服务器开小差啦');
					}
					
				},(data)=>{

					this.showNotice = false;
					if(this.noteUrl === 'topic/search'){
						this.$store.commit('SETSEARCHRESULT',{
							result:true
						})
						return false
					}
					
					alert('服务器开小差啦');
					
				})
			}
		},
		mounted(){
			this.note_wrapper = getWidth();
			this.win_h = window.innerHeight;
			this.showNotice = true;
			this.getWaterfalData();
	
			window.addEventListener('scroll',this.scrollLoad,false) 
		},
		beforeDestroy(){
			window.removeEventListener('scroll',this.scrollLoad,false)
		}
	}
</script>