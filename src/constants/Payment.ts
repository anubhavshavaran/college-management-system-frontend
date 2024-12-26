type Payment = {
    _id?: string,
    studentId?: string;
    transactionId: string;
    amount: string;
    paidOn: string;
    mode: string;
    particulars: string;
}

export default Payment;