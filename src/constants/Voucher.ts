type Voucher = {
    _id?: string;
    voucherNumber?: string;
    title: string;
    date: Date;
    amount: number;
    modeOfPayment: string;
    particulars: string;
    organization: string
}

export default Voucher;