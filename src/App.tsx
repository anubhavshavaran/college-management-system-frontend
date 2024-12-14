import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import AuthPage from "@/pages/AuthPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Dashboard from "@/pages/Dashboard.tsx";
import SchoolDash from "@/components/school/SchoolDash.tsx";
import Vouchers from "@/pages/Vouchers.tsx";
import Organization from "@/constants/Organization.ts";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0
        }
    }
});

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth" element={<AuthPage/>}/>
                        <Route path="/school" element={<Dashboard />}>
                            <Route path="" element={<Navigate to="dash"/> } />
                            <Route path="dash" element={<SchoolDash />}/>
                            <Route path="students" element={<p>students</p>} />
                            <Route path="fees" element={<p>fees</p>} />
                            <Route path="docs" element={<p>docs</p>} />
                            <Route path="vouchers" element={<Vouchers organization={Organization.SCHOOL} />} />
                        </Route>
                        <Route path="/college" element={<Dashboard />}>
                            <Route path="" element={<Navigate to="dash"/> } />
                            <Route index path="dash" element={<p>dashboard</p>}/>
                            <Route path="students" element={<p>students</p>} />
                            <Route path="fees" element={<p>fees</p>} />
                            <Route path="docs" element={<p>docs</p>} />
                            <Route path="vouchers" element={<Vouchers organization={Organization.COLLEGE} />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    )
}

export default App
