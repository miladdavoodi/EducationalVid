<template>
    <div>

	<a-modal
		v-if="row.unlock==false"
		title="شروع یادگیری"
		:visible="visible"
		style="top: 20px;"
		:confirmLoading="confirmLoading"
		@cancel="handleCancel">


      <Login v-if="visible & $store.state.tokenRow.length<=2"/>

      <payFactor :rowData="row" v-if="!loading & visible & $store.state.tokenRow.length>=3"/>
      <div v-if="loading" class="center"><a-spin size="large" /></div>

      <template slot="footer">
        <a-button key="back" @click="handleCancel">بیخیال و برگشت</a-button>
      </template>

    </a-modal>

	<div v-if="!loading && row.unlock==false" v-on:click="showModal" class="BuyFixed d-block d-lg-none"><span>شروع یادگیری</span></div>

	<div class="container">
	    <div class="row">

		<div class="col-md-12"><div style="height: 20px"></div></div>
		<div class="col-md-12">

		     <div v-if="loading" class="center">
			 <div style="height: 120px"></div>
                        <a-spin size="large"/>
			<div style="height: 20px"></div>
			 <div>در حال بارگذاری ...</div>
			<div style="height: 20px"></div>

			 <div class="container-fluid">
                            <div class="row">
                                <div v-for="n in 12" class="col-md-6">
                                    <a-skeleton active/>
                                    <div style="height: 30px"></div>
                                </div>
                            </div>
                        </div>

                    </div>

		</div>

		<div v-if="!loading" class="col-lg-8">

		  <video-player v-if="row._id" class="vjs-custom-skin"
				ref="videoPlayer"
				:options="playerOptions"
				@ready="playerIsReady"
		  >
		  </video-player>

		    <div style="height: 20px"></div>

		    <Control :unlock="row.unlock" :videolist="row.videoList" :playId="$route.params.playId"
			     v-if="$route.params.playId && row.videoList"/>

		    <h1>{{row.title}}</h1>
		    <div v-html="row.text"></div>

		    <Info :dataRow="row" class="d-block d-lg-none"/>

		    <b class="title">سرفصل ها</b>

		    <PlayList :unlock="row.unlock" v-if="row.videoList" :videolist="row.videoList"/>

		</div>
		<div v-if="!loading" class="col-lg-4 d-none d-lg-block">
			<Info :dataRow="row"/>
		</div>

	    </div>
	</div>
    </div>
</template>



<script>
    import Login from '../../../components/Home/User/login'
    import payFactor from '../../../components/Home/Pay/payFactor'
    import Info from './info';
    import Control from './Control';
    import PlayList from './playList';
    import axios from 'axios';

    import '../../../assets/custom-themevideo.css'

    import 'videojs-flash'
    import 'videojs-hotkeys'

    export default {
	metaInfo() {
	    return {
		title: this.pageTitle,
	    }
	},

	data() {
	    return {

		pageTitle: "",

		row: [],
		loading: false,

		ModalText: 'ورود به حساب کاربری',
		visible: false,
		confirmLoading: false,

		playerOptions: {
		    height: '360',
		    autoplay: false,
		    sources: [{
			type: 'video/mp4',
			src: ''
		    }],
		    poster: ""
		}
	    }
	},

	watch: {
	    '$store.state.tokenRow': function (token) {
		if (token.length > 3) {
		    this.getOne();
		}
	    }
	},
	methods: {

	    showModal() {
		this.visible = true;
	    },
	    handleCancel(e) {
		this.visible = false;
	    },
	    playerIsReady(player) {

		player.hotkeys({
		    volumeStep: 0.1,
		    seekStep: 5,
		    enableModifiersForNumbers: false,
		    fullscreenKey: function (event, player) {
			// override fullscreen to trigger when pressing the F key or Ctrl+Enter
			return ((event.which === 70) || (event.ctrlKey && event.which === 13));
		    }
		})
	    },
	    getOne() {

		let _this = this;
		_this.loading = true;


		axios.post(this.$store.state.baseServerUrl + 'v1/course/getOne', {
		    courseId: _this.$route.params.courseId
		}, {
		    headers: {
			'Token': this.$store.state.tokenRow || ""
		    }
		}).then(response => {

		    _this.row = response.data.value.row;
		    _this.pageTitle = _this.row.title;

		    _this.playerOptions.poster = response.data.value.row.cover;
		    _this.loading = false;

		}).catch((error) => {

		    _this.loading = false;

		});


	    }
	},
	components: {
	    Info,
	    Control,
	    PlayList,
	    Login,
	    payFactor
	},
	mounted() {
	    this.getOne();
	}
    }
</script>
<style scoped>
    .BuyFixed {
	position: fixed;
	z-index: 5;
	cursor: pointer;
	width: 100%;
	bottom: 0;
	left: 0;
	height: 50px;
	background: rgb(0, 78, 255);
	background: linear-gradient(0deg, rgba(0, 78, 255, 1) 0%, rgba(67, 125, 255, 1) 100%);
	text-align: center;
	color: #fff;
	font-size: 16px;
	line-height: 3;
    }

    b.title {
	display: block;
	margin: 20px 0;
	font-size: 18px;
    }
</style>
