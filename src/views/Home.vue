<template>
  <div class="home">

    <ContentBox>
        <LastVideo/>
    </ContentBox>

  </div>
</template>

<script>

import ContentBox from '../components/Home/Content'
import LastVideo from '../components/Home/LastVideo/index'

export default {
    name: 'Home',
    metaInfo: {
        title: 'وب سایت آموزشی از ۰ تا ۱۰۰',
    },
    components: {
      ContentBox,
      LastVideo
    },
    mounted() {
        this.$scrollTo('#top', 400);
    }
}
</script>
