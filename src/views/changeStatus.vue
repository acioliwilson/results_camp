<template>
    <div class="wrapper">
        <p>{{ campaignData.campaign_name }}</p>
        <p>{{ campaignData.status }}</p>
        <p>{{ campaignData.sending_date }}</p>
    </div>
    <!-- <button class="btnUpd" @click="updateStatus">Update</button> -->

    <form @submit.prevent="updateCampaign">
        <input type="text" class="form-control mb-2" v-model="campaignData.status">
        <input type="text" class="form-control mb-2" v-model="campaignData.sending_date">
        <button type="submit" class="btnUpd">UPDATE Status</button>
    </form>
</template>

<script>
import campaignsColRef from '@/firebase/campaigns';
import { doc, getDoc, setDoc } from '@firebase/firestore'

 const formattedDate = new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: false })

export default {
    data() {
        return {
            id: null,
            docRef: null,
            selectedDoc: null,
            campaigns: [],
            campaignData: {
                campaign_name: null,
                status: null,
                sending_date: formattedDate
            }
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
            this.campaignData.status = 'SENT'
            this.campaignData.sending_date = formattedDate
            this.campaignData.category = campaignData.category
            this.campaignData.html = campaignData.html
        },
        async updateCampaign () {
            await setDoc(this.docRef, this.campaignData)
            this.$router.push('/admin/campaigns')
        }
    },
    created() {
        const id = this.$route.params.id
        this.id = id
        this.getData()
    }
}
</script>

<style scoped>

.wrapper {
    width: 720px;
    height: 45px;
    border-radius: 5px;
    background: #FFF;
    box-shadow: 0 10px 30px rgba(0,0,0,.05);
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%,0%);
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    gap: 30px;
}
.btnUpd {
    cursor: pointer;
    border: none;
    background: blueviolet;
    color: #FFF;
    border-radius: 10px;
    padding: 13px 30px;
    transition: .4s ease;
    width: 100%;
}
.btnUpd:hover {
    background: purple;
}

form {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,0);
    background: #FFF;
    border-radius: 10px;
    padding: 30px;
}
</style>