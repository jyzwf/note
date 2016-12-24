const navModule = {
	state:{
		nowNav:'NoteList',
		navs:{
			'NoteList':'NoteList',
			'MyFocus':'MyFocus',
			'MyCollect':'MyCollect'
		},
		navsIndex:0,
		sliderLeft:0
	},
	mutations:{
		TOGGLENAV(state,payload){
			state.nowNav = state.navs[payload.type];
			state.navsIndex = payload.index;
			state.sliderLeft = payload.left;
		}
	}
};

export {navModule}
