<template>
    <div class="loginBox">

	<div class="iconTop">
	    <a-icon v-if="step==1" type="idcard" />
	    <a-icon v-if="step==2" type="lock" />
	    <span></span>
	</div>

	<p v-if="step==1">برای ورود  لطفا شماره موبایل خود را وارد کنید</p>
	<p v-if="step==2">کد فعال سازی ۵ رقمی پیامک شده بر روی گوشی موبایل خود را وارد کنید</p>

	<div v-if="step==1" class="fild">
	    <a-input v-model="mobile" placeholder="شماره موبایل">
	      <a-icon slot="prefix" type="phone" />
	    </a-input>
	</div>


	<div  v-if="notRegistered && step==2" class="fild">
	    <a-input v-model="namefull" placeholder="نام و نام خانوادگی">
	      <a-icon slot="prefix" type="user" />
	    </a-input>
	</div>

	<div v-if="step==2" class="fild">
	    <a-input v-model="otp" placeholder="کد فعال سازی ۵ رقمی پیامک شده را وارد کنید" ref="userNameInput">
	      <a-icon slot="prefix" type="lock" />
	    </a-input>
	</div>

	<div class="fild">
	    <div class="btnLogin">

		<span v-if="loading"><a-icon style="font-size: 17px; line-height: 1" type="loading" /></span>

		<span v-if="step==1 && !loading" v-on:click="changeStep(2)">ورود به سامانه</span>
		<span v-if="step==2 && !loading" v-on:click="changeStep(3)">فعال سازی و ورود</span>
	    </div>
	</div>

	<div v-if="step==2" class="fild">
	    <span v-on:click="changeStep(1)" class="notMobMe">شماره موبایل ({{mobile}}) را اشتباه وارد کردم</span>
	</div>

    </div>
</template>


<script>

import axios from 'axios';

export default {
    name: 'login',
    data(){
	return{
	    loading:false,
	    mobile:"",
	    namefull:"",
	    otp:"",
	    step:1,
	    notRegistered:true,
	}
    },
    methods:{
	changeStep(stepNum) {
	    if (stepNum == 1){

		this.mobile = "";
		this.otp = "";
		this.step = 1;
		this.notRegistered = false;

	    } else if (stepNum == 2 && this.step==1){

	        if (this.mobile.length!=11) {
		    this.$notification.error({
			message: 'خطا',
			description:
			    'شماره موبایل را به صورت صحیح و در ۱۱ رقم وارد کنید',
		    });

		}else{
		    this.loginWs();
		}

	    }else if (stepNum == 3 && this.step==2){

		if (this.otp.length==0) {

		    this.$notification.error({
			message: 'خطا',
			description:
			    'کد فعال سازی را لطفا وارد کنید',
		    });

		}else{
		    this.otpWs();
		}
	    }
	},
	loginWs(){

	    let _this = this;

	    _this.loading = true;

	    axios({
		method: 'post',
		url: this.$store.state.baseServerUrl+'v1/users/login',
		data: {
		    mobile: _this.mobile,
		    ref: _this.$route.query.ref || ''
		},
	    }).then(function (response) {

		_this.step = 2;
		_this.$message.info(response.data.message);
		_this.notRegistered = response.data.value.state;
		_this.loading = false;

	    }).catch((error) => {

		_this.$notification.error({
		    message: 'خطا',
		    description:error.response.data.message
		});
		_this.loading = false;

	    });
	},
	otpWs(){

	    let _this = this;
	    _this.loading = true;

	    axios({
		method: 'post',
		url: this.$store.state.baseServerUrl+'v1/users/otp',
		data: {
		    namefull:_this.namefull,
		    mobile: _this.mobile,
		    code: _this.otp,
		},
	    }).then(function (response) {

		_this.$message.info(response.data.message);
		_this.$store.commit("auth_success",response.data.value.token)
		_this.loading = false;
		_this.otp = "";
		_this.namefull = "";

	    }).catch((error) => {

		_this.otp = "";
		_this.$notification.error({
		    message: 'خطا',
		    description:error.response.data.message
		});
		_this.loading = false;

	    });
	}
    },
    mounted() {

	this.mobile = "";
	this.namefull = "";
	this.otp = "";
	this.step = 1;
	this.notRegistered = false;

    }
}
</script>
<style scoped>
    .iconTop{
	color: #222;
	font-size: 80px;
	line-height: 1;
	margin-bottom: 20px;
    }
    .loginBox p{
	color: #000;
    }
    .loginBox{
	text-align: center;
	margin: 0 auto;
	max-width: 400px;
	min-height: 100px;
	padding: 10px;
    }
    .loginBox p{
	width: 100%;
	text-align: center;
	margin-bottom: 20px;
	display: block;
    }
    .loginBox label{
	display: block;
    }
    .fild{
	margin: 5px 10px;
    }
    .fild input{
	text-align: center;
    }
    .btnLogin{
	background: rgb(0,78,255);
	background: linear-gradient(0deg, rgba(0,78,255,1) 0%, rgba(67,125,255,1) 100%);
	box-shadow: 2px 2px 2px 0 rgba(0,78,255,0.2);
	color: #fff;
	margin-top: 10px;
	font-size: 14px;
	cursor: pointer;
	border-radius: 2px;
    }
    .btnLogin span{
	padding: 13px 0;
	display: block;
	cursor: pointer;
	text-align: center;
    }
    .notMobMe{
	color: #333;
	text-decoration: underline;
	font-size: 12px;
	margin-top: 20px;
	display: block;
	text-align: center;
    }
</style>
