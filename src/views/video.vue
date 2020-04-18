<template>
  <div class="home">

    <vue-core-video-player
            title="salam test"
            cover="https://roocket.ir/img/mydeveloper.svg"
            src="http://localhost:8080/video.mp4"
    ></vue-core-video-player>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
