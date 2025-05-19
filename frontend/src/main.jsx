import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './Components/MainPage.jsx'
import { CreateUser } from './Components/CreateUser.jsx'
import { UserLogin } from './Components/UserLogin.jsx'
import { Logado } from './Components/Logado.jsx'
import PrivateRoute from './Components/PrivateRoute.jsx'
import { CreateRecipe } from './Components/Receitas/CreateRecipe.jsx'
import { ListarReceitas } from './Components/Receitas/ListarReceitas.jsx';
import { Receita } from './Components/Receitas/Receita.jsx'
import { EditarReceita } from './Components/Receitas/EditarReceita.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>
  },
  {
    path: "/registrar",
    element: <CreateUser/>
  },{
    path: "/login",
    element: <UserLogin/>
  },
  {
    element: <PrivateRoute/>, 
    children: [
      {
        path: "/logado",
        element: <Logado/>
      }
    ]
  },{
    element: <PrivateRoute/>,
    children: [
      {
        path: "/criarReceita",
        element: <CreateRecipe/>
      }
    ]
  }, {
    element: <PrivateRoute/>,
    children: [
      {
        path: "/listarReceitas",
        element: <ListarReceitas/>
      }
    ]
  },{
    element: <PrivateRoute/>,
    children: [
      {
        path: "/receita/:id",
        element: <Receita/>
      }
    ]
  },{
    element: <PrivateRoute/>,
    children: [
      {
        path: "/editarReceita/:id",
        element: <EditarReceita/>
      }
    ]
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
