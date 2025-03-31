import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable';
import Voucher from "@/constants/Voucher.ts";
import Organization from "@/constants/Organization.ts";
import html2canvas from "html2canvas";

type Query = {
    date?: string;
    start?: string;
    end?: string;
};

function generateStatement(data: Voucher[], organization: Organization, query: Query) {
    const doc = new jsPDF();

    autoTable(doc, {});

    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(18);

    const header1 = "S.M.E SOCIETY's";
    const header2 = `ABDULKALAM ${organization.toUpperCase()}`;

    const x1 = (pageWidth - doc.getTextWidth(header1)) / 2;
    const x2 = (pageWidth - doc.getTextWidth(header2)) / 2;

    doc.text(header1, x1, 20);
    doc.text(header2, x2, 27);

    doc.setFontSize(12);

    if (query.start && query.end) {
        doc.text(`From: ${new Date(query.start).toISOString().split('T')[0]}`, 14, 35);
        doc.text(`To: ${new Date(query.end).toISOString().split('T')[0]}`, 14, 40);
    } else if (query.date) {
        doc.text(`Date: ${new Date(query.date).toISOString().split('T')[0]}`, 14, 35);
    }

    autoTable(doc, {
        startY: 50,
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
        styles: {fontSize: 10, cellPadding: 2},
    });

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Page ${i} of ${pageCount}`, 180, 290);
    }

    doc.save('vouchers.pdf');
}

async function generatePDF(vouchers: Voucher[], voucherRender: (voucher: Voucher) => string) {
    const pdf = new jsPDF("p", "mm", "a6");

    const margin = 10;

    const canvasPromises = vouchers.map(async (voucher: Voucher, index: number) => {
        const voucherHTML = voucherRender(voucher);

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = voucherHTML;
        tempDiv.style.position = "absolute";
        tempDiv.style.left = "-9999px";
        document.body.appendChild(tempDiv);

        const canvas = await html2canvas(tempDiv, {
            scale: 2,
            useCORS: true,
            logging: false,
        });
        const imgData = canvas.toDataURL("image/png");

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imgWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const imgHeight = (canvasHeight * imgWidth) / canvasWidth;

        const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
        const y = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;

        if (index > 0) {
            pdf.addPage();
        }

        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

        document.body.removeChild(tempDiv);
    });

    await Promise.all(canvasPromises);

    pdf.save("vouchers.pdf");
}

export {generateStatement, generatePDF};