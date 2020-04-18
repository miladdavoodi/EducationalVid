<template>
     <div class="whiteBack2">
	<ul>
	    <li v-for="(rw,title) in videolist">
		<div class="title">
		    <a-icon type="double-left" />
		    <span>{{title}}</span>
		    </div>
		<ul v-for="(item,index) in rw">
		    <li v-on:click="runVideo(videoItem._id)" v-bind:class="{active:videoItem._id==activeId}" v-for="(videoItem,index) in item">
			<a-icon type="video-camera" />
			<span>{{videoItem.title}}</span>
			<span v-if="videoItem.isFree" class="statePay">رایگان</span>
			<span v-if="!videoItem.isFree" class="statePay lock">

			    <a-icon v-on:click="$parent.showModal" v-if="!unlock" type="lock" />
			    <a-icon v-if="unlock" type="youtube" />

			</span>
		    </li>
		</ul>
	    </li>
	</ul>
    </div>
</template>

<script>
    export default {
        props:['videolist','unlock'],
	data(){
          return{
              activeId:0
	  }
	},
	watch:{
            '$route.params.playId':function (id) {
		this.activeId = id;
	    }
	},
	methods:{
	    runVideo(id){
		this.$router.push('/course/'+this.$route.params.courseId+'/'+id);
		this.activeId = id;
		this.$scrollTo('#top', 400)
	    }
	},
	mounted() {
	    this.activeId = this.$route.params.playId;
	}
    }
</script>

<style scoped>
    .whiteBack2{
	background: #fff;
	border-radius: 4px 4px 20px 20px;
	padding: 10px;
	border: 1px solid #eee;
	font-size: 14px;
	box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.04);
    }
    .whiteBack2{
	border-radius: 2px;
    }
    .whiteBack2 > ul > li > div.title{
	font-weight: bold;
	display: block;
	margin-top: 10px;
	color: #000;
	margin-bottom: 5px;
    }
    .whiteBack2 > ul > li > div.title > i{
	font-size: 11px;
	color: #999;
	display: inline-block;
	margin-left: 10px;
    }
    .whiteBack2 > ul > li > ul > li.active{
	color: #000;
	padding: 15px 10px;
	background: #e3eff7;
    }
    .whiteBack2 > ul > li > ul > li{
	border-bottom: 1px dashed #eee;
	padding: 5px 10px;
	cursor: pointer;
    }
    .whiteBack2 > ul > li > ul > li > i{
	background: #e2f6ef;
	padding: 5px;
	border-radius: 100px;
	color: #105f96;
    }
    .whiteBack2 > ul > li > ul > li:hover{
	background:#e2f6ef;
	border-color: #e2f6ef;
	cursor: pointer;
    }
    .statePay{
	float: left;
	font-size: 13px;
	background: #c5ffd0;
	color: #111;
	padding: 1px 5px;
	border-radius: 2px;
    }
    .statePay.lock {
	background: #fff;
	color: #000;
	font-size: 14px;
    }
</style>
