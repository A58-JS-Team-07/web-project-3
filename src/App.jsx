import "./App.css";
import Home from "./views/Home/Home";
import Header from "./components/Frame/Header/Header";
import SideMenu from "./components/Frame/SideMenu/SideMenu";
import Footer from "./components/Frame/Footer/Footer";

function App() {
  return (
    <div className="flex h-screen"> {/* Set the height of the flex container to full screen */}
      <div className="left w-1/6 bg-primary">
        <SideMenu />
      </div>
      <div className="right w-5/6 flex flex-col"> {/* Make the right section a flex container */}
        <Header />
        <div className="overflow-auto flex-grow"> {/* Make the content area scrollable */}
          <Home />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
