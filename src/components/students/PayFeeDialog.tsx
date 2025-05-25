import {Button} from "@/components/ui/button.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import FlowDatePicker from "@/components/ui/FlowDatePicker.tsx";
import FormError from "@/components/ui/FormError.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import Payment, {Particulars} from "@/constants/Payment.ts";
import {useCreateStudentPayment} from "@/hooks/students.ts";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useParams} from "react-router";

type PayFeeDialogProps = {
    onSave: () => void;
}

const particularFields: { name: keyof Particulars; label: string }[] = [
    { name: "tuitionFees", label: "Tuition Fees" },
    { name: "labFees", label: "Lab Fees" },
    { name: "libraryFees", label: "Library Fees" },
    { name: "pslLibraryFees", label: "PSL Library Fees" },
    { name: "cautionMoney", label: "Caution Money" },
    { name: "gymkhana", label: "Gymkhana" },
    { name: "studentActivity", label: "Student Activity" },
    { name: "medicalFees", label: "Medical Fees" },
    { name: "collegeExamFees", label: "College Exam Fees" },
    { name: "studentAidFees", label: "Student Aid Fees" },
    { name: "identityCard", label: "Identity Card" },
    { name: "collegeHandBookMagazine", label: "College Handbook Magazine" },
    { name: "readingRoomFees", label: "Reading Room Fees" },
    { name: "courseMaterials", label: "Course Materials" },
    { name: "courseDevelopment", label: "Course Development" },
    { name: "admissionFees", label: "Admission Fees" },
    { name: "ksswFund", label: "KSSW Fund" },
    { name: "kstbFund", label: "KSTB Fund" },
    { name: "sportsFees", label: "Sports Fees" },
    { name: "kuSportsDevelopmentFees", label: "KU Sports Development Fees" },
    { name: "kuCareerGuidanceFees", label: "KU Career Guidance Fees" },
    { name: "nssFee", label: "NSS Fee" },
    { name: "registrationFees", label: "Registration Fees" },
    { name: "licFees", label: "KU LIC Fees" },
    { name: "cdFees", label: "KU CD Fees" },
    { name: "poorStudentAidFund", label: "KU Poor Student Aid Fund" },
    { name: "lateAdmPenalFees", label: "KU Late Adm. Penal Fees" },
    { name: "other1", label: "Other 1" },
    { name: "other2", label: "Other 2" },
    { name: "other3", label: "Other 3" }
];

function PayFeeDialog({onSave}: PayFeeDialogProps) {
    const {studentId} = useParams();
    const {createPayment, isCreatingPayment} = useCreateStudentPayment(studentId ?? '');
    const {control, getValues, setValue, formState: {errors}, handleSubmit, reset} = useForm<Payment>({
        defaultValues: {
            paidOn: new Date()
        }
    });
    const [addParticulars, setAddParticulars] = useState(false);

    function create() {
        const data = getValues();
        createPayment(data);
        reset();
        onSave();
    }

    function toggleShowParticulars(value: boolean) {
        if (!value) {
            setValue('detailedParticulars', null);
        }

        setAddParticulars(value);
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Pay Fees</DialogTitle>
                <DialogDescription>
                    Pay the fee of a student
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-6 py-4 h-[500px] overflow-x-auto">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Amount *
                    </Label>
                    <Controller
                        control={control}
                        name="amount"
                        rules={{
                            required: {
                                value: true,
                                message: 'Amount is required'
                            },
                            min: {
                                value: 1,
                                message: 'Amount cannot be zero'
                            }
                        }}
                        render={({field: {value, onChange}}) => (
                            <div className="w-full col-span-3 flex flex-col gap-2">
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    value={value}
                                    onChange={onChange}
                                    disabled={isCreatingPayment}
                                />
                                <FormError message={errors.amount?.message}/>
                            </div>
                        )}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-16">
                    <Label htmlFor="username" className="text-right text-nowrap">
                        Mode of Payment *
                    </Label>
                    <Controller
                        control={control}
                        name="mode"
                        rules={{
                            required: {
                                value: true,
                                message: 'Mode of Payment is required'
                            }
                        }}
                        render={({field: {value, onChange}}) => (
                            <div className="w-full col-span-3 flex flex-col gap-2">
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    value={value}
                                    onChange={onChange}
                                    disabled={isCreatingPayment}
                                />
                                <FormError message={errors.mode?.message}/>
                            </div>
                        )}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Paid On *
                    </Label>
                    <Controller
                        control={control}
                        name="paidOn"
                        rules={{
                            required: {
                                value: true,
                                message: 'Payment Date is required'
                            }
                        }}
                        render={({field: {value, onChange}}) => (
                            <div className="w-full col-span-3 flex flex-col gap-2">
                                <FlowDatePicker value={value} onChange={onChange}/>
                                <FormError message={errors.paidOn?.message}/>
                            </div>
                        )}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Particulars
                    </Label>
                    <Controller
                        control={control}
                        name="particulars"
                        render={({field: {value, onChange}}) => (
                            <>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    value={value}
                                    onChange={onChange}
                                    disabled={isCreatingPayment}
                                />
                            </>
                        )}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right text-nowrap">
                        More particulars
                    </Label>
                    <Checkbox checked={addParticulars} onCheckedChange={toggleShowParticulars} />
                </div>

                {addParticulars && (
                    <>
                        {particularFields.map(({ name, label }) => (
                            <div className="grid grid-cols-4 items-center gap-4" key={name}>
                                <Label htmlFor={name} className="text-right">
                                    {label}
                                </Label>
                                <Controller
                                    control={control}
                                    name={`detailedParticulars.${name}`}
                                    render={({ field: { value, onChange } }) => (
                                        <Input
                                            id={name}
                                            type="number"
                                            className="col-span-3"
                                            value={value ?? ''}
                                            onChange={e => onChange(Number(e.target.value))}
                                            disabled={isCreatingPayment}
                                        />
                                    )}
                                />
                            </div>
                        ))}
                    </>
                )}
            </div>
            <DialogFooter className="w-full flex sm:justify-center">
                <Button
                    type="submit"
                    className="bg-defaultOrange"
                    onClick={handleSubmit(create)}
                    disabled={isCreatingPayment}
                >
                    {isCreatingPayment ? (
                        <Spinner/>
                    ) : (
                        'Pay'
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default PayFeeDialog;