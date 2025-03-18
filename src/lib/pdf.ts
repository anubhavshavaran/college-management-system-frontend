import {jsPDF} from "jspdf";
import {applyPlugin} from 'jspdf-autotable';
import Voucher from "@/constants/Voucher.ts";
// import Organization from "@/constants/Organization.ts";

applyPlugin(jsPDF);

// type Query = {
//     date?: string;
//     start?: string;
//     end?: string;
// }

// function generateStatement(data: Voucher[], organization: Organization, query: Query) {
function generateStatement(data: Voucher[]) {
    const doc = new jsPDF();

    // const pageWidth = doc.internal.pageSize.getWidth();

    // doc.setFontSize(18);
    //
    // const header1 = "S.M.E SOCIETY's";
    // const header2 = `ABDULKALAM ${organization.toUpperCase()}`;
    //
    // const x1 = (pageWidth - doc.getTextWidth(header1)) / 2;
    // const x2 = (pageWidth - doc.getTextWidth(header2)) / 2;
    //
    // doc.text(header1, x1, 20);
    // doc.text(header2, x2, 27);
    //
    // doc.setFontSize(12);

    // if (query.start && query.end) {
    //     doc.text(`From: ${query.start}`, 14, 35);
    //     doc.text(`To: ${query.end}`, 14, 40);
    // } else if (query.date) {
    //     doc.text(`Date: ${query.date}`, 14, 35);
    // }

    doc.autoTable({
        startY: 20,
        head: [['Sr. no.', 'Voucher number', 'Paid To', 'Date', 'Amount', 'Mode of Payment', 'Particulars']],
        body: data.map((item: Voucher, index) => [
            index + 1,
            `Voucher no. ${item.voucherNumber}`,
            item.title,
            new Date(item.date).toISOString().split('T')[0],
            item.amount,
            item.modeOfPayment,
            item.particulars,
        ]),
        theme: 'grid',
        headStyles: {fillColor: [200, 200, 200], textColor: 50},
        styles: {fontSize: 10, cellPadding: 2}
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Page ${i} of ${pageCount}`, 180, 290);
    }

    doc.save('statement.pdf');
}

export {generateStatement};