import Gallery from "./Components/GalleryComponent";
import Navbar from "./Components/NavbarComponent";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <main className="bg-gray-100 dark:bg-gray-900 h-dvh">
      <SearchProvider>
        <Navbar />
        <Gallery />
      </SearchProvider>
    </main>
  );
}

export default App;
