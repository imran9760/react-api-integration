import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginForm from './usercomponent/LoginForm';
import GetUserDetailList from './usercomponent/GetUserDetailList';
import AddUser from './usercomponent/AddUser';
import ProtectedRoute from './usercomponent/ProtectedRoute';

function App() {

  const token = localStorage.getItem('jwtToken');

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/userDetails" element={<GetUserDetailList/>} />
        <Route path='/adduser' element={<AddUser/>}/>
        <Route path="/users" element={
          <ProtectedRoute token={token}>
            <GetUserDetailList/>
          </ProtectedRoute>
        } />
        <Route path="*" element={<LoginForm/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
