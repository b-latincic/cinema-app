import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './Layout-styled';
import Footer from './components/shared/Footer/Footer';
import Header from './components/shared/Header/Header';
import GenresPage from './pages/GenresPage';
import MoviesPage from './pages/MoviesPage';


function App() {
  return (
    <BrowserRouter>
      <Header />
        <Layout>  
          <Routes>
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/genres' element={<GenresPage />} />
          </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
