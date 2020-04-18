<template>
    <div>



        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h3>آخرین بسته های آموزشی</h3>

                    <div v-if="loading" class="center">
                        <div style="height: 30px"></div>
                        <div class="container-fluid">
                            <div class="row">
                                <div v-for="n in 12" class="col-md-3">
                                    <a-skeleton active />
                                    <div style="height: 30px"></div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="col-lg-3 col-md-4 col-sm-6" v-for="rw in list">
                    <div class="videoBox">
                        <div v-on:click="showCourse(rw._id)" v-bind:style="{'background':'url('+rw.cover+')'}" class="imageCover"></div>
                        <router-link v-bind:to="'/course/'+rw._id+'/1'"><h2>{{rw.title}}</h2></router-link>
                        <p>{{rw.text}}</p>
                        <div class="nvbar">
                            <del>{{rw.price}} تومان</del>
                            <span>{{rw.discountedPrices}} تومان</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

    import axios from 'axios';
    export default {
        data(){
          return{
              loading:false,
              list:[]
          }
        },
        methods: {
            showCourse(id){
                this.$router.push({ path: '/course/'+id+'/1' });
            },
            getlist(){

                let _this = this;
                _this.loading = true;

                axios({
                    method: 'post',
                    url: this.$store.state.baseServerUrl+'v1/course/getlist',
                    data: {},
                }).then(function (response) {

                    _this.list = response.data.value.list;
                    _this.loading = false;

                }).catch((error) => {

                    _this.loading = false;

                });
            }
        },
        mounted() {
            this.getlist();
        }
    }
</script>
<style scoped>
    div.videoBox{
        background: #fff;
        border: 1px solid #ddd;
        min-height: 200px;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.04);
    }
    h3{
        color: #999;
        display: block;
        margin: 20px 0 10px 0;
    }
    div.videoBox div.imageCover{
        cursor: pointer;
        height: 160px;
        background-size: cover !important;
        background-position: center !important;
    }
    div.videoBox a{
        color: #333;
    }
    div.videoBox a h2{
        font-size: 18px;
        display: block;
        padding: 8px;
    }
    div.videoBox p{
        font-size: 14px;
        padding: 0 10px 10px 10px;
        color: #888;
    }
    div.nvbar{
        height: 40px;
        border-top: 1px solid #eee;
    }
    div.nvbar *{
        display: inline-block;
        width: 50%;
        height: 39px;
        text-align: center;
        line-height: 2.4;
        cursor: default;
    }
    div.nvbar del{
        color: red;
        position: relative;
        background: #fdf3f3;
    }
    div.nvbar del:before{
        content: "";
        position: absolute;
        top: 15px;
        width: 80%;
        transform: rotate(-4deg);
        opacity: 0.4;
        height: 2px;
        left: 10px;
        background: red;
    }
    div.nvbar span{
        background: #f3fdf3;
        font-weight: bold;
        color: #1c7430;
    }
</style>
