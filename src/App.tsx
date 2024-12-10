import {BrowserRouter, Route, Routes} from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/dashboard">

              </Route>
              <Route path="/signin" />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
