<template>
    <div>
        <div id="top" class="header">

            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <ul class="menu">
                            <li v-bind:class="{active:(this.$route.name=='Home')}"><router-link to="/">فروشگاه</router-link></li>
                            <li v-bind:class="{active:(this.$route.name=='panel')}"><router-link to="/panel">دوره‌های‌ من</router-link></li>
                            <li v-if="1==2" v-bind:class="{active:(this.$route.name=='ContactUs')}"><router-link to="/ContactUs"> تماس با ما</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <div v-if="this.$route.name=='Home'" class="slider">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-8 col-12">
                        <div class="fix">
                            <h1>به دنیای ' از ۰ تا ۱۰۰ ' خوش آمدید</h1>
                            <p>ما در عصری زندگی میکنیم که ارتباطات باعث تغییر درشیوه زندگی کردن افراد جامعه شده است . یکی از مهمترین این تغییرات در سبک آموزش است .
آموزش های مجازی باتوجه به صرف هزینه کمتر و قابل دسترس بودن در هرزمان و مکان، جایگزین آموزش به روشهای پیشین است.با توجه به
نیاز همگان به آموزش های کاربردی و وتکیه به دانش روز این مجموعه در تلاشیم که گلچین از بهترین مباحث و دوره های آموزشی را به صورت آنلاین در اختیار شما کاربر گرامی قراردهیم .
 مهمترین هدف ما ارائه آموزش های جامع و بروز باتوجه به نیاز شما ست .</p>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-4 col-12"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log(this.$route.name);
        }
    }
</script>
<style scoped>

    ul.menu li.active{
        box-shadow: 0 -3px inset #e0a800;
        background: rgb(224,168,0);
        background: linear-gradient(0deg, rgba(224,168,0,0.1570961148131127) 0%, rgba(34,34,34,0) 100%);
    }
    ul.menu li.active a{
        color: #e0a800;
    }
    ul.menu li{
        float: right;
    }
    ul.menu li a{
        display: block;
        color: #fff;
        padding: 18.5px 20px;
        font-size: 14px;
    }
    ul.menu li:not(:last-child){
        border-left: 1px solid rgba(0,0,0,0.2);
    }
    div.header{
	background: #222;
	min-height: 59px;
    }
    div.slider{
        background: url("../../assets/images/w.jpg");
        background-size: cover;
        background-position: center;
	min-height: 360px;
        color: #fff;
    }
    div.slider div.fix{
        padding: 50px 10px;
    }
    div.slider div.fix h1{
        display: block;
        margin-bottom: 20px;
        color: #fff;
    }
    div.slider div.fix p{
        text-align: justify;
    }
</style>
