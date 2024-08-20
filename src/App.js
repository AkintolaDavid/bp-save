import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loginpage } from "./Loginpage/Loginpage";
import { Signup } from "./Signup/Signup";
import { Landingpage } from "./Landingpage/Landingpage";
import { Accsetting } from "./Acc_setting/Accsetting";
import { DoctorLogin } from "./DoctorLogin/DoctorLogin";
import { Profile } from "./Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import ProtectedComponent from "./ProtectedComponent";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/landingpage" element={<Landingpage />} />
          <Route path="/doctorlogin" element={<DoctorLogin />} />
          <Route path="/acc_setting" element={<Accsetting />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route
            path="/protected"
            element={
              <PrivateRoute>
                <ProtectedComponent />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
