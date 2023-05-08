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
          <router-link to="/logout">
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
        <h2>Audiences list</h2>
        <router-link to="/admin/audiences/add">CREATE AUDIENCE</router-link>
      </div>
      <table class="table table-bordered mt-3">
        <thead>
          <tr valign="center" style="font-size: 14px; font-weight: 500;">
            <td>NAME</td>
            <td align="center">CREATED AT</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr valign="center" style="font-size: 14px; font-weight: 400;" v-for="audience in audiences" :key="audience.id">
            <td valign="center">
              <span style="margin-top: 5px; display: table;">{{ audience.audience_name }}</span>
            </td>
            <td valign="center" align="center" width="150">
              <span style="margin-top: 5px; display: table;">{{ audience.created_at }}</span>
              <!-- <span v-for="(csv, i) in audience.csvData" :key="i">{{ csv.email+';' }}</span> -->
            </td>
            <td width="80">
              <div class="flex-btns">
                <button class="btn btn-remove" @click="removeAudience(audience.id)">REMOVE</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import audiencesColRef from '@/firebase/audiences';
import { deleteDoc, doc, getDocs } from '@firebase/firestore';

export default {
  data() {
    return {
      audiences: [],
      selectedDoc: null,
      docRef: null,
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
    async removeAudience (id) {
      const docRef = doc(audiencesColRef, id)
      await deleteDoc(docRef)
      this.$router.go('')
    }
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
</style>