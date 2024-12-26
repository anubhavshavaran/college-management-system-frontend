function formatOrdinal(number: number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = number % 100;

    if (value >= 11 && value <= 13) {
        return `${number}th`;
    }

    const suffix = suffixes[(value % 10)] || "th";
    return `${number}${suffix}`;
}

export default formatOrdinal;