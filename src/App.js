import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "../src/protectedRoutes/ProtectedRoutes"
import Home from './pages/Home';
import Country from './pages/Country';
import Levels from './pages/Levels';
import Subject from './pages/Subject';
import Title from './pages/Title';
import Dashboard from './pages/dashboard';
import Countries from './pages/admin/Countries';
import AdminCountryManagement from './pages/admin/AdminCountryManagement';
import i18next from 'i18next';
import global_ar from "../src/translitions/ar/global.json";
import global_fr from "../src/translitions/fr/global.json";
import { I18nextProvider } from 'react-i18next';
import Login from './pages/admin/login';
import Formation from './pages/Formation';
import Orientation from './pages/Orientation';
import Inscription from './pages/Inscription';
import Direct from './pages/Direct';
import Bac from './pages/offres/Bac';
import BacM from './pages/offres/BacM';
import Tronc from './pages/offres/Tronc';
import College from './pages/offres/College';
import Councours from './pages/offres/Councours';
import Applies from './pages/admin/Applies';
import Blog from './pages/blog/Blog';
import Article from './pages/blog/Article';
import FormationInscrire from './pages/FormationInscrire';
import Blogs from './pages/admin/Blogs';
import AddArticle from './pages/admin/AddArticle';
import Inscrires from './pages/admin/Inscires';
import Enseignant from './pages/Enseignant';
import ScrollToTop from './components/ScrollToTop';

i18next.init({
  interpolation: { escapeValue: false },
  lng: "fr",
  resources: {
    fr: {
      global: global_fr
    },
    ar: {
      global: global_ar
    },
  },
});

function App() {
  return (
    <>
      <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/enseignant' element={<Enseignant />} />
          <Route path='/inscription' element={<Inscription />} />
          <Route path='/inscrire' element={<FormationInscrire />} />
          <Route path='/applies' element={<Applies />} />
          <Route path='/inscriptions' element={<Inscrires />} />
          <Route path='/formation' element={<Formation />} />
          <Route path='/orientation' element={<Orientation />} />
          <Route path='/direct' element={<Direct />} />
          <Route path='/2bac' element={<Bac />} />
          <Route path='/1bac' element={<BacM />} />
          <Route path='/tronccommun' element={<Tronc />} />
          <Route path='/college' element={<College />} />
          <Route path='/councours' element={<Councours />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/admin' element={<Login />} />
          <Route path='/addarticle' element={<AddArticle />} />
          <Route path='/dashboard' element={
            <ProtectedRoute roles={['admin']}>
              <Dashboard />
            </ProtectedRoute>
          }></Route>
          <Route path='/countries' element={<Countries />} />
          <Route path='/country/:id' element={<Country />} />
          <Route path='/country/edit/:id' element={<AdminCountryManagement />} />
          <Route path='/level/:id' element={<Levels />} />
          <Route path='/subjects/:id' element={<Subject />} />
          <Route path='/title/:id' element={<Title />} />
          <Route path='/blog/:slug' element={<Article />} />
        </Routes>
    </>
  );
}

export default App;
