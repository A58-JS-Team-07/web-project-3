import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
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
            <Route path="/events/:id" element={<SingleEvent />} />
            <Route path="/my-calendar" element={<MyCalendar />} />
            <Route path="/contacts-lists" element={<ContactsLists />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-center" element={<AdminCenter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
