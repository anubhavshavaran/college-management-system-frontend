type Student = {
    _id: string;
    name: string;
    organization: "SCHOOL" | "COLLEGE";
    rollNumber?: string;
    class?: string;
    section?: number;
    course?: string;
    semester?: number;
    expectedYearOfPassing?: string;
    mothersName?: string;
    fathersName?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    adhaarNumber?: string;
    voterNumber?: string;
    passportNumber?: string;
    admissionNumber?: string;
    dateOfAdmission?: string;
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
    previousFee?: number
}

export default Student;