import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyDMUoEhIHhKcqzDBfksP8_h-JL0jAeLoJs",
      authDomain: "twitterlikesns.firebaseapp.com",
      projectId: "twitterlikesns",
      storageBucket: "twitterlikesns.appspot.com",
      messagingSenderId: "927776963982",
      appId: "1:927776963982:web:ba06bd59a3ed7f0e9db8df",
      measurementId: "G-2CXT7RB122"
    }
  )
}
  
export default firebase