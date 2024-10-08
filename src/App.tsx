import { Route, Routes } from "react-router-dom";
import "./App.css";
import PokeList from "./extensions/Pokemon/containers/PokeListPage/PokeListPage";
import PokeDetail from "./extensions/Pokemon/containers/PokeDetailPage/PokeDetailPage";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes>
        <Route path="/" element={<PokeList />}></Route>
        <Route path="/pokemon/:id" element={<PokeDetail />}></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
