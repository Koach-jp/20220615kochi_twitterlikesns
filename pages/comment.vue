<template>
  <div class="comment">
    <h1 class="title">シェア詳細</h1>
    <div class="share" v-if="share">
        <span class="name">{{share.name}}</span>
        <span>{{$dayjs(share.created_at).format('YYYY年M月D日(ddd) H:mm:ss')}}</span>
        <p>{{share.content}}</p>
        <span @click="toggleLike(share.id)">
          <img src="/img/heart.png" class="heart"
            :class="(share.likes.some((arr)=>arr.uid===uid))? 'liked': null">
        </span>
        <span class="like-count">{{share.likes.length}}</span>
        <span @click="deleteShare(share.id)" v-if="share.uid===uid">
          <img src="/img/cross.png" class="cross">
        </span>
        <span><label for="comment">
          <img src="/img/detail.png" class="detail">
        </label></span>
    </div>
    <div class="comment-box">
      <h2>コメント</h2>
      <div v-for="com in comments" :key="com.id" class="comments">
        <span class="name">{{com.name}}</span>
        <span class="date">{{$dayjs(com.created_at).format('YYYY年M月D日(ddd) H:mm:ss')}}</span>
        <span @click="deleteComment(com.id)" v-if="com.uid===uid">
          <img src="/img/cross.png" class="cross small">
        </span>
        <p>{{com.content}}</p>
      </div>
    </div>
    <validation-observer ref="obs" v-slot="ObserverProps">
      <validation-provider v-slot="{ errors }" rules="required|max:120">
        <textarea v-model="comment" name="コメント" id="comment" rows="2"></textarea>
        <div class="error">{{ errors[0] }}</div>
      </validation-provider>
      <button type="button" class="comment-button" @click="sendComment"
        :disabled="ObserverProps.invalid || !ObserverProps.validated">
        コメントする
      </button>
    </validation-observer>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  layout: 'home',
  data() {
    return {
      id: null,
      share: null,
      comments: null,
      comment: null,
      uid: null,
      name:null,
    }
  },
  methods: {
    async getShare() {
      const gotDatum = await this.$axios.get('http://127.0.0.1:8000/api/share/'+this.id);
      this.share = gotDatum.data.data[0];
      this.comments = gotDatum.data.comdata;
    },
    async deleteShare(id) {
      const boo = confirm('このシェアを削除しますか？');
      if (boo) {
        await this.$axios.delete('http://127.0.0.1:8000/api/share/'+id);
        this.$router.replace('/');
      }
    },
    async sendComment() {
      const sendData = {
        share_id: this.id,
        uid: this.uid,
        name: this.name,
        content: this.comment,
      };
      await this.$axios.post('http://127.0.0.1:8000/api/comment/', sendData);
      this.getShare();
    },
    async deleteComment(id) {
      const boo = confirm('このコメントを削除しますか？');
      if (boo) {
        await this.$axios.delete('http://127.0.0.1:8000/api/comment/'+id);
        this.getShare();
      }
    },
    async toggleLike(id) {
      const sendData = {
        share_id: id,
        uid: this.uid
      };
      await this.$axios.post('http://127.0.0.1:8000/api/like/', sendData);
      this.getShare();
    },
  },
  async created() {
    this.id = await this.$route.query.share_id;
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.uid = user.uid;
        this.name = user.displayName;
      }
    });
    this.getShare();
  }
}
</script>

<style scoped>
h2 {
  border-bottom: white 1px solid;
  border-left: white 1px solid;
  text-align: center;
  font-weight: normal;
}
#comment {
  margin: 20px auto;
}
.comment-button {
  display: block;
  margin: 20px 10px 20px auto;
}
.error {
  margin-left: 2%;
}
.comments {
  border-left: white 1px solid;
  border-bottom: white 1px solid;
  padding: 8px 15px;
  transition: 1s ease;
}
.date {
  margin-right: 10px;
}
.small {
  width: 20px;
  height: 20px;
}
</style>