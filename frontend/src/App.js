import logo from "./logo.svg";

import "./vendors/bootstrap/bootstrap.min.css";
import "./vendors/fontawesome/css/all.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "./components/screens/signup.js";
import Login from "./components/screens/login.js";
import Profile from "./components/screens/profile.js";
import MemesSearch from "./components/screens/meme-search.js";
import Home from "./components/screens/home.js";
import { ProfileProvider } from "./components/contexts/profile-context";
import SecureRoute from "./components/secure-route.js";
import MemeDetails from "./components/screens/meme-details.js";
import NavigationSidebar from "./components/navbar";
import UserProfile from "./components/screens/user-profile";

function App() {
  return (
    <div className="container">
      <ProfileProvider>
        <BrowserRouter>
          <div className="row">
            <div className="col-2">
              <NavigationSidebar />
            </div>
            <div className="col-8">
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route
                    path="profile"
                    element={
                      <SecureRoute>
                        <Profile />
                      </SecureRoute>
                    }
                  />
                  <Route path="profile/:userID" element={<UserProfile />} />
                  <Route path="profile/signup" element={<SignUp />} />
                  <Route path="profile/login" element={<Login />} />
                  <Route path="meme-search" element={<MemesSearch />}>
                    <Route path=":memeSearch" element={<MemesSearch />} />
                  </Route>
                  <Route
                    path="meme-search/details/:memeID"
                    element={<MemeDetails />}
                  />
                </Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ProfileProvider>
    </div>
  );
}

export default App;
