import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { initializeApp } from '@firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCYOBdNLUk-4L12zP1hbZv3dMfLdWABF4k",
    authDomain: "teste-c1688.firebaseapp.com",
    projectId: "teste-c1688",
    storageBucket: "teste-c1688.appspot.com",
    messagingSenderId: "443239934135",
    appId: "1:443239934135:web:789a38b41ac1c375c08532"
}

const init = initializeApp(firebaseConfig)
const db = getFirestore(init)

const app = createApp(App)

app.use(router)
app.mount('#app')

export default db