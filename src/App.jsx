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
import { app, auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "./services/users.service";
import Loader from "./components/Loader/Loader";
import Authenticated from "./hoc/Authenticated";

function App() {
  const [appState, setAppState] = useState({ user: null, userData: null });

  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(false);

  if (appState.user !== user) {
    setAppState({ ...appState, user });
  }

  useEffect	(() => {
    if (!appState.user) {
      return;
    }

    setLoading(true);

    getUserData(appState.user.uid).then((snapshot) => {
      console.log('snapshot:', snapshot.val());
      const userData = Object.values(snapshot.val())[0];
      setAppState({ ...appState, userData });

      setLoading(false);
    })
    .catch((error) => console.error('Error getting user data:', error));

  }, [appState.user]);

  return (
    <>
      <AppContext.Provider value={{ ...appState, setAppState }}>
        {!loading ? (
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
                {/* <Route path="/events/:id" element={<Authenticated><SingleEvent /></Authenticated>} /> */}
                <Route path="/my-calendar" element={<Authenticated><MyCalendar /></Authenticated>} />
                <Route path="/contacts-lists" element={<Authenticated><ContactsLists /></Authenticated>} />
                <Route path="/profile" element={<Authenticated><Profile /></Authenticated>} />
                <Route path="/admin-center" element={<Authenticated><AdminCenter /></Authenticated>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </div>
        </div>
        ) : (
          <Loader />
        )}
      </AppContext.Provider>
    </>
  );
}

export default App;
