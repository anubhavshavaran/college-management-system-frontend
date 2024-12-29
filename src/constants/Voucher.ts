type Voucher = {
    _id?: string;
    title: string;
    date: Date;
    amount: number;
    modeOfPayment: string;
    particulars: string;
}

export default Voucher;