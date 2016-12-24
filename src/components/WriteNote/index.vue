<template lang='jade'>
	.to-write
		.write-action
			.publish-tag.qk-wave(@click='selectTags')
				img(src='../../assets/ic-tag.svg')
			.upload-imgs.qk-wave
				img(src='../../assets/ic-cam.svg')
				#qiniu_container(v-show='limitPic')
					#pickfiles
			.publish-tag.qk-wave
				img(src='../../assets/ic-div.svg',@click='divideLine')
			.publish-tag.qk-wave
				img(src='../../assets/ic-link.svg')
			span.qk-wave.preview-icon(@click='preview',:class="{isViewing:showPreview}")
			span.to-publish(@click='beginPublish') 发布

		.write-info
			.write-title
				input(placeholder='添加标题',v-model='title')
				span {{(count)+ '/' +limit}}
			.write-content
				#contentEdit(contenteditable="true",@blur='hidePlaceholder(0)',@focus='hidePlaceholder(1)')
				p.placeholder(v-if='p') 说说你的心得吧
		
		loading(:loadingWord='noticeWords',v-show='showNotice')

		<!-- 选择标签 -->
		transition( name="tag-fade" mode="out-in")
			.choose-tag(v-show='showTags',@click.self='hideSelectTag')
				.tag-model
					p 输入或选择标签
					.tags-choosed
						span.tag-cell(v-for='(tag,idx) in hasSelectTags') {{tag.name}}
							img(src='../../assets/ic-close.svg',@click='removeSelectTags(tag,idx)')
						input(placeholder='请输入标签',v-model='customTag')
					.tags-container
						span.tag-cell(v-for='tag in provideSelectTags',@click='toSelectTags(tag)') {{tag.name}}
					.tag-success(@click='successSelect') 完成

		uploader-files.pos-files(:upFiles = 'uploaderFiles',@deletePic='toDeleteFiles',:style="{top:publishingTop+'px'}",)
			p.noUploader.pos-center(v-if='!uploaderFiles[0]') - 暂无图片插入 -

		transition(name="write-fade" ,mode='out-in')
			preview(:previewHtml='previewContent',:articleTitle='title',:articleImgs='uploaderFiles',v-if='showPreview')

</template>

<style scoped lang='less'>
@white:#fff;
@limit:rgba(0, 0, 0, 0.38);
@addFile:#D9D9D9;
@black-a:rgba(0, 0, 0, 0.87);
@placeholder:#afafaf;
@publishActive:rgba(255,255,255,.4);
@shadow-color:rgba(0, 0, 0, .12);
@files-bg:#f8f8f8;
@tags-choose:rgba(0, 0, 0, 0.5);
@choosed-color:#fafafa;
@choosed-tag:#333;
@unchoosed-color:#999;

	.write-action{
		display:flex;
		padding:0rem 0.12rem 0rem 0.16rem;
		align-items:center;
		position:fixed;
		width:100%;
		height:0.48rem;
		left:0;
		top:0;
		box-shadow: 0 0.01rem 0.02rem 0 @shadow-color;
		background:@white;
		    z-index: 9;
		*{
			cursor: pointer;
		}
		.publish-tag,.preview-icon{
			width:0.24rem;
			height:0.24rem;
			margin-right:0.32rem;

			img{
				width:100%;
				height:100%;
			}
		}
		.to-publish{
			background:@black-a;
			color:@white;
			padding:0.06rem .12rem;
			border-radius:0.2rem;
			font-size:0.14rem;
		}

		.preview-icon{
			background:url('../../assets/ic-review.svg') center no-repeat;
			background-size:0.24rem 0.24rem;

			&.isViewing{
				background:url('../../assets/ic-review-off.svg') center no-repeat;
				background-size:0.24rem 0.24rem;
			}
		}
	}

	/*选择标签*/
	.choose-tag{
		position:fixed;
		left:0;
		top:0;
		width:100%;
		height:100%;
		z-index:99;
		display:flex;

		&:before{
			content: "";
			width:100%;
			height:100%;
			position:absolute;
			left:0;
			top:0;
			background:@tags-choose;
			z-index:9;
		}
		.tag-model{	
			width:3.12rem;
			margin:auto;
			background:@white;
			z-index:10;
			padding:0.16rem;
			border-radius:0.06rem;

			p{
				font-size: 0.13rem;
				font-weight:500;
				color:@black-a;
				margin-bottom:0.16rem;
			}

			.tags-choosed{
				background:@choosed-color;
				padding:0.08rem .1rem;
				border:0.01rem solid @shadow-color;
				border-radius:0.06rem;

				.tag-cell{
					background:@choosed-tag;
					
				}

				img{
					width:0.14rem;
					height:0.14rem;
					margin-left:0.04rem;
				}
			}

			.tag-cell{
				padding:0.08rem .1rem;
				font-weight: 500;
				color:@white;
				font-size:0.13rem;
				margin-right:0.08rem;
				border-radius:0.03rem;
				margin-bottom:0.08rem;
				background:@unchoosed-color;
				cursor:pointer;
			}

			input{
				display:block;
				background:transparent;
				font-size:0.13rem;
				width:100%;
			}

			.tags-container{
				padding:0.16rem 0.1rem;
			}

			.tag-success{
				padding:0.1rem;
				text-align:center;
				color:@black-a;
				font-size:0.13rem;
			}
		}
	}

	.upload-imgs{		//上传图片的按钮
		width:0.24rem;
		height:0.24rem;
		margin-right:0.32rem;
		position:relative;

		img,#qiniu_container{
			width:100%;
			height:100%;
		}

		#qiniu_container{
			position:absolute;
			left:0;
			top:0;

			&>div{
				width:100%;
				height:100%;
			}
		}

	}

	.write-info{
		padding:0.5rem 0.2rem 0;
		background:@white;
		margin-bottom:1.2rem;

		.write-title{		//note title
			display: flex;
			align-items:center;
			margin: 0.16rem 0;
			
			input{
				flex:auto;
				font-size:0.18rem;
				font-weight: bold;
				margin-right:0.1rem;
				letter-spacing: 0.02rem;
			}

			span{
				color:@limit;
				font-size:0.15rem;
				letter-spacing: 0.01rem;
			}
		}
	}

	.write-content{		//note内容
		position:relative;
		font-size:0.15rem;
		#contentEdit{
			outline:none;
			letter-spacing:0.01rem;
			user-select :text;
		}

		.placeholder{
			position:absolute;
			left:0;
			top:0rem;
			color:@placeholder;
			pointer-events: none;
		}
	}


	.pos-files{			//上传完成后的图片位置
		position:fixed;
		left:0;
		padding:0 0.12rem;
		display:flex;
		align-items:center;
		width:100%;
		height:0.90rem;
		background:@files-bg;
		box-shadow: inset 0 0.01rem 0.04rem 0 @shadow-color;

		.noUploader{
			font-size:0.15rem;
			color:@limit;
			letter-spacing:0.01rem;
		}
	}


.write-fade-enter-active, .write-fade-leave-active {		//预览的切换
    transition: all .25s ease;
  }

  .write-fade-enter,.write-fade-leave-active{
    opacity:0;
    transform:translateX(3rem);
  }

.tag-fade-enter-active, .tag-fade-leave-active {		//选择标签的切换
    transition: all .25s ease;
  }

  .tag-fade-enter,.tag-fade-leave-active{
    opacity:0;
    transform:translateY(-3rem);
  }


	
</style>

<script>

import Loading from 'components/Loading';
import uuid from 'node-uuid';
import UploaderFiles from 'components/UploaderFiles';
import Preview from 'components/Preview';

	export default{
		data(){
			return{
				title:'',	//标题
				content:'',	//内容
				limit:18,	//最大字数
				uploaderFiles:[],	//已经上传的文件数组
				uploaderToken:'',	//七牛的token
				noticeWords:['正','在','上','传'],
				showNotice:false,
				isPublishing:false,
				p:true,			//输入框提示是否显示的开关
				publishingTop:0,	//发布按钮的距离顶部高度
				isShowPublish:true,	//发布按钮在设置好top后再显示的开关
				showPreview:false,
				previewContent:'',
				showTags:false,	//是否显示标签选项的model
				customTag:'',	//自定义标签
				hasSelectTags:[],	//已经选择的标签
				provideSelectTags:[		//提供选择的标签
					
				]
			}
		},
		components:{
			Loading,
			UploaderFiles,
			Preview
		},
		computed:{
			count(){	//字数随输入的字数的长度改变而改变
				return this.title.trim().length
			},
			finalTopic(){
				if(this.customTag.trim() == ''){
					let finalTags = this.hasSelectTags.map(x=>{
						return x.name
					})
					return finalTags
				}
				if(this.hasSelectTags.length<1){
					return [this.customTag]
				}

				let finalTags = this.hasSelectTags.map(x=>{
					return x.name
				})
				return [this.customTag,...finalTags]
			},
			limitPic(){
				return this.uploaderFiles.length<9
			}
		},
		watch: {
  		  title (newVal) {			//限制字数，超出自动截断
  		      this.title = newVal.slice(0, this.limit)
  		  }
  		},
  		methods:{
  			hidePlaceholder(type){			//隐藏提示字
  				if(type === 0){
  					if(document.querySelector('#contentEdit').innerHTML.trim() == ''){
  						this.p = true;
  						return false;
  					}
  				}
  				this.p = false
  			},
  			toDeleteFiles(idx){		//删除选中的大图
  				let t = confirm('你确定要删除该图片吗?');
				if(t){
  					this.uploaderFiles.splice(idx,1);
  				}
  			},

  			preview(){		//预览

  				this.showPreview = !this.showPreview;

  				if(this.showPreview){
  					this.previewContent = document.getElementById('contentEdit').innerHTML;
  				}
  			},

  			divideLine(){			//分割线
  				document.execCommand('insertHTML',false,'<hr style="background:rgba(0,0,0,.12);border:0;height:0.01rem;margin:0.2rem 0">'); 
  			},


  			selectTags(){		//显示标签选择
  				this.showTags = true;
  			},

  			hideSelectTag(){	//隐藏标签选择
  				this.showTags = false;
  			},

  			toSelectTags(tag){		//选择标签
  				if(!tag.isSelect){
  					this.hasSelectTags.push(tag);
  					tag.isSelect = true
  				}
  			},

  			successSelect(){	//完成标签的选择
  				console.log(this.hasSelectTags.length)
  				if(this.hasSelectTags.length>0 || this.customTag.trim()!==''){
  					this.hideSelectTag();
  					return false;
  				}
  				alert('请填写标签');
  			},
  			removeSelectTags(item,idx){		//删除所选标签
  				this.hasSelectTags.splice(idx,1);
  				this.provideSelectTags[item.order]['isSelect'] = false
  			},

  			uploader_img(){			//七牛上传图片配置
                let _this = this;
                            this.uploader = Qiniu.uploader({
                            runtimes: 'html5,flash,html4', 
                            browse_button: 'pickfiles',    
                            uptoken: _this.uploaderToken,      
                            domain: 'qiniu.xtongtong.com', 
                            get_new_uptoken: false,  
                            container: 'qiniu_container',   
                            max_file_size: '100mb',     
                            flash_swf_url: 'http://cdn.staticfile.org/Plupload/2.1.1/Moxie.swf', 
                            max_retries: 3,               
                            dragdrop: false, 
                            chunk_size: '4mb', 
                            auto_start: true,
                            unique_names:false,
                            save_key: false,
                            multi_selection: false,
                            init: {
                                'FilesAdded': function(up, files) {
                                	console.log(files);
                                	_this.showNotice = true;
                                },
                                'FileUploaded': function(up, file, info) {
                                	console.log(info);
                                	let formatInfo = JSON.parse(info);
                                	_this.uploaderFiles.push(formatInfo.key);
                                	_this.noticeWords = ['上','传','成','功'];
                                	_this.showNotice = false;
                                },
                                'UploadComplete': function() {
                                },
                                'Error': function(up, err, errTip) {
                                      _this.noticeWords = ['上','传','失','败'];
                                      _this.showNotice = false;
                                },
                                'Key': function(up, file) {		//配置文件名为:uuid+文件名后缀名
                                	let file_subfix = file.name.replace(/[\s\S]*\./gi,'.');
                                    var key = uuid.v1()+file_subfix;
                                    return key
                                }
                            }
                        });
				},
				validata(){	//验证表单方法
					let content = document.querySelector('#contentEdit').innerHTML;
					if(this.title.trim() == ''){
						return '请输入标题';
					}

					if(content.trim() == ''){
						return '请输入文章内容'
					}

					if(this.uploaderFiles.length<1){
						return '请至少选择一张图片'
					}

					if(this.hasSelectTags.length<1 && this.customTag.trim()==''){
						return '请填写标签'
					}




				},
				beginPublish(){		//通过验证后开始发布
					if(this.isPublishing){
						return false
					}

					this.isPublishing = true;

					let err = this.validata();
					if(err){
						alert(err);
						this.isPublishing = false;
						return false;
					}



					this.noticeWords = ['正','在','发','布'];
                    this.showNotice = true;



					let sendData = {
						title:this.title,
						content:document.querySelector('#contentEdit').innerHTML.trim(),
						poster:this.$store.state.baseConfig.userInfo._id,
						uploaderFiles:this.uploaderFiles,
						topic:this.finalTopic
					},
					_this = this;

					console.log(sendData);
					// return false;
					this.$http.post(`${this.$store.state.baseConfig.host}postpage`,sendData,{"emulateJSON":true,"emulateHTTP":true})
						.then(function(res) {
							console.log(res)
							if(res.data.code === 0){
								_this.noticeWords = ['发','布','成','功'];
                    			let t = setTimeout(()=>{
                    				_this.showNotice = false;
                    				clearTimeout(t)
                    				this.isPublishing = false;
                    				_this.$router.push('/');
                    			},1100)
							}else{
								_this.noticeWords = ['发','布','失','败'];
								let t = setTimeout(()=>{
                    				_this.showNotice = false;
                    				clearTimeout(t)
                    				this.isPublishing = false;
                    			},1100)
							}


							
                		},function(err){
                	    	console.log(err)
                	    	_this.noticeWords = ['发','布','失','败'];
							let t = setTimeout(()=>{
                    			_this.showNotice = false;
                    			clearTimeout(t)
                    			this.isPublishing = false;
                    		},1100)
                		})
				}
  		},



  		mounted(){
  			//获取七牛的token
  			this.$http.get(`${this.$store.state.baseConfig.host}uptoken`).then((data)=>{
				this.uploaderToken = data.data.msg.uptoken;
				this.uploader_img();
			})

			this.$http.get(`${this.$store.state.baseConfig.host}topic/recommend`).then(data=>{
				if(data.data.code == 0){
					this.provideSelectTags = data.data.msg
				}
			})

			this.publishingTop = window.innerHeight - document.querySelector('.pos-files').offsetHeight;
  			console.log(this.publishingTop,document.querySelector('.pos-files').offsetHeight)
  			//显示按钮
			this.isShowPublish = false;

  		}
	}
</script>