const noteDetailModule = {
	state:{
		activeComment:{},
		commentTitle:'评论',
		activeNoteId:'',
		isReply:false
	},
	mutations:{
		CHOOSEACTIVE(state,payload){		//回复选择回复的评论
			// payload.isReply?state.commentTitle='回复'+payload.activeInfo.nickname:state.commentTitle='评论';
			state.activeComment = {...payload.activeInfo};
			state.isReply = payload.isReply;
		},
		CLEARACTIVE(state){			//清空之前要回复的评论的信息
			state.isReply =false;
			state.activeComment = {}
		},
		ACTIVENOTEID(state,payload){		//获取page详情的noteId
			state.activeNoteId = payload.noteId;
		}


	}
};

export {noteDetailModule}