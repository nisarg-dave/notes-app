import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./components/NewNote";

function App() {
  return (
    <div className="m-4">
      <Routes>
        <Route path="/" element={<h1 className="text-3xl">Hello</h1>} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
