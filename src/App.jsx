import React from 'react';
import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements,
} from 'react-router-dom';
import MenuBar from "./components/MenuBar.jsx";
import Tasks from "./components/Tasks.jsx"
import "./App.css";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MenuBar />}>
      <Route path="task" element={<Tasks />} />
      <Route path="restrictions" element={<MenuBar />} />
      <Route path="analytic" element={<MenuBar />} />
      <Route path="settings" element={<MenuBar />} />
    </Route>,
));

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
