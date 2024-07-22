
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoutes from './Routes/userRoutes';


import { Toaster } from 'react-hot-toast';
import './index.css'
import AdminRoutes from './Routes/adminRoutes';

function App() {
  

  return (
<>
<Router>
<Routes>
   <Route path="/admin/*" element={<AdminRoutes/>} />
   <Route path="/*" element={<UserRoutes/>} />
  
</Routes>
</Router>
 <Toaster/>

</>
  )
}

export default App
