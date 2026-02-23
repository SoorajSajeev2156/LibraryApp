import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import ExplorePage from "./pages/ExplorePage";
import TrendingBooksPage from "./pages/TrendingBooksPage";
import SearchPage from "./pages/SearchPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import MyLibraryPage from "./pages/MyLibraryPage";

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/trending" element={<TrendingBooksPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
        <Route path="/library" element={<MyLibraryPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  );
}

export default App;
