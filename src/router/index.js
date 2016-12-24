import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
	{
		path:'/',
		component:Home
	},
	{		//笔记详情页
		path:'/note-detail/:noteId',
		component(resolve){
			require(['../views/NoteDetail.vue'],resolve)
		}
	},
	{		//笔记所有评论页
		path:'/note-comment/:commentId',
		component(resolve){
			require(['../views/AllComment.vue'],resolve)
		}
	},
	{		//评论或回复笔记
		path:'/reply',
		component(resolve){
			require(['../views/Comment.vue'],resolve)
		}
	},
	{		//个人中心
		path:'/mycenter/:userId',
		component(resolve){
			require(['../views/MyCenter.vue'],resolve)
		}
	},
	{		//写笔记
		path:'/writenote',
		component(resolve){
			require(['../views/WriteNote.vue'],resolve)
		}
	},
	{		//搜索笔记
		path:'/searchnote',
		component(resolve){
			require(['../views/SearchNote.vue'],resolve)
		}
	},
	{		//搜索笔记结果
		path:'/searchresult',
		component(resolve){
			require(['../views/SearchResult.vue'],resolve)
		}
	},
	{		//消息列表
		path:'/msgnotice',
		component(resolve){
			require(['../views/MsgList.vue'],resolve)
		}
	}
]



export default new VueRouter({
	routes,
	mode: 'history'
});