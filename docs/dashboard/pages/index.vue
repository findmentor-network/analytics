<template>
  <div class="container">
    <TimeChart origin="hangiasigrubundayim.com" span="30" range="3" />
    <List
      origin="hangiasigrubundayim.com"
      span="30"
      range="3"
      :headers="['Referrers', 'Views']"
    />
  </div>
</template>

<script>
export default {

}
</script>
