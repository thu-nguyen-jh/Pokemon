import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import PokeList from "./extensions/Pokemon/containers/PokeListPage/PokeListPage";
import PokeDetail from "./extensions/Pokemon/containers/PokeDetailPage/PokeDetailPage";

import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition timeout={300} classNames="fade" key={location.key}>
        <Routes location={location}>
          <Route path="/" element={<PokeList />}></Route>
          <Route path="/pokemon/:id" element={<PokeDetail />}></Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
