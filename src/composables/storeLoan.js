import { reactive } from 'vue';

export const store = reactive({
    selectedLoan: null,
    setSelectedLoan(loan) {
        this.selectedLoan = loan;
    },
});
