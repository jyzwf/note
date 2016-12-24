const userCenterModule = {
	state:{
		userId:'',
		noteResult:false
	},
	mutations:{
		SAVEUSERID(state,payload){
			state.userId = payload._id
		},
		SETNOTERESULT(state,payload){
			state.noteResult = payload.result
		}
	}
};

export { userCenterModule }