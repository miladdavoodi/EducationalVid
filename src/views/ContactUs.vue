<template>
  <div class="home">

    <ContentBox>
	<div class="container">
	    <div class="row">
		<div class="col-12">

		    <div style="height: 40px"></div>
		    <h1>تماس با ما</h1>
		    <p>..</p>

		</div>
	    </div>
	</div>
    </ContentBox>

  </div>
</template>

<script>

import ContentBox from '../components/Home/Content'

export default {
    name: 'Home',
    data(){
      return{
          mobile:"09196513098",
          otp:"123456",
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

	    } else if (stepNum == 2 && this.step==1 && this.mobile.length!=11){

		this.$notification.error({
		    message: 'خطا',
		    description:
			'شماره موبایل را به صورت صحیح و در ۱۱ رقم وارد کنید',
		});

	    }else{
	        this.step = 2;
	    }
	}
    },
    components: {
	ContentBox,
    }
}
</script>
<style scoped>
    .loginBox p{
	color: #000;
    }
    .loginBox{
	text-align: center;
	margin: 80px auto 0;
	max-width: 400px;
	min-height: 100px;
	padding: 10px;
	border: 1px solid #eee;
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
	background: #185fff;
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
