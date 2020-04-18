<template>
    <div class="whiteBack">

	<div class="container-fluid">
	    <div v-for="rw in listItem" v-if="(playId==rw._id)" class="row">

		<div v-bind:class="{disable:!(listIdPay[rw._id]>0 &&  listIdPay[rw._id] < listItem.length)}"
		     class="col-3 col-lg-2">
		    <div v-on:click="playVid(rw._id,'next')" class="btnC">
			<a-icon type="caret-right" />
			<span>بعدی</span>
		    </div>
		</div>


		<div class="col-6 col-lg-8">
		    <h2>
			<a-spin v-if="1==2" size="large" />
			<span> {{rw.title}} </span>


			<div v-on:click="$parent.showModal" v-if="!rw.isFree && !unlock" class="small">
			    <a-icon type="lock" />
			    <span>برای مشاهده می‌بایست پکیج را خریداری کنید</span>
			</div>

		    </h2>
		</div>

		<div v-bind:class="{disable:!(listIdPay[rw._id]>=2)}"
			class="col-3 col-lg-2">
		    <div v-on:click="playVid(rw._id,'back')" class="btnC">
			<a-icon type="caret-left" />
			<span>قبلی</span>
		    </div>
		</div>


	    </div>
	</div>

    </div>
</template>
<script>
    export default {
        props:['playId','videolist','unlock'],
	data(){
          return{
	      numToId:{},
	      listIdPay:{},
	      listItem:[]
	  }
	},
	methods:{

	    playVid:function (id,state) {

	        if (state=="next"){

	            if(this.listIdPay[id] < this.listItem.length){
			this.$router.push('/course/'+this.$route.params.courseId+'/'+this.numToId[this.listIdPay[id]+1]);
		    }

		} else if (state=="back"){

		    if(this.listIdPay[id]-1 !=0){
			this.$router.push('/course/'+this.$route.params.courseId+'/'+this.numToId[this.listIdPay[id]-1]);
		    }

		}

	    },

            getPlayList(){

                let _this = this;
                let listId = {};
                let _numToId = {};
                let list = [];
                let num = 1;
		for (let [key, value] of Object.entries(this.videolist)) {
		    value.forEach((item) => {
			for (let [key2, value2] of Object.entries(item)) {

			    if (this.playId == num){
			        _this.$parent.playerOptions.sources[0].src = value2.link;
			    }

			    list.push(value2);
			    listId[value2._id] = num;
			    _numToId[num] = value2._id;
			    num++;
			}
		    });
		}

		this.listIdPay = listId;
		this.listItem = list;
		this.numToId = _numToId;

	    }
	},
	watch:{
	    playId:function () {
		this.getPlayList();
	    },
	},
	mounted() {


	    this.getPlayList();
	}
    }
</script>

<style scoped>
    .small{
	font-size: 13px;
	color: #e0a800;
	cursor: pointer;
    }
    .btnC{
	background: rgb(186,206,218);
	background: linear-gradient(0deg, rgba(186,206,218,1) 0%, rgba(227,239,247,1) 100%);
	color: #338ac7;
	padding: 4px 0 10px 0;
	cursor: pointer;
	text-align: center;
	font-size: 22px;
	border-radius: 2px;
    }
    .btnC:hover{
	background: #c6dbe9;
    }
    .btnC span{
	display: block;
	text-align: center;
	font-size: 13px;
    }
    .disable .btnC{
	background: #eee;
	color: #999;
    }
    .whiteBack{
	background: #fff;
	border-radius: 4px ;
	margin-bottom: 20px;
	padding: 10px;
	border: 1px solid #338ac7;
	box-shadow: 0 0 0 3px #e3eff7 inset;
	font-size: 14px;
    }
    .whiteBack h2{
	text-align: center;
	display: block;
	margin-top: 14px;
	font-size: 18px;
    }
</style>
