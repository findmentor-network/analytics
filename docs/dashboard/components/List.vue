<template>
  <div class="wrapper">
    <div v-if="headers.length" class="header">
      <p>{{ headers[0] }}</p>
      <p>{{ headers[1] }}</p>
    </div>
    <div v-if="list.length && list.length > 0" class="content-list-wrapper">
      <ul class="content-list">
        <li v-for="item in list" :key="item._id">
          {{ item._id || origin }} {{ item.count }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['origin', 'span', 'range', 'headers'],
  data() {
    return {
      list: [],
    }
  },

  async mounted() {
    this.list = await fetch(
      `https://dashboard.analytx.dev/referrers/${this.origin}?span=${this.span}&range=${this.range}`
    ).then((res) => res.json())
  },
}
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
}
</style>
