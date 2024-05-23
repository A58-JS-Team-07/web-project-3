import "./App.css";
import Home from "./views/Home/Home";
import Header from "./components/Frame/Header/Header";
import SideMenu from "./components/Frame/SideMenu/SideMenu";
import Footer from "./components/Frame/Footer/Footer";

function App() {
  return (
    <div className="flex">
      <div className="left w-1/6 bg-primary">
        <SideMenu />
      </div>
      <div className="right w-5/6">
        <Header />
        <Home />
        <Footer />
      </div>
    </div>
  );
}

export default App;
