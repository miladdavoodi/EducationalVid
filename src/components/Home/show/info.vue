<template>
    <div>


    <div class="whiteBack">


	<div class="container-fluid">
	    <div class="row">
		<div class="col-2"><a-icon type="video-camera" /></div>
		<div class="col-5"><span>تعداد ویدئو ها</span></div>
		<div class="col-5"><span class="total">{{dataRow.videoCount}}</span></div>
	    </div>
	    <div class="row">
		<div class="col-2"><a-icon type="clock-circle" /></div>
		<div class="col-5"><span>زمان آموزش</span></div>
		<div class="col-5"><span class="total">{{dataRow.CourseTime}}</span></div>
	    </div>
	    <div v-if="dataRow.unlock==false" class="row">
		<div class="col-2"><a-icon type="shop" /></div>
		<div class="col-5"><span>قیمت</span></div>
		<div class="col-5">
		    <div><del>{{dataRow.price}}</del></div>
		    <div style="clear: both"></div>
		    <div><span class="price">{{dataRow.discountedPrices}} <small>تومان</small></span></div>
		</div>
	    </div>
	</div>

	<div v-if="dataRow.unlock==false" v-on:click="$parent.showModal" class="btnStart">
	    <span>شروع یادگیری</span>
	</div>

    </div>


    </div>
</template>
<script>
    export default {
        props:['dataRow']
    }
</script>


<style scoped>
    del{
	margin: 0;
	float: left;
	font-size: 20px;
	color: #999;
    }
    .whiteBack{
	background: #fff;
	border-radius: 4px 4px 20px 20px;
	padding: 10px;
	border: 1px solid #eee;
	font-size: 14px;
	box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.04);
    }
    .whiteBack i{
	font-size: 18px;
    }
    .whiteBack .total{
	float: left;
	margin: 10px 0;
	background: #e0f4e4;
	color: #4aa35c;
	display: block;
	padding: 1px 10px;
	border-radius: 2px 2px 10px 2px;
    }
    .whiteBack .price {
	float: left;
	margin:  0 0 10px 0;
	color: #ff1823;
	display: block;
	font-size: 20px;
	position: relative;
	border-radius: 2px 2px 10px 2px;
    }
    .whiteBack .price small{
	color: #999;
	font-size: 11px;
	display: block;
	bottom: -10px;
	position: absolute;
    }
    .whiteBack .btnStart{
	background: rgb(0,78,255);
	background: linear-gradient(0deg, rgba(0,78,255,1) 0%, rgba(67,125,255,1) 100%);
	box-shadow: 2px 2px 2px 0 rgba(0,78,255,0.2);
	text-align: center;
	color: #fff;
	padding: 13px 0;
	margin-top: 10px;
	font-size: 14px;
	cursor: pointer;
	border-radius: 4px 4px 20px 20px;
	font-weight: bold;
    }
</style>
