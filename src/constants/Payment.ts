type Payment = {
    _id?: string,
    studentId?: string;
    transactionId: string;
    amount: string;
    paidOn: Date;
    mode: string;
    particulars: string;
}

export default Payment;