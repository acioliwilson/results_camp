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
                <button @click="toggleCsv" class="btn-default btn-disabled" disabled>Export External List</button>
                <button @click="toggleManually" style="margin-left: 20px;" class="btn-default">Add Manually</button>
            </section>

            <!-- External List -->
            <section v-show="isActive">
                <div class="form-group-flex">
                    <label for="file" class="upload_file">
                        <i class="fa-solid fa-cloud-arrow-up"></i>
                        <span>Upload a CSV file</span>
                    </label>
                    <input type="file" ref="file" id="file" />
                    <button @click="csvTojson" class="convert">Convert</button>
                </div>
                <table width="630" border="0" cellpadding="5" bgcolor="#FFF" class="mb-3">
                    <tr style="background: #F7F7F7; color: #666; font-weight: 600;">
                        <td>Email</td>
                    </tr>
                    <tr v-for="(data,i) in csvData" :key="i" style="font-weight: 500; color: #262626;">
                        <td>{{ data.email }}</td>
                    </tr>
                </table>
                <form @submit.prevent="createAudienceWithCSV">
                    <div class="form-group mb-2">
                        <label for="audience_name">Audience name: <b class="red-c">*</b></label>
                        <input type="text" name="audience_name" id="audience_name" class="form-control" v-model="audienceData.audience_name">
                    </div>
                    <div class="form-group mt-3">
                        <router-link to="/audiences" class="cancel-btn">Cancel</router-link>
                        <button type="submit" class="save-btn" disabled>Create Audience</button>
                    </div>
                </form>
            </section>

            <!-- Add Manually -->
            <section v-show="manuallyActive">
                <form @submit.prevent="createAudienceWithCSV">
                    <h2 class="label-tab">
                        <i class="fa-regular fa-pen-to-square"></i>
                        <span>Add an audience list manually.</span>
                    </h2>
                    <div class="form-group mb-2">
                        <label for="audience_name">Audience name: <b class="red-c">*</b></label>
                        <input type="text" name="audience_name" id="audience_name" class="form-control" v-model="audienceData.audience_name">
                    </div>
                    <div class="form-group mb-2">
                        <input type="hidden" class="form-control" v-model="formattedDate">
                    </div>
                    <div class="form-group mb-2">
                        <label for="audience_contacts">Contacts: <b class="red-c">*</b></label>
                        <code class="legend">Separate the contacts using ";"</code>
                        <input type="text" name="audience_contacts" class="form-control textbox" v-model="audienceData.contacts">
                    </div>
                    <div class="form-group mt-3">
                        <router-link to="/admin/audiences" class="cancel-btn">Cancel</router-link>
                        <button type="submit" class="save-btn">Create Audience</button>
                    </div>
                </form>
            </section>
        </main>
    </div>
</template>

<script>
import papa from 'papaparse'
import audiencesColRef from '@/firebase/audiences'
import { addDoc } from '@firebase/firestore'

const formattedDate = new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: false })

export default {
    data() {
        return {
            csvData: [],
            audienceData: {
                audience_name: null,
                created_at: formattedDate
            },
            isActive: false,
            manuallyActive: true,
            date: new Date()
        }
    },
    computed: {
        formattedDate() {
            return this.date.toLocaleString('en-US', {
                timeZone: 'UTC',
                hour12: false
            })
        }
    },
    methods: {
        toggleCsv() {
            this.isActive = !this.isActive
            if(this.manuallyActive == true) {
                this.manuallyActive = !this.manuallyActive
            }
        },
        toggleManually() {
            this.manuallyActive = !this.manuallyActive
            if(this.isActive == true) {
                this.isActive = !this.isActive
            }
        },
        csvTojson() {
            let csvFile = this.$refs.file.files[0]
            if(csvFile == undefined) {
                alert('Please select the file')
                this.csvData = []
                return
            }
            let that = this
            papa.parse(csvFile, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                preview: 100,
                complete(result){
                    that.csvData = result.data
                    this.contacts = result.data.email
                }
            })
        },
        async createAudienceWithCSV () {
            const result = []
            const map = new Map()
            for(const item of this.csvData) {
                if(!map.has(item.email)) {
                    map.set(item.email, true)
                    result.push({
                        email: item.email
                    })
                }
            }
            console.log(result)
            await addDoc(audiencesColRef, this.audienceData)
            this.$router.push('/admin/audiences')
        }
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
    .form-control {
        padding: 10px 20px;
        border: 1px solid #EAEAEA;
        background: #FAFAFA;
        border-radius: 5px;
        width: 630px;
        outline: none;
        font-family: 'Balechin Royalo', sans-serif;
        font-size: 15px;
        letter-spacing: .5px;
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

    .save-btn:disabled {
        background: #dbd1f7;
        color: #464646;
        border:1px solid #dbd1f7;
        font-weight: 500;
        cursor: auto;
    }

    section {
        width: 100%;
        display: table;
        margin-top: 30px;
    }

    .label-tab {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 30px;
    }
    code.legend {
        margin-top: -5px;
        margin-bottom: 10px;
        display: table;
        color: #FF8A00;
    }
    .btn-default {
        border: 1px solid #5a37b9;
        background: #5a37b9;
        color: #FFF;
        font-weight: 500;
        border-radius: 5px;
        padding: 10px 30px;
        transition: .4s ease all;
    }
    .btn-default:disabled {
        background: #f0eaff;
        border-color: #f0eaff;
        color: #ccc5df;
        font-weight: 400;
    }
    .btn-default:nth-child(2) {
        background: #9778ec;
        border-color: #9778ec;
    }
    .btn-default:nth-child(2):hover {
        background: #5a37b9;
    }
</style>