type Student = {
    _id?: string;
    name?: string;
    organization?: "SCHOOL" | "COLLEGE";
    satsNumber?: string,
    registrationNumber?: string,
    rollNumber?: string;
    class?: string;
    section?: number;
    course?: string;
    durationInYear?: number;
    year?: number | string;
    expectedYearOfPassing?: string;
    mothersName?: string;
    fathersName?: string;
    phoneNumber?: string;
    phoneNumber2?: string;
    dateOfBirth?: Date;
    adhaarNumber?: string;
    voterNumber?: string;
    passportNumber?: string;
    dateOfAdmission?: Date;
    gender?: "male" | "female";
    presentAddress?: string;
    permanentAddress?: string;
    city?: string;
    state?: string;
    pinCode?: string;
    religion?: string;
    caste?: string;
    subCaste?: string;
    category?: "general" | "obc" | "sc" | "st";
    categoryCertificateEnclosed?: "yes" | "no";
    parentsIncome?: string;
    incomeCertificateEnclosed?: "yes" | "no";
    fixedFee?: number,
    paidFee?: number,
    previousFee?: number,
    createdAt?: Date,
    batch?: string,
}

export default Student;