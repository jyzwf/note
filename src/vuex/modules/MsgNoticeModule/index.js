const msgNoticeModule = {
	state:{
		indexMsg:null,
		hasIndexMsg:null,
		isClose:true,
		hasBadge:false
	},
	mutations:{
		SAVEINDEXMSG(state,payload){
			state.indexMsg = payload.msg
			state.hasIndexMsg = !!payload.msg,
			state.hasBadge = payload.badge
		},
		CHANGESTATEBANNER(state){
			state.isClose = false
		},
		REMOVEBADGE(state){
			state.hasBadge = false
		}

	}
	
};

export { msgNoticeModule }