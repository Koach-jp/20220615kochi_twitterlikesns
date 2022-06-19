export default {
  data() {
    return {
      shares: null
    }
  },
  methods: {
    async getShares() {
      const gotData = await this.$axios.get('http://127.0.0.1:8000/api/share');
      this.shares = gotData.data.data;
    }
  }
}