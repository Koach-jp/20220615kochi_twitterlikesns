<template>
  <div class="home">
    <h1 class="title">ホーム</h1>
    <div class="shares">
      <div v-for="share in shares" :key="share.id" class="share">
        <span class="name">{{share.name}}</span>
        <span @click="toggleLike(share.id)">
          <img src="/img/heart.png" class="heart"
            :class="(share.likes.some((arr)=>arr.uid===$store.state.uid))? 'liked': null">
        </span>
        <span class="like-count">{{share.likes.length}}</span>
        <span @click="deleteShare(share.id)" v-if="share.uid==$store.state.uid">
          <img src="/img/cross.png" class="cross">
        </span>
        <span>
          <NuxtLink :to="{ name:'comment', query:{share_id: share.id} }">
          <img src="/img/detail.png" class="detail">
          </NuxtLink>
        </span>
        <p>{{share.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',
  data() {
    return {
      shares: null,
    }
  },
  methods: {
    async getShares() {
      const gotData = await this.$axios.get('http://127.0.0.1:8000/api/share/');
      this.shares = gotData.data.data.reverse();
    },
    async deleteShare(id) {
      const boo = confirm('このシェアを削除しますか？');
      if (boo) {
        await this.$axios.delete('http://127.0.0.1:8000/api/share/'+id);
        this.getShares();
      }
    },
    async toggleLike(id) {
      const sendData = {
        share_id: id,
        uid: this.$store.state.uid
      };
      await this.$axios.post('http://127.0.0.1:8000/api/like/', sendData);
      this.getShares();
    },
  },
  created() {
    this.getShares();
    this.$nuxt.$on('getShares',()=>{this.getShares()})
  }
}
</script>

<style>
.title {
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: white 1px solid;
  border-left: white 1px solid;
  text-align: center;
}
.cross, .heart, .detail {
  width: 25px;
  height: 25px;
  cursor: pointer;
  vertical-align: text-top;
  transition: 0.4s;
}
.share {
  border-bottom: white 1px solid;
  border-left: white 1px solid;
  box-sizing: border-box;
  padding: 15px;
}
.name {
  font-weight: bold;
  margin-right: 20px;
}
.like-count {
  margin-right: 20px;
}
.share span:last-of-type {
  margin-left: 40px;
}
.liked{
  filter: invert(50%) sepia(100%) saturate(8000%) hue-rotate(0deg) brightness(100%) contrast(100%) drop-shadow(0 1px 3px rgb(255, 112, 112));
  transition: 0.4s;
}
</style>
