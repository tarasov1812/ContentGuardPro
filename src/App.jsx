import React from 'react';
import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements,
} from 'react-router-dom';
import MenuBar from "./components/MenuBar.jsx";
import Tasks from "./components/Tasks.jsx";
import Trunk from "./components/Trunk.jsx"
import "./App.css";
import Restricions from './components/Restrictions.jsx';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MenuBar />}>
      <Route index element={<Tasks />} />
      <Route path="task" element={<Tasks />} />
      <Route path="restrictions" element={<Restricions />} />
      <Route path="analytic" element={<Trunk />} />
      <Route path="settings" element={<Trunk />} />
    </Route>,
));

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
