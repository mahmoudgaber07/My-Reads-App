import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Books } from "./components/Books";
import{SingleBook} from "./components/SingleBook"
import{NotFound} from "./components/404"
function App() {
  return (
    <div className='App'>
        <Routes>
          <Route path={'/'} element={<Layout/>} exact/> 
          <Route path={'/books/:id'} element={<SingleBook />} />
          <Route path={'/search'} element={<Books />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
