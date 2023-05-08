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
      <div class="flex spacebetween">
        <h2>Campaigns list</h2>
        <router-link to="/admin/campaigns/add">CREATE CAMPAIGN</router-link>
      </div>
      <table class="table table-bordered mt-3">
        <thead>
          <tr valign="center" style="font-size: 14px; font-weight: 500;">
            <td>NAME</td>
            <td align="center">STATUS</td>
            <td align="center">SENDING DATE</td>
            <td align="center">CATEGORY</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr valign="center" style="font-size: 14px; font-weight: 400;" v-for="campaign in campaigns" :key="campaign.id">
            <td valign="center">
              <span style="margin-top: 5px; display: table;">{{ campaign.campaign_name }}</span>
            </td>
            <td valign="center" align="center" width="150">
              <span v-if="campaign.status == 'DRAFT'" style="margin-top: 5px; display: table; color: #FE5101;">{{ campaign.status }}</span>
              <span v-if="campaign.status == 'SENT'" style="margin-top: 5px; display: table; color: rgb(17, 233, 82); font-weight: 500;">{{ campaign.status }}</span>
            </td>
            <td width="150" align="center">
                <span style="display: table; margin-top: 5px;">{{ campaign.sending_date }}</span>
            </td>
            <td width="150" align="center">
                <span style="display: table; margin-top: 5px;">{{ campaign.category }}</span>
            </td>
            <td width="155" align="center">
              <div class="flex-btns">
                <router-link :to="{ path: '/admin/campaigns/test/'+campaign.id }" class="btn btn-remove" v-if="campaign.status != 'SENT'">TEST</router-link>
                <router-link :to="{ path: '/admin/campaigns/send/'+campaign.id }" class="btn btn-remove" v-if="campaign.status != 'SENT'">SEND</router-link>
                <router-link :to="{ path: '/admin/campaigns/send/'+campaign.id }" class="btn btn-remove-outline" v-if="campaign.status == 'SENT'">RESEND</router-link>
                <router-link :to="{ path: '/admin/campaigns/edit/'+campaign.id }" class="btn btn-remove">EDIT</router-link>
                <button class="btn btn-remove" @click="removeCampaign(campaign.id)">REMOVE</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import campaignsColRef from '@/firebase/campaigns';
import { deleteDoc, doc, getDocs } from '@firebase/firestore';

export default {
    data() {
        return {
            docRef: null,
            selectedDoc: null,
            campaigns: []
        }
    },
    methods: {
        async getCampaigns () {
            const snapshot = await getDocs(campaignsColRef)
            const campaigns = []
            snapshot.forEach((campaign) => {
                const campaignData = campaign.data()
                campaignData.id = campaign.id
                campaigns.push(campaignData)
            })
            this.campaigns = campaigns
        },
        async removeCampaign (id) {
          const docRef = doc(campaignsColRef, id)
          await deleteDoc(docRef)
          this.$router.go('')
        }
    },
    created() {
        this.getCampaigns()
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
  .edit-btn {
    color: #FFF;
    background: #464646;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    transition: .4s ease all;
  }
  .btn-remove {
    color: #FFF;
    background: #464646;
    font-weight: 500;
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    transition: .4s ease all;
  }
  .btn-remove:hover, .edit-btn:hover {
    background: #6515d6;
  }
  .btn-remove-outline {
    color: #464646;
    border: 1px solid #464646;
    font-weight: 500;
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    transition: .4s ease all;
  }
  .btn-remove-outline:hover {
    background: #464646;
    color: #FFF;
  }
</style>