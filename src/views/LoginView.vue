<template>
    <main>
        <div class="main-form">
            <img class="mb-4 text-center" src="@/assets/logo.png">
            <h1 class="mb-3 fw-normal">Sign In</h1>
            <div class="form-floating">
                <input type="email" v-model="email" required autofocus class="form-control user-input shadow-none" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" v-model="password" required class="form-control pass shadow-none" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <button class="w-100 btn btn-lg main-btn mt-3" type="submit" @click="signin">Login now</button>
            <span class="alert" v-if="errMsg">{{ errMsg }}</span>
            <div class="center my-3">
                <img src="@/assets/or.png">
            </div>
            <div class="form-group">
                <button class="signinwithgoogleaccount swipe-l dl-3" @click="signInWithGoogle">
                    <i class="fa-brands fa-google"></i>
                    <span>
                        Sign in with an Google account
                    </span>
                </button>
            </div>
            <p class="mt-5 mb-3 text-muted">&copy; {{ new Date().getFullYear() }}</p>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router';

const email = ref('')
const password = ref('')
const errMsg = ref()
const router = useRouter()

const signin = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    // eslint-disable-next-line no-unused-vars
    .then((data) => {
        router.push('/admin/audiences')
    })
    .catch((error) => {
        console.log(error.code)
        switch (error.code) {
            case 'auth/invalid-email':
                errMsg.value = 'Invalid Email'
                break
            case 'auth/user-not-found':
                errMsg.value = 'No account with that email was found'
                break
            case 'auth/wrong-password':
                errMsg.value = 'Incorrect password'
                break
            default: 
                errMsg.value = 'Email or password was incorrect'
                break
        }
    })
}
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(getAuth(), provider)
    .then((result) => {
        console.log(result.user)
        router.push('/admin/audiences')
    })
    .catch((error) => {
        console.log(error)
    })
}
</script>

<style scoped>
h1 {
    font-size: 25px;
    font-weight: 500;
}
main {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.main-form {
    display: table;
    text-align: center;
    width: 400px;
}

/* INLINE CSS */
.bd-placeholder-img {
font-size: 1.125rem;
text-anchor: middle;
-webkit-user-select: none;
-moz-user-select: none;
user-select: none;
}

@media (min-width: 768px) {
.bd-placeholder-img-lg {
    font-size: 3.5rem;
}
}

.b-example-divider {
height: 3rem;
background-color: rgba(0, 0, 0, .1);
border: solid rgba(0, 0, 0, .15);
border-width: 1px 0;
box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
flex-shrink: 0;
width: 1.5rem;
height: 100vh;
}

.bi {
vertical-align: -.125em;
fill: currentColor;
}

.nav-scroller {
position: relative;
z-index: 2;
height: 2.75rem;
overflow-y: hidden;
}

.nav-scroller .nav {
display: flex;
flex-wrap: nowrap;
padding-bottom: 1rem;
margin-top: -1px;
overflow-x: auto;
text-align: center;
white-space: nowrap;
-webkit-overflow-scrolling: touch;
}

/* SIGN IN CSS */
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.user-input {
    border-radius: 5px 5px 0 0 !important;
    outline: none !important;
}
.pass {
    border-radius: 0px 0px 5px 5px !important;
    outline: none !important;
}
.pass:focus, .user-input:focus {
    outline: none !important;
}

.main-btn {
    background: #7111F5;
    color: #FFF;
    transition: .4s ease all;
    font-family: 'Poppins', sans-serif !important;
    font-weight: 500 !important;
    font-size: 15px !important;
    padding: 12px 20px !important;
}
.main-btn:hover {
    background: #5d13c5;
}
.signinwithgoogleaccount {
    background: #F82D2D;
    border-radius: 10px;
    padding: 14px 20px;
    color: #FFF;
    border: none;
    display: flex;
    text-align: center;
    gap: 10px;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    transition: .4s ease all;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 500;
}
.signinwithgoogleaccount:hover {
    background: #ce2727;
}
.signinwithgoogleaccount i {
    transform: translateY(-1px);
}
.alert {
    width: 100%;
    display: table;
    padding: 10px;
    background: #464646;
    color: #FFF;
    font-family: monospace;
    font-size: 15px;
    margin-top: 10px;
}
</style>