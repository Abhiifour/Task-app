import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Dashboard from "./pages/dashboard"
import New from "./pages/new"
import { Toaster } from "react-hot-toast"
import AnalysisPage from "./pages/Analysis"
import { User } from "./pages/User"
import { useRecoilValue } from "recoil"
import { userState } from "./features/userAtom"

function App() {
  
  const user = useRecoilValue(userState)
  return (
   <div className="">
    <Toaster/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/user" element={<User />} />
      {user.token ? (
         <>
          
         <Route path="/tasklist" element={<Dashboard />} />
         <Route path="/analysis" element={<AnalysisPage />} />
         <Route path="/task" element={<New />} />
       </>
       
      ) : (
        <Route path="*" element={<Home />} />
      )}
    

    </Routes>
   </div>
  )
}

export default App
