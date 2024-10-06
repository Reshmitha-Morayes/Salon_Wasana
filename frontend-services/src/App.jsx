import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Services from './Services'
import CreateServices from './CreateServices'
import UpdateServices from './UpdateServices'
import ModifyServices from './ModifyServices'
import ServiceHomeScreen from './ServiceHomeScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Services />}></Route>
          <Route path='/createService' element={<CreateServices />}></Route>
          <Route path='/updateService/:id' element={<UpdateServices />}></Route>
          <Route path='/modifyTableService' element={<ModifyServices />}></Route>
          <Route path='/ServiceHomeScreen' element={<ServiceHomeScreen />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
