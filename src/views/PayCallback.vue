<template>
  <div class="home">

    <ContentBox>
	<div class="container">
	    <div class="row">
		<div class="col-12">

		    <div style="height: 40px"></div>

		    <div v-if="status==1" class="verify center">

			<div><a-spin size="large" /></div>
			<p>لطفا کمی صبر کنید
			    <br>
			    درحال بررسی پرداخت انجام شده هستیم ...</p>
			<a-progress :percent="progress" status="active" />

		    </div>

		    <div class="error" v-if="status==0"><p>خطا - عملیات پرداخت انجام نشد . در صورتی که پولی از حساب شما کسر شده باشد حداکثر تا ۷۲ ساعت آینده بازگشت خواهد خورد</p></div>

		</div>
	    </div>
	</div>
    </ContentBox>

  </div>
</template>

<script>

import axios from 'axios';
import ContentBox from '../components/Home/Content'

export default {
    name: 'Home',
    data(){
      return{
	  status:-1,
	  progress:0,
      }
    },
    components: {
	ContentBox,
    },
    mounted() {


        console.log(this.$route.query.status);
        console.log(this.$route.query.token);

        if (this.$route.query.status==0){
            this.status = this.$route.query.status;
	} else{

	    this.status = 1;

	    let _this = this;
	    let intvarTimer = setInterval(function () {
		_this.progress = (_this.progress + Math.floor(Math.random() * 6));
		if (_this.progress>=100){
		    clearInterval(intvarTimer);
		}
	    },1000);

	    axios.post(this.$store.state.baseServerUrl+'v1/payment/verify', {
		payToken: _this.$route.query.token
	    }, {
		headers: {
		    'Token': this.$store.state.tokenRow
		}
	    }).then(resp => {

	        if (resp.data.value.state==true){
		    _this.$message.info("پرداخت شما با موفقیت تایید شد .");
		    clearInterval(intvarTimer);
		    _this.progress = 100;
		    _this.$router.push('/panel');
		} else{
		    this.status = 0;
		}

		console.log(resp.data);

	    }).catch((error) => {

		_this.$notification.error({
		    message: 'خطا',
		    description:error.response.data.message
		});


	    });

	}

	this.$scrollTo('#top', 400);
    }
}
</script>
<style scoped>
    .error{
	border: 1px solid #fe4e5e;
	padding: 10px;
	color: #fe4e5e;
    }
    .error p{
	margin: 0;
	padding: 0;
    }
    .verify{
	padding: 20px 10px 10px 0;
    }
    .verify p{
	text-align: center;
    }
</style>
