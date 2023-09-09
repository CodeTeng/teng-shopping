<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)"/>

    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item v-for="(image,index) in images" :key="index">
        <img v-lazy="image.external_url"/>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/ {{ images.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ detail.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售{{ detail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ detail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed"/>七天无理由退货</span>
          <span><van-icon name="passed"/>48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow"/>
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment" v-if="total > 0">
      <div class="comment-title">
        <div class="left">商品评价 ({{ total }}条)</div>
        <div class="right">查看更多
          <van-icon name="arrow"/>
        </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="comment in commentList" :key="comment.comment_id">
          <div class="top">
            <img :src="comment.user.avatar_url || defaultImg" alt="">
            <div class="name">{{ comment.user.nick_name }}</div>
            <van-rate :size="16" :value="comment.score / 2" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ comment.content }}
          </div>
          <div class="time">
            {{ comment.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="tips">商品描述</div>
    <div class="desc" v-html="detail.content"></div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home">
        <van-icon name="wap-home-o"/>
        <span>首页</span>
      </div>
      <div class="icon-cart">
        <van-icon name="shopping-cart-o"/>
        <span>购物车</span>
      </div>
      <div class="btn-add">加入购物车</div>
      <div class="btn-buy">立刻购买</div>
    </div>
  </div>
</template>

<script>
import {getProductCommentList, getProductDetail} from "@/api/product";
import defaultImg from '@/assets/default-avatar.png'

export default {
  name: "ProductDetail",
  data() {
    return {
      images: [],
      current: 0,
      detail: {},
      total: 0,
      commentList: [],
      defaultImg
    };
  },
  computed: {
    goodsId() {
      return this.$route.params.id
    }
  },
  created() {
    this.getProductDetail()
    this.getProductCommentList()
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    async getProductDetail() {
      const {data: {detail}} = await getProductDetail(this.goodsId)
      this.detail = detail
      this.images = detail.goods_images
    },
    async getProductCommentList() {
      const {data: {list, total}} = await getProductCommentList(this.goodsId, 3)
      this.total = total
      this.commentList = list
    }
  },
}
</script>

<style scoped lang="less">
.prodetail {
  padding-top: 46px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  img {
    display: block;
    width: 100%;
  }

  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }

  .desc {
    width: 100%;
    overflow: scroll;

    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }

  .info {
    padding: 10px;
  }

  .title {
    display: flex;
    justify-content: space-between;

    .now {
      color: #fa2209;
      font-size: 20px;
    }

    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }

    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }

  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }

  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;

    .left-words {
      span {
        margin-right: 10px;
      }

      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }

  .comment-title {
    display: flex;
    justify-content: space-between;

    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;

    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;

      img {
        width: 20px;
        height: 20px;
      }

      .name {
        margin: 0 10px;
      }
    }

    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      .van-icon {
        font-size: 24px;
      }
    }

    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }

    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}
</style>
