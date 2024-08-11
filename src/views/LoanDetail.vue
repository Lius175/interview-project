<template>
    <div>
        <h1>Loan Details</h1>
        <p><strong>ID:</strong> {{ loan.id }}</p>
        <p><strong>Amount:</strong> {{ loan.amount }}</p>
        <p><strong>Interest Rate :</strong> {{ loan.interestRate }}</p>
        <p><strong>Term:</strong> {{ loan.term }}</p>
        <p><strong>Purpose:</strong> {{ loan.purpose }}</p>
        <p><strong>Borrower:</strong></p>
        <p class="sub-detail"><strong>ID:</strong> {{ loan.borrower.id }}</p>
        <p class="sub-detail"><strong>Name:</strong> {{ loan.borrower.name }}</p>
        <p class="sub-detail"><strong>Email:</strong> {{ loan.borrower.email }}</p>
        <p class="sub-detail"><strong>Credit Score:</strong> {{ loan.borrower.creditScore }}</p>
        <p><strong>Repayment Schedule:</strong></p>
        <p class="sub-detail"><strong>Installments:</strong></p>
        <ul>
            <li v-for="(installment, index) in loan.repaymentSchedule.installments" :key="index">
                Due Date {{ index + 1 }}: {{ installment.dueDate }} | Amount Due: {{ installment.amountDue }}
            </li>
        </ul>
    </div>
</template>

<script>
import { computed } from 'vue';
import { store } from '../composables/storeLoan.js';

export default {
    name: 'LoanDetail',
    setup() {
        const loan = computed(() => store.selectedLoan);

        return {
            loan,
        };
    },
};
</script>

<style>
.sub-detail {
    margin-left: 1.5rem;
}

li {
    list-style-type: none;
    margin-left: 0.5rem;
}
</style>
