import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./views/Home/Home";
import Header from "./components/Frame/Header/Header";
import SideMenu from "./components/Frame/SideMenu/SideMenu";
import Footer from "./components/Frame/Footer/Footer";
import NotFound from "./views/NotFound/NotFound";
import AdminCenter from "./views/AdminCenter/AdminCenter";
import ContactsLists from "./views/ContactsLists/ContactsLists";
import AllEvents from "./views/Events/AllEvents/AllEvents";
import SingleEvent from "./views/Events/SingleEvent/SingleEvent";
import LoginRegister from "./views/LoginRegister/LoginRegister";
import MyCalendar from "./views/MyCalendar/MyCalendar";
import Profile from "./views/Profile/Profile";
import { AppContext } from "./context/AppContext";
import { LoaderProvider } from "./hoc/LoaderProvider";
import { auth, db } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import Authenticated from "./hoc/Authenticated";
import { onValue, ref } from "firebase/database";
import AdminPageProtect from "./hoc/AdminLogic/AdminPageProtect/AdminPageProtect";
import { logoutUser } from "./services/auth.service";
import { toast } from "react-toastify";

function App() {
  const [user] = useAuthState(auth);
  const [appState, setAppState] = useState({ user: null, userData: null });

  useEffect(() => {
    if (appState.user !== user) {
      setAppState((prevState) => ({ ...prevState, user }));
    }
  }, [user, appState.user]);

  useEffect(() => {
    if (!appState.user) {
      return;
    }
    try {
      return onValue(
        ref(db, `users/${appState.user.displayName}`),
        (snapshot) => {
          const userData = snapshot.val();
          setAppState({ ...appState, userData });
        }
      );
    } catch (error) {
      console.error("App.jsx > useEffect set userData:", error);
      throw error;
    }
  }, [appState.user]);

  useEffect(() => {
    const handleBannedUser = async () => {
      if (appState.userData?.isBanned) {
        await logoutUser();
        setAppState({ user: null, userData: null });
        toast.error("You have been banned! Please contact the administrator.");
      }
    };
    handleBannedUser();
  }, [appState.userData]);

  return (
    <>
      <LoaderProvider>
        <AppContext.Provider value={{ ...appState, setAppState }}>
          <div className="flex h-screen">
            <div className="left w-1/6 bg-primary">
              <SideMenu />
            </div>
            <div className="right w-5/6 flex flex-col">
              <Header />
              <div className="overflow-auto flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<LoginRegister />} />
                  <Route path="/events" element={<AllEvents />} />
                  <Route
                    path="/events/:id"
                    element={
                      <Authenticated>
                        <SingleEvent />
                      </Authenticated>
                    }
                  />
                  <Route
                    path="/my-calendar"
                    element={
                      <Authenticated>
                        <MyCalendar />
                      </Authenticated>
                    }
                  />
                  <Route
                    path="/contacts-lists"
                    element={
                      <Authenticated>
                        <ContactsLists />
                      </Authenticated>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Authenticated>
                        <Profile />
                      </Authenticated>
                    }
                  />
                  <Route
                    path="/admin-center"
                    element={
                      <Authenticated>
                        <AdminPageProtect>
                          <AdminCenter />
                        </AdminPageProtect>
                      </Authenticated>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </div>
            </div>
          </div>
        </AppContext.Provider>
      </LoaderProvider>
    </>
  );
}

export default App;
