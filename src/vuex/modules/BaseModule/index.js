const baseModule = {
	state:{
		host:'http://120.55.168.36:1001/',
		userInfo:{},
		isLoading:false
	},
	mutations:{
		SAVEUSERINFO(state,payload){
			state.userInfo = payload
		},
		SETROUTERLOADING(state,payload){
			console.log(payload.loading)
			state.isLoading = payload.loading
		}
	}
};

export { baseModule }