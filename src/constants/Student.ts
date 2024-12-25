type Student = {
    _id: string;
    name: string;
    organization: "SCHOOL" | "COLLEGE";
    rollNumber?: string;
    class?: string; // Only for the school
    section?: number; // Only for the school
    course?: string; // Only for the college
    semester?: number; // Only for the college (1-8, default 1)
    expectedYearOfPassing?: string; // Only for the college
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
}

export default Student;