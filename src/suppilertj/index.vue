<template>
  <div class="box1">
    <div>
      <suppjinghuo></suppjinghuo>
    </div>
    <div>
      <SupGoodsSV></SupGoodsSV>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import suppjinghuo from "./suppjinghuo.vue";
import SupGoodsSV from "./supplierSalesVolume";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    suppjinghuo,
    SupGoodsSV
  }
};
</script>
<style>
.box1 {
  display: flex;
}
</style>
