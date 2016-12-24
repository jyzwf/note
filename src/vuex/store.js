import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {navModule} from './modules/NavModule'
import {noteDetailModule} from './modules/NoteDeatilModule'
import {baseModule} from './modules/BaseModule'
import {userCenterModule} from './modules/UserCenterModule'
import {writeNoteModule} from './modules/WriteModule'
import {searchModule} from './modules/SearchModel'
import {msgNoticeModule} from './modules/MsgNoticeModule'

const store = {
	modules:{
		toggleNav:navModule,
		aboutNote:noteDetailModule,
		baseConfig:baseModule,
		userCenterConfig:userCenterModule,
		writeNoteConfig:writeNoteModule,
		searchConfig:searchModule,
		indexMsgConfig:msgNoticeModule
	}
};

export default new Vuex.Store( store );