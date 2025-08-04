import { Routes, Route } from "react-router-dom";

import { PageAbout } from "./pages/PageAbout/PageAbout";
import { PageDetailView } from "./pages/PageDetailView/PageDetailView";
import { PageHome } from "./pages/PageHome/PageHome";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="/detailView" element={<PageDetailView />} />
        <Route path="*" element={<PageNotFound />} /> 
      </Routes>
    </div>
  );
}

export default App;