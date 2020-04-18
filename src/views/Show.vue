<template>
  <div class="home">

    <ContentBox>
        <Show/>
    </ContentBox>

  </div>
</template>

<script>

import ContentBox from '../components/Home/Content'
import Show from '../components/Home/show/index'

export default {
    name: 'Home',
    components: {
      ContentBox,
        Show
    },
    mounted() {
        this.$scrollTo('#top', 400);
    }
}
</script>
