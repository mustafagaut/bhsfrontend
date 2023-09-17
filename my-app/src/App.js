
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails';
import CreateStudent from './components/CreateStudent';
import LoginPage from './components/LoginPage';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditStudent from './components/EditStudent';


function App() {
  return (
    <div className="App">
      <Header/>
      
      
      <Routes>
        <Route path="/student" element={<StudentList/>}>

        </Route>
        <Route path="/login" element={<LoginPage/>}>

        </Route>
        <Route path="/details/:id" element={<StudentDetails/>}>
        </Route>
        <Route path="/addStudent" element={<CreateStudent/>}>
        </Route>
        <Route path="/editStudent/:id" element={<EditStudent/>}>
        </Route>
      </Routes>
    
    <ToastContainer />
      <Footer/>
    </div>
  );
}

export default App;
