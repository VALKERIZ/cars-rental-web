<template>
  <div class="user-container">
    <Back />
    <div class="amount-list">
      <div
        class="item"
        v-for="item in data"
        :key="item.id"
        @click="checkAmount(item)"
      >
        <div
          class="a-wrap"
          :class="{ current: amount_id == item.id }"
          :id="item.id"
        >
          {{ item.amount }}
        </div>
      </div>
    </div>
    <div class="cars-form-ui">
      <el-form ref="form" @submit.native.prevent>
        <el-form-item>
          <el-input-number
            v-model.number="amount_number"
            placeholder="请输入充值金额"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>
      </el-form>
    </div>
    <div class="blank-40"></div>
    <section class="section-mode">
      <header>
        <h4 class="title">支付类型</h4>
      </header>
      <div class="content">
        <ul class="links" @click="modeClick">
          <li>
            <span class="pull-left">微信</span>
            <i
              class="icon check-round "
              :class="{ current: current_mode == '微信' }"
            ></i>
          </li>
          <li>
            <span class="pull-left">支付宝</span>
            <i
              class="icon check-round"
              :class="{ current: current_mode == '支付宝' }"
            ></i>
          </li>
        </ul>
      </div>
    </section>
    <div class="blank-100"></div>
    <el-button
      type="primary"
      class="button-block"
      :disabled="disabled_button"
      round
      @click="confirmSubmit"
      >确认充值</el-button
    >
  </div>
</template>
<script>
import { AmountList, Pay } from "@/api/pay";
export default {
  name: "Recharge",
  components: {},
  data() {
    return {
      data: [],
      amount_id: "",
      amount: "", //点击选择的金额
      amount_number: "", //输入框的金额
      pay_type: this.$route.query.type,
      current_mode: "微信",
      disabled_button: true,
    };
  },
  beforeMount() {
    this.getAmountList();
  },
  methods: {
    // 充值方式选择
    modeClick(e) {
      const mode = e.target.innerText;
      this.current_mode = mode;
    },
    /** 获取充值列表 */
    getAmountList() {
      AmountList().then((response) => {
        this.data = response.data;
      });
    },
    /** 点击选择金额 */
    checkAmount(data) {
      this.amount_id = data.id;
      this.amount = data.amount;
      this.amount_number = data.amount;
      this.disabled_button = false;
    },
    /** 确认充值 */
    confirmSubmit() {
      /**
       * 存在输入金额时，取输入金额;否则取选择金额
       */
      let amount = this.amount_number || this.amount;
      Pay({ amount: amount, type: this.pay_type }).then((response) => {
        const order_no = response.data.order_no;
        // 跳转到支付软件的支付页面
        const payUrl = response.data.pay_url;
        // if(payUrl) {
        //     window.location.href = payUrl;
        //     return false;
        // }
        //
        localStorage.setItem("order_no", order_no);
        // 跳转
        this.$router.push({
          path: "/payStatus",
        });
      });
    },
    inputEnter() {
      // 清除选中
      const reg = /^[0-9]*$/;
      const status = reg.test(this.amount_number);
      this.disabled_button = !status;
    },

    // 开发支付功能，支付成功后需要有一个回调地址，返回项目
    // 进行支付的过程，已经离开了项目本身，处于在微信端。支付完成或者放弃支付的时候，都会回调一个地址
  },
};
</script>
<style lang="scss">
@import "./recharge.scss";
</style>
