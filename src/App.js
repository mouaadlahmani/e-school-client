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
      <I18nextProvider i18n={i18next}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/formation' element={<Formation />} />
          <Route path='/admin' element={<Login />} />
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
        </Routes>
      </I18nextProvider >
    </>
  );
}

export default App;
