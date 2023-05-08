<template>
    <div class="admin-content">
    <nav>
      <ul>
        <li>
          <router-link to="/admin/audiences">
            <span class="material-symbols-outlined audience-i">
              groups
            </span>
            <span>
              Audiences
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/campaigns">
            <span class="material-symbols-outlined campaign-i">
              campaign
            </span>
            <span>
              Campaigns
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <span class="material-symbols-outlined logout-i">
              logout
            </span>
            <span>
              Logout
            </span>
          </router-link>
        </li>
      </ul>
    </nav>
    <main>
      <img src="@/assets/logo.png" style="width: auto; height: 30px;">
      <div class="form-group mt-4">
        <form ref="form" @submit.prevent="testNow">
          <input type="hidden" name="to_name" v-model="staff" class="mb-2 form-control mt-2" />
          <input type="hidden" name="subject" v-model="campaignData.campaign_name" class="mb-2 form-control mt-2" />
          <editor
          name="my_html"
          api-key="eg041ccwvkp18fjm6tnp9ky43bbx6cinicnggeitkt1haqny"
          plugins="code"
          toolbar="bold italic underline code"
          :init="{ menubar: false, height: 650 }"
          v-model="campaignData.html"
          style="display:none;"
          />
          <textarea style="display: none;" name="my_html" v-model="campaignData.html"></textarea>
          <div class="form-group mt-3">
            <input type="submit" value="TEST NOW" class="btn btn-primary" style="float:left; margin-right: 20px;">
            <router-link to="/admin/campaigns" class="btn btn-secondary text-light" style="display: table;">CANCEL</router-link>
          </div>
        </form>
      </div>
    </main>
  </div>
  <div class="backdrop">
    <div class="loading" v-show="loaderShow">
      <div class="loader">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <span class="loading-label">
        SENDING...
      </span>
    </div>
    <div class="status-200" v-show="status200">
      <i class="fa-regular fa-circle-check"></i>
      <h1>Status <span class="ok">200</span></h1>
      <p>Campaign has been sent successfully!</p>
    </div>
  </div>
</template>

<script>
import campaignsColRef from '@/firebase/campaigns'
import audiencesColRef from '@/firebase/audiences'
import { doc, getDoc, getDocs } from '@firebase/firestore'
import emailjs from '@emailjs/browser'
import Editor from '@tinymce/tinymce-vue'

export default {
    components: {
      'editor': Editor
    },
    data() {
      return {
        id: null,
        docRef: null,
        selectedDoc: null,
        campaigns: [],
        audiences: [],
        staff: 'w.aciolib@gmail.com',
        campaignData: {
          campaign_name: null,
          audience: null,
          status: 'DRAFT',
          sending_date: '-',
          category: null,
          html: null
        },
        csvData: {
          email: null
        },
        loaderShow: true,
        status200: false
      }
    },
    methods: {
        async getData() {
            const docRef = doc(campaignsColRef, this.id)
            this.docRef = docRef
            const campaign = await getDoc(this.docRef)
            const campaignData = campaign.data()
            this.campaignData.campaign_name = campaignData.campaign_name
            this.campaignData.audience = campaignData.audience
            this.campaignData.status = campaignData.status
            this.campaignData.sending_date = campaignData.sending_date
            this.campaignData.category = campaignData.category
            this.campaignData.html = campaignData.html
        },
        async getAudiences () {
            const snap = await getDocs(audiencesColRef)
            const audiences = []
            snap.forEach((audience) => {
                const audienceData = audience.data()
                audienceData.id = audience.id
                audiences.push(audienceData)
            })
            this.audiences = audiences
        },
        testNow() {
          emailjs.sendForm('service_4h82ejt', 'template_f0lqyqt', this.$refs.form, 'Z4R852hBj8lv6qheH')
          .then((result) => {
            console.log('SUCCESS!', result.text);
          }, (error) => {
            console.log('FAILED...', error.text);
            // this.$router.push('/admin/campaigns')
          });
        }
    },
    mounted() {
      setTimeout(() => {
        this.testNow()
        this.loaderShow = !this.loaderShow
        this.status200 = !this.status200
      }, 9000);
      setTimeout(() => {
        this.$router.push('/admin/campaigns')
      }, 12000)
    },
    created() {
        const id = this.$route.params.id
        this.id = id
        this.getData()
        this.getAudiences()
    }
}
</script>

<style scoped>
.admin-content {
    width: 100%;
    display: flex;
}
nav {
    width: 250px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    left: 0;
    top: 0;
    background: #FAFAFA;
    border-right: 1px solid #EAEAEA;
    padding: 2rem;
}
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
ul li {
    margin: 10px 0;
}
a {
    display: flex;
    gap: 10px;
    align-items: center;
    text-decoration: none;
    color: #464646;
}
.audience-i {
    color: #7111F5;
}
.campaign-i {
    color: #FF8A00;
}
.logout-i {
    color: #FF2020;
}
main {
    padding: 2rem;
    width: 100%;
}
main h2 {
    font-size: 20px;
    font-weight: 500;
    color: #464646;
    margin: 0;
}
.flex {
    display: flex;
    width: 100%;
    margin-top: 40px;
}
.spacebetween {
    justify-content: space-between;
    align-items: center;
}
.flex a {
    padding: 10px 20px;
    border-radius: 5px;
    color: #FFF;
    background: #7111F5;
    font-weight: 500;
    transition: .4s ease all;
}
.flex a:hover {
    background: #6515d6;
}
.flex-btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
}

/* 06 - May - 2023 */
.backdrop {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  /* z-index: 40000; */
  background: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading {
  display: table;
}
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.loader .dot {
  width: 10px;
  height: 10px;
  background: #D8B7FF;
  display: table;
  border-radius: 20px;
}
.loader .dot:nth-child(1) {
  animation: 1s push linear infinite;
}
.loader .dot:nth-child(2) {
  animation: 1s push linear infinite;
  animation-delay: .5s;
}
.loader .dot:nth-child(3) {
  animation: 1s push linear infinite;
  animation-delay: 1s;
}
.loader .dot:nth-child(4) {
  animation: 1s push linear infinite;
  animation-delay: 1.5s;
}

@keyframes push {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-10px); background: #9741F9; }
}

.loading-label {
  font-weight: 500;
  font-size: 16px;
  color: #C592FF;
  margin-top: 20px;
  text-align: center;
  display: table;
}
.status-200 {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  animation: .7s fadeIn ease forwards;
}
@keyframes fadeIn {
  from { transform: translateY(-10px); opacity: .5; }
  to { transform: translateZ(0px); opacity: 1; }
}
.fa-circle-check {
  font-size: 20px;
  color: #27ED76;
}
.status-200 h1 {
  font-size: 30px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  line-height: 1;
}
.status-200 p {
  font-size: 18px;
  margin: 0;
  padding: 0;
  line-height: 1.3;
  opacity: .5;
}
.ok {
  color: #27ED76;
}
</style>