import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout"
import HomePage from "./pages/Home/Home"

export default function Home() {
  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="expenses" element={<HomePage />} />
          <Route path="invoices" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}