const writeNoteModule = {
	state:{
		title:'',
		noteContent:'',
		notePics:[]
	},
	mutations:{
		
		GETCONTENT(state,payload){
			state.noteContent = payload.noteHtml;
		},

		SETTITLE(state,payload){
			state.title = payload.title;
		},

		PUSHPICS(state,payload){
			state.notePics.push(payload.pic)
		},

		deletePic(state,payload){
			state.notePics.splice(payload.idx,1)
		}

	}
};

export { writeNoteModule }