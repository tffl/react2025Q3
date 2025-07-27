import { Routes, Route } from "react-router-dom";

import { PageAbout } from "./pages/PageAbout/PageAbout";
import { PageHome } from "./pages/PageHome/PageHome";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { PageDetailView } from "./pages/PageDetailView/PageDetailView";

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