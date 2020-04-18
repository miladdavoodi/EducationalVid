<template>

    <div>
        <Header/>
            <div style="min-height: calc(100vh - 170px)">
                <slot/>
            </div>
        <Footer/>
    </div>

</template>

<script>
    import Header from './Header';
    import Footer from './Footer';

    export default {
        components:{
	    Header,
            Footer
	}
    }
</script>
