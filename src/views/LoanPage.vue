<template>
    <LoanList />
</template>

<script>
import { ref, onMounted } from 'vue';
import LoanList from '../components/LoanList.vue'

export default {

    components: {
        LoanList,
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