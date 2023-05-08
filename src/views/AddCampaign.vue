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
            <section>
                <form @submit.prevent="createCampaign">
                    <div class="form-group mb-2">
                        <label for="campaign_name">Campaign name: <b class="red-c">*</b></label>
                        <input type="text" name="campaign_name" id="campaign_name" class="form-control" v-model="campaignData.campaign_name">
                    </div>
                    <div class="form-group mb-3">
                        <label for="audience_list">Audience: <b class="red-c">*</b></label>
                        <select name="audience_list" id="audience_list" v-model="campaignData.audience" class="form-select" aria-label="Default select example">
                            <option v-for="audience in audiences" :key="audience.id">{{ audience.audience_name }}</option>
                        </select>
                    </div>
                    <div class="form-group mb-3">
                        <label for="audience_list">Category: <b class="red-c">*</b></label>
                        <select name="category" id="category" v-model="campaignData.category" class="form-select" aria-label="Default select example">
                            <option>SURVEYS</option>
                            <option>SALES</option>
                            <option>OPERATIONS</option>
                            <option>MARKETING</option>
                        </select>
                    </div>
                    <div class="form-group mb-2">
                        <label for="audience_list">Letter: <b class="red-c">*</b></label>
                        <editor
                        api-key="eg041ccwvkp18fjm6tnp9ky43bbx6cinicnggeitkt1haqny"
                        plugins="code"
                        toolbar="bold italic underline code"
                        :init="{ menubar: false, height: 500 }"
                        v-model="campaignData.html"
                        />
                    </div>
                    <div class="form-group mt-3">
                        <router-link to="/admin/campaigns" class="cancel-btn">Cancel</router-link>
                        <button type="submit" class="save-btn">Create Campaign</button>
                    </div>
                </form>
            </section>
        </main>
    </div>
</template>

<script>
// import papa from 'papaparse'
import audiencesColRef from '@/firebase/audiences'
import campaignsColRef from '@/firebase/campaigns';
import { addDoc, getDocs } from '@firebase/firestore';
import Editor from '@tinymce/tinymce-vue'
// import { addDoc } from '@firebase/firestore'

export default {
    components: {
        'editor': Editor
    },
    data() {
        return {
            docRef: null,
            selectedDoc: null,
            audiences: [],
            campaignData: {
                campaign_name: null,
                audience: null,
                status: 'DRAFT',
                sending_date: '-',
                category: null,
                html: null
            }
        }
    },
    methods: {
        async getAudiences () {
            const snapshot = await getDocs(audiencesColRef)
            const audiences = []
            snapshot.forEach((audience) => {
                const audienceData = audience.data()
                audienceData.id = audience.id
                audiences.push(audienceData)
            })
            this.audiences = audiences
        },
        async createCampaign () {
            await addDoc(campaignsColRef, this.campaignData)
            this.$router.push('/admin/campaigns')
        }
        // async createAudienceWithCSV () {
        //     await addDoc(audiencesColRef, this.$data)
        //     this.$router.push('/admin/audiences')
        // }
    },
    created() {
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


  /* -------------------------------------------- */
  .form-group-flex {
        display: flex;
        margin-bottom: 20px;
        gap: 10px;
        border: 1px solid orange;
        padding: 10px;
        width: 630px;
        border-radius: 5px;
    }
    .form-group label {
        display: block;
        letter-spacing: .5px;
        margin-bottom: 5px;
        color: #262626;
    }

    #file {
        display: none;
    }
    .upload_file {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #262626;
        cursor: pointer;
    }
    .upload_file i {
        margin-right: 7px;
    }
    .upload_file span {
        font-weight: 500;
    }
    .convert {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 500;
        border: none;
        background: #262626;
        color: #FFF;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
    }
    .mt-3 {
        margin-top: 30px;
    }

    .cancel-btn {
        padding: 10px 20px;
        border-radius: 5px;
        border: 1px solid #262626;
        background: none;
        font-size: 14px;
        text-transform: uppercase;
        color: #262626;
        transition: .3s ease all;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        display: table;
        float: left;
    }
    .cancel-btn:hover {
        background: #262626;
        color: #FFF;
    }
    .save-btn {
        padding: 10px 20px;
        border-radius: 5px;
        border: 1px solid #673cdb;
        background: #673cdb;
        font-size: 14px;
        color: #FFF;
        transition: .3s ease all;
        font-family: 'Poppins', sans-serif;
        text-transform: uppercase;
        cursor: pointer;
        letter-spacing: 1px;
        margin-left: 25px;
    }
    .save-btn:hover {
        background: #5a37b9;
    }

    section {
        width: 100%;
        display: table;
        margin-top: 30px;
    }
    .red-c {
        color: tomato !important;
    }
</style>