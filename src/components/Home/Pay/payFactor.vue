<template>
    <div>

        <h1>{{rowData.title}}</h1>

            <table class="table">
                <tr>
                    <td width="40%">قیمت پکیج</td>
                    <td><span class="del">{{rowData.price}} تومان</span></td>
                    <td><span class="price">{{rowData.discountedPrices}}</span></td>
                </tr>
                <tr>
                    <td> ویدئو ها</td>
                    <td>{{rowData.videoCount}} ویدئو</td>
                    <td>{{rowData.CourseTime}}</td>
                </tr>
            </table>

            <p>بعد از پرداخت آنلاین کلیه ویدئو های این مجموعه بر روی شماره موبایل شما باز میشود و میتوانید آن را در هر زمان و مکانی ببینید </p>
            <div v-bind:class="{gotoPay:loading}" class="btnPay">
                <span v-if="loading">
                    <a-spin size="large" />
                    <div class="center">درحال انتقال به صفحه پرداخت ...</div>
                </span>
                <span  v-on:click="gotoPay(rowData._id)" v-if="!loading">پرداخت آنلاین و خرید پکیج</span>
            </div>

    </div>
</template>
<script>


    import axios from 'axios';

    export default {
        props:['rowData'],
        data(){
          return{
              loading:false
          }
        },
        methods:{
            gotoPay:function (_id) {

                let _this = this;
                _this.loading = true;


                axios.post(this.$store.state.baseServerUrl+'v1/payment/createLink', {
                    courseId: _id
                }, {
                    headers: {
                        'Token': this.$store.state.tokenRow
                    }
                }).then(resp => {

                    window.location = resp.data.value.url;

                }).catch((error) => {


                    if (error.response.data.authorization==false){
                        _this.$store.commit("logout")
                    }

                    _this.$notification.error({
                        message: 'خطا',
                        description:error.response.data.message
                    });

                    _this.loading = false;

                });


            }
        },
        mounted() {
            console.log('okokokok..')
        }
    }
</script>
<style scoped>
    .table{
        direction: rtl;
    }
    .table .del{
        color: red;
        position: relative;
        display: inline-block;
        font-size: 16px;
    }
    .table .del:before{
        content: "";
        width: 100%;
        top: 10px;
        opacity: 0.4;
        background: red;
        height: 2px;
        position: absolute;
        left: 0;
        z-index: 4;
    }
    .table .price{
        color: green;
        font-size: 16px;
    }
    h1{
        font-size: 17px;
        text-align: center;
    }
    .btnPay{
        background: #159b28;
        box-shadow: 2px 2px 2px 0 rgba(56,220,79,0.2);
        color: #fff;
        margin-top: 10px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 4px ;
    }
    .btnPay span{
        display: block;
        padding: 13px 0;
        text-align: center;
    }
    .btnPay.gotoPay{
        background: #eee;
        color: #000;
        box-shadow: none;
    }
</style>
