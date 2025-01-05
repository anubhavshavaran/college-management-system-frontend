function formatNumberToWord(num: number): string {
    const ones = [
        '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    ];
    const tens = [
        '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
    ];
    const teens = [
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
    ];

    const units = ['', 'thousand', 'lakh', 'crore'];

    if (num === 0) return 'zero';

    const convertToWords = (n: number): string => {
        if (n < 10) return ones[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) return `${tens[Math.floor(n / 10)]} ${ones[n % 10]}`.trim();
        if (n < 1000) return `${ones[Math.floor(n / 100)]} hundred ${n % 100 !== 0 ? convertToWords(n % 100) : ''}`.trim();
        return '';
    };

    let result = '';
    let unitIndex = 0;

    while (num > 0) {
        const part = num % (unitIndex === 0 ? 1000 : 100);
        if (part > 0) {
            const words = convertToWords(part);
            result = `${words} ${units[unitIndex]} ${result}`.trim();
        }
        num = Math.floor(num / (unitIndex === 0 ? 1000 : 100));
        unitIndex++;
    }

    return result.trim();
}

export default formatNumberToWord;