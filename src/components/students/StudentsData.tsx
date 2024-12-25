import {Button} from "@/components/ui/button.tsx";
import InfoCard from "@/components/ui/InfoCard.tsx";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useNavigate, useSearchParams} from "react-router";
import {useStudents} from "@/hooks/students.ts";
import Spinner from "@/components/ui/Spinner.tsx";
import SchoolStudentsTable from "@/components/students/SchoolStudentsTable.tsx";
import Organization from "@/constants/Organization.ts";
import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {format} from "date-fns";
import CollegeStudentsTable from "@/components/students/CollegeStudentsTable.tsx";

function StudentsData() {
    const navigate = useNavigate();
    const {organization} = useOrganization();
    const [searchParams] = useSearchParams();
    console.log(searchParams.get("cat"));
    const {data, isPending} = useStudents(organization);
    console.log(data);
    function navToAdd() {
        navigate(`/${organization}/addStudent`);
    }
    return (
        <div className="w-full flex flex-col gap-4">
            {isPending ? (
                <Spinner/>
            ) : (
                <>
                    <div className="flex gap-4">
                        <InfoCard label={"6th std students"} text={data.students.length}/>
                        <InfoCard label={"6th std students"} text={data.stats.males}/>
                        <InfoCard label={"6th std students"} text={data.stats.females}/>
                    </div>
                    <Button
                        onClick={navToAdd}
                        className="bg-defaultGray p-5 shadow-none border-[1.5px] border-gray-400 rounded-xl hover:bg-defaultGray w-fit">
                        <img src="/icons/plus.png" width={18} alt="Add Student"/>
                        <p className="text-lg text-black font-normal ">Add Student</p>
                    </Button>

                    <div className="w-full bg-defaultGray py-2 rounded-2xl flex justify-center">
                        {organization === Organization.SCHOOL ? (
                            <SchoolStudentsTable
                                data={data.students}
                                render={(student, key) => (
                                    <TableRow key={key}>
                                        <TableCell className="text-center">{key + 1}</TableCell>
                                        <TableCell className="text-center">{student.admissionNumber}</TableCell>
                                        <TableCell className="text-center">{student.name}</TableCell>
                                        <TableCell className="text-center">{student.rollNumber}</TableCell>
                                        <TableCell className="text-center">{student.gender?.toLocaleUpperCase()}</TableCell>
                                        <TableCell className="text-center">{student.dateOfBirth ? format(new Date(student.dateOfBirth), 'dd-MM-yyyy') : 'NIL'}</TableCell>
                                        <TableCell className="text-center">{student.dateOfAdmission ? format(new Date(student.dateOfAdmission), 'dd-MM-yyyy') : 'NIL'}</TableCell>
                                        <TableCell className="text-center">+91 {student.phoneNumber}</TableCell>
                                    </TableRow>
                                )}
                            />
                        ) : (
                            <CollegeStudentsTable
                                data={data.students}
                                render={(student, key) => (
                                    <TableRow key={key}>
                                        <TableCell className="text-center">{key + 1}</TableCell>
                                        <TableCell className="text-center">{student.admissionNumber}</TableCell>
                                        <TableCell className="text-center">{student.name}</TableCell>
                                        <TableCell className="text-center">{student.semester}</TableCell>
                                        <TableCell className="text-center">{student.rollNumber}</TableCell>
                                        <TableCell className="text-center">{student.gender?.toLocaleUpperCase()}</TableCell>
                                        <TableCell className="text-center">{student.dateOfBirth ? format(new Date(student.dateOfBirth), 'dd-MM-yyyy') : 'NIL'}</TableCell>
                                        <TableCell className="text-center">{student.dateOfAdmission ? format(new Date(student.dateOfAdmission), 'dd-MM-yyyy') : 'NIL'}</TableCell>
                                        <TableCell className="text-center">+91 {student.phoneNumber}</TableCell>
                                    </TableRow>
                                )}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default StudentsData;