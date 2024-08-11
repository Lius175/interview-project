<template>
    <!-- <header>
        <h1>Interview Project Loans </h1>
    </header> -->
    <LoanList />
</template>

<script>
import useAxios from '../composables/axios'
import { ref, onMounted } from 'vue';
import LoanList from '../components/LoanList.vue'

export default {

    components: {
        LoanList,
    },

    setup() {
        const loans = ref([]);

        const fetchLoans = async () => {
            const { axiosClient } = useAxios()
            try {
                const response = await axiosClient.get('andreascandle/p2p_json_test/main/api/json/loans.json');
                loans.value = response.data;
                console.log(loans.value)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        onMounted(() => {
            fetchLoans();
        });

        return {
            loans,
        };
    },


}
</script>

<style scoped>
.table-container {
    max-height: 400px;
    /* Adjust height as needed */
    overflow-y: auto;
    border: 1px solid #ddd;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
    color: black;
}

thead th {
    position: sticky;
    top: 0;
    background-color: #f4f4f4;
}
</style>