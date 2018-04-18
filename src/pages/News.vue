<style></style>
<template>
  <section class="news_page">
    this is news111
    <UE :config=config ref="ue"></UE>
    <button @click="add">获取内容</button>
  </section>
</template>
<script>
  import UE from '../components/ue'
  export default {
    name: 'news_page',
    data() {
        return {
          config: {
            initialFrameWidth: null,
            initialFrameHeight: 350
          }
        }
    },
    methods: {
      add() {
        let content = this.$refs.ue.getUEContent();
        console.log(content)
      }
    },
    components: {
      UE
    }
  }
</script>
