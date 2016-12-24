<template lang='jade'>
	#home
		msg-notice.active-notify
		action-header
		note-list.home-lists(noteUrl='homepage')
</template>

<style scoped lang='less'>
	.active-notify{
		padding-top: 0.6rem
	}
	.home-lists{
		padding:0rem 0.16rem 0.16rem;
	}
</style>

<script>
	import NoteList from 'components/NoteList';
	import ActionHeader from 'components/ActionHeader';
	import MsgNotice from 'components/MsgNotice';
	export default{
		components:{
			NoteList,
			ActionHeader,
			MsgNotice
		},
		mounted(){
		}
	}
</script>

