<template>
    <div>
        <h1>Loans</h1>
        <div class="button-container">
            <button @click="toggleFilterModal" style="margin-right: 1rem;font-size: medium;">Filter</button>
            <button @click="toggleSortModal" style="font-size: medium;">Sort</button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Loan Amount</th>
                        <th>Interest Rate</th>
                        <th>Term</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="loan in filteredAndSortedLoans" :key="loan.id" @click="selectLoan(loan)">
                        <td>{{ loan.id }}</td>
                        <td>{{ loan.amount }}</td>
                        <td>{{ loan.interestRate }}</td>
                        <td>{{ loan.term }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Filter Modal -->
        <div v-if="filterModalVisible" class="modal">
            <div class="modal-content">
                <h3>Filter Loans</h3>
                <div>
                    <label>
                        Loan Amount:
                        <input type="number" v-model="tempFilterAmountMin" placeholder="Min amount" />
                        <input type="number" v-model="tempFilterAmountMax" placeholder="Max amount" />
                    </label>
                </div>
                <div>
                    <label>
                        Interest Rate:
                        <input type="number" v-model="tempFilterInterestRateMin" placeholder="Min interest rate" />
                        <input type="number" v-model="tempFilterInterestRateMax" placeholder="Max interest rate" />
                    </label>
                </div>
                <div>
                    <label>
                        Term: <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <input type="number" v-model="tempFilterTermMin" placeholder="Min term" />
                        <input type="number" v-model="tempFilterTermMax" placeholder="Max term" />
                    </label>
                </div>
                <div style="margin-top: 1rem;">
                    <button @click="applyFilter" style="margin-right: 1rem;font-size: medium;">Apply Filter</button>
                    <button @click="toggleFilterModal" style="font-size: medium;">Close</button>
                </div>
            </div>
        </div>

        <!-- Sort Modal -->
        <div v-if="sortModalVisible" class="modal">
            <div class="modal-content">
                <h3>Sort Loans</h3>
                <label>
                    Sort by:
                    <select v-model="tempSortBy">
                        <option value="amount">Loan Amount</option>
                        <option value="interestRate">Interest Rate</option>
                        <option value="term">Term</option>
                    </select>
                </label>
                <div style="margin-top: 1rem;">
                    <button @click="applySort" style="margin-right: 1rem;font-size: medium;">Apply Sort</button>
                    <button @click="toggleSortModal" style="font-size: medium;">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useAxios from '../composables/axios';
import { ref, computed, onMounted } from 'vue';
import { store } from '../composables/storeLoan.js';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const loans = ref([]);
        const filterAmountMin = ref('');
        const filterAmountMax = ref('');
        const filterInterestRateMin = ref('');
        const filterInterestRateMax = ref('');
        const filterTermMin = ref('');
        const filterTermMax = ref('');
        const tempFilterAmountMin = ref('');
        const tempFilterAmountMax = ref('');
        const tempFilterInterestRateMin = ref('');
        const tempFilterInterestRateMax = ref('');
        const tempFilterTermMin = ref('');
        const tempFilterTermMax = ref('');
        const sortBy = ref('');
        const tempSortBy = ref('');
        const filterModalVisible = ref(false);
        const sortModalVisible = ref(false);
        const router = useRouter();

        // get loans data
        const fetchLoans = async () => {
            const { axiosClient } = useAxios();
            try {
                const response = await axiosClient.get('andreascandle/p2p_json_test/main/api/json/loans.json');
                loans.value = response.data;
                console.log(loans.value);
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };

        onMounted(() => {
            fetchLoans();
        });

        // save selected loan data
        const selectLoan = (loan) => {
            store.setSelectedLoan(loan);
            router.push({ name: 'Loan Detail' });
        };

        //show filter modal
        const toggleFilterModal = () => {
            filterModalVisible.value = !filterModalVisible.value;
        };

        //show sort modal
        const toggleSortModal = () => {
            sortModalVisible.value = !sortModalVisible.value;
        };

        //set filter for loan
        const applyFilter = () => {
            filterAmountMin.value = tempFilterAmountMin.value;
            filterAmountMax.value = tempFilterAmountMax.value;
            filterInterestRateMin.value = tempFilterInterestRateMin.value;
            filterInterestRateMax.value = tempFilterInterestRateMax.value;
            filterTermMin.value = tempFilterTermMin.value;
            filterTermMax.value = tempFilterTermMax.value;
            toggleFilterModal();
        };

        //set sort loan 
        const applySort = () => {
            sortBy.value = tempSortBy.value
            toggleSortModal();
        };

        const filteredAndSortedLoans = computed(() => {
            let result = loans.value;

            // Apply filters
            if (filterAmountMin.value) {
                result = result.filter((loan) => loan.amount >= filterAmountMin.value);
            }
            if (filterAmountMax.value) {
                result = result.filter((loan) => loan.amount <= filterAmountMax.value);
            }
            if (filterInterestRateMin.value) {
                result = result.filter((loan) => loan.interestRate >= filterInterestRateMin.value);
            }
            if (filterInterestRateMax.value) {
                result = result.filter((loan) => loan.interestRate <= filterInterestRateMax.value);
            }
            if (filterTermMin.value) {
                result = result.filter((loan) => loan.term >= filterTermMin.value);
            }
            if (filterTermMax.value) {
                result = result.filter((loan) => loan.term <= filterTermMax.value);
            }

            // Apply sort ascending
            if (sortBy.value) {
                result = result.slice().sort((a, b) => {
                    if (sortBy.value === 'amount') {
                        return a.amount - b.amount;
                    } else if (sortBy.value === 'interestRate') {
                        return a.interestRate - b.interestRate;
                    } else if (sortBy.value === 'term') {
                        return a.term - b.term;
                    }
                });
            }

            return result;
        });

        return {
            loans,
            tempFilterAmountMin,
            tempFilterAmountMax,
            tempFilterInterestRateMin,
            tempFilterInterestRateMax,
            tempFilterTermMin,
            tempFilterTermMax,
            tempSortBy,
            filterModalVisible,
            sortModalVisible,
            toggleFilterModal,
            toggleSortModal,
            applyFilter,
            applySort,
            filteredAndSortedLoans,
            selectLoan,
        };
    },
};
</script>

<style scoped>
.button-container {
    display: flex;
    margin-bottom: 1rem;
}

.table-container {
    max-height: 600px;
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

/* Modal Styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 4px;
    width: 300px;
    color: black;
    text-align: center;
}
</style>
