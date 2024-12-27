import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import AuthPage from "@/pages/AuthPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Dashboard from "@/pages/Dashboard.tsx";
import Vouchers from "@/pages/Vouchers.tsx";
import {OrganizationContextProvider} from "@/contexts/OrganizationContextProvider.tsx";
import {UserContextProvider} from "@/contexts/UserContextProvider.tsx";
import Home from "@/pages/Home.tsx";
import Students from "@/pages/Students.tsx";
import Users from "@/pages/Users.tsx";
import Fees from "@/pages/Fees.tsx";
import AddStudent from "@/pages/AddStudent.tsx";
import Student from "@/pages/Student.tsx";
import Documents from "@/pages/Documents.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    }
});

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <UserContextProvider>
                        <OrganizationContextProvider>
                            <Routes>
                                <Route path="/" element={<Navigate to="/auth" />} />
                                <Route path="/auth" element={<AuthPage/>}/>
                                <Route path="/school" element={<Dashboard/>}>
                                    <Route path="" element={<Navigate to="dash"/>}/>
                                    <Route path="dash" element={<Home/>}/>
                                    <Route path="students" element={<Students />}/>
                                    <Route path="students/:studentId" element={<Student />}/>
                                    <Route path="addStudent" element={<AddStudent />}/>
                                    <Route path="fees" element={<Fees />}/>
                                    <Route path="users" element={<Users />}/>
                                    <Route path="docs" element={<Documents />}/>
                                    <Route path="vouchers" element={<Vouchers/>}/>
                                </Route>
                                <Route path="/college" element={<Dashboard/>}>
                                    <Route path="" element={<Navigate to="dash"/>}/>
                                    <Route index path="dash" element={<Home/>}/>
                                    <Route path="students" element={<Students />}/>
                                    <Route path="students/:studentId" element={<Student />}/>
                                    <Route path="addStudent" element={<AddStudent />}/>
                                    <Route path="fees" element={<Fees />}/>
                                    <Route path="users" element={<Users />}/>
                                    <Route path="docs" element={<Documents />}/>
                                    <Route path="vouchers" element={<Vouchers/>}/>
                                </Route>
                            </Routes>
                        </OrganizationContextProvider>
                    </UserContextProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    )
}

export default App
