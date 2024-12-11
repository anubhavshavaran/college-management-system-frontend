import {BrowserRouter, Route, Routes} from "react-router";
import AuthPage from "@/pages/AuthPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

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
                        <Route path="/school">
                            <Route path="dash" element={<p>Login success</p>}/>
                            <Route path=""/>
                            <Route path=""/>
                            <Route path=""/>
                        </Route>
                        <Route path="/college">
                            <Route path=""/>
                            <Route path=""/>
                            <Route path=""/>
                            <Route path=""/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    )
}

export default App
