type Particulars = {
    tuitionFees: number,
    labFees: number,
    libraryFees: number,
    pslLibraryFees: number,
    cautionMoney: number,
    gymkhana: number,
    studentActivity: number,
    medicalFees: number,
    collegeExamFees: number,
    studentAidFees: number,
    identityCard: number,
    collegeHandBookMagazine: number,
    readingRoomFees: number,
    courseMaterials: number,
    courseDevelopment: number,
    admissionFees: number,
    ksswFund: number,
    kstbFund: number,
    sportsFees: number,
    kuSportsDevelopmentFees: number,
    kuCareerGuidanceFees: number,
    nssFee: number,
    registrationFees: number,
    licFees: number,
    cdFees: number,
    poorStudentAidFund: number,
    lateAdmPenalFees: number,
    other1: number,
    other2: number,
    other3: number,
}

type Payment = {
    _id?: string,
    studentId?: string;
    transactionId: string;
    amount: string;
    paidOn: Date;
    mode: string;
    particulars: string;
    detailedParticulars: Particulars | null;
}

export type {Particulars};

export default Payment;