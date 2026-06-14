import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotesPage from "./pages/NotesPage";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import ViewNote from "./pages/ViewNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
        <Route path="/note/:id" element={<ViewNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
