<template>
  <div class="home">

    <ContentBox>
	<div class="container">
	    <div class="row">
		<div class="col-12">

		    <div style="height: 50px"></div>

		    <div v-if="loading" class="center"><a-spin size="large" /></div>

		    <Login v-if="$store.state.tokenRow.length<=2"/>

		    <div v-if="!loading && $store.state.tokenRow.length>=3 && mylist.user">

			<div v-if="mylist.user" class="UserInfo">
			    <span>خوش آمدید ({{mylist.user.namefull}})</span>
			    <span class="logout" v-on:click="logout">خروج از پروفایل</span>
			</div>

			<div style="height: 10px"></div>

			<a-alert
				v-if="mylist.value.list.length==0"
				message="سبد خرید"
				description="هیچ پکیجی در لیست ( دوره های شما ) وجود ندارد . برای خرید اولین پکیج از طریق فروشگاه اقدام کنید"
				type="warning"
			/>

			<table v-if="mylist.value.list.length!=0" class="table table-bordered">
			    <tr>
				<th>#</th>
				<th>عنوان پکیج</th>
				<th>تاریخ خرید</th>
				<th>مبلغ پرداختی</th>
				<th>نمایش</th>
			    </tr>
			    <tr v-for="(rw,index) in mylist.value.list">
				<td>{{index+1}}</td>
				<td>{{rw.title}}</td>
				<td>{{rw.createdAt}}</td>
				<td>{{rw.price}} <small>تومان</small></td>
				<td class="center">
				    <router-link v-bind:to="'/course/'+rw.courseId+'/1'">
				    	<a-icon style="font-size: 24px" type="youtube" />
				    </router-link>
				</td>
			    </tr>
			</table>

			<div v-if="loading"><a-spin size="large" /></div>


		    </div>

		</div>
	    </div>
	</div>
    </ContentBox>

  </div>
</template>

<script>

import ContentBox from '../components/Home/Content'
import Login from '../components/Home/User/login'
import axios from 'axios';

export default {
    name: 'Home',
    metaInfo: {
	title: 'لیست پکیج ها خریداری شده من',
    },
    data(){
      return{
	  loading:false,
          mylist:[],
      }
    },
    watch:{
      '$store.state.tokenRow':function () {
	  if (this.$store.state.tokenRow.length>=3){
	      this.getMylist();
	  }
      }
    },
    methods:{
        logout(){
	    this.$store.commit("logout")
	},
	getMylist(){

	    let _this = this;
	    _this.loading = true;

	    axios.post(this.$store.state.baseServerUrl+'v1/course/mylist', {}, {
		headers: {
		    'Token': this.$store.state.tokenRow
		}
	    }).then(resp => {

	        _this.mylist = resp.data;
		_this.loading = false;

	    }).catch((error) => {

		_this.$notification.error({
		    message: 'خطا',
		    description:error.response.data.message
		});

		_this.logout();

		_this.loading = false;

	    });
	}
    },
    mounted(){

        if (this.$store.state.tokenRow.length>=3){
	    this.getMylist();
	}

	this.$scrollTo('#top', 400);


    },
    components: {
	ContentBox,
	Login
    }
}
</script>
<style>
    .UserInfo{
	padding: 10px;
    }
    .UserInfo span:first-child{
	font-weight: bold;
	font-size: 18px;
    }
    .logout{
	cursor: pointer;
	margin-top: 5px;
	display: block;
	font-size: 13px;
	color: red;
    }
    .youtube{
	cursor: pointer;
    }
</style>
