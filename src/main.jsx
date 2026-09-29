import React, { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "./styles.css";

import manequimFrente from "./assets/manequim-frente.png";
import manequimCosta from "./assets/manequim-costa.png";

/* ===================================================
   COMPONENTE MANEQUIM (CROQUI)
=================================================== */
function FashionCroquis({ outfit, viewMode, croquisRef }) {
  const bodyImage = viewMode === "front" ? manequimFrente : manequimCosta;

  return (
    <div className="croquis-container" ref={croquisRef}>
      <img src={bodyImage} alt="Manequim Base" className="layer layer-body" />
      {outfit &&
        Object.values(outfit).map(
          (item) =>
            item && (
              <img
                key={item.id}
                src={item.image}
                alt={item.name}
                className={`layer layer-${item.category}`}
              />
            )
        )}
    </div>
  );
}

/* ===================================================
   PÁGINA 1: INÍCIO
=================================================== */
function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <button className="btn-primary" onClick={() => navigate("/provador")}>
        Ir para o Provador Virtual
      </button>
    </div>
  );
}

/* ===================================================
   PÁGINA 2: PROVADOR VIRTUAL
=================================================== */
function ProvadorPage({ onSaveOutfit }) {
  const [outfit, setOutfit] = useState({});
  const [viewMode, setViewMode] = useState("front");
  const croquisRef = useRef(null);

  function toggleViewMode() {
    setViewMode((prev) => (prev === "front" ? "back" : "front"));
  }

  async function downloadOutfit() {
    if (!croquisRef.current) return;
    const canvas = await html2canvas(croquisRef.current);
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "meu-look-be-fashion.png";
    link.click();
  }

  return (
    <div className="provador-layout">
      {/* PAINEL ESQUERDO: CROQUI E BOTÕES */}
      <div className="croqui-panel">
        <FashionCroquis outfit={outfit} viewMode={viewMode} croquisRef={croquisRef} />
        <div className="controls">
          <button onClick={toggleViewMode} className="btn-toggle">
            {viewMode === "front" ? "Ver Costas" : "Ver Frente"}
          </button>
          <button onClick={() => onSaveOutfit(outfit)} className="btn-save">
            Salvar Look
          </button>
          <button onClick={downloadOutfit} className="btn-download">
            Baixar Look
          </button>
        </div>
      </div>

      {/* PAINEL DIREITO: ÁREA RESERVADA */}
      <div className="catalog-panel">
        <p style={{ color: "var(--blue-sky)", textAlign: "center", paddingTop: "20px" }}>
          Área reservada para a nova coleção.
        </p>
      </div>
    </div>
  );
}

/* ===================================================
   PÁGINA 3: MEUS LOOKS
=================================================== */
function SavedLooksPage() {
  return (
    <div className="saved-container">
      <h2>Meus Looks Guardados</h2>
      <p>Aqui você poderá ver todos os seus looks salvos e incompletos.</p>
    </div>
  );
}

/* ===================================================
   ESTRUTURA PRINCIPAL COM NAVBAR
=================================================== */
function App() {
  const [savedLooks, setSavedLooks] = useState([]);

  function handleSaveOutfit(currentOutfit) {
    setSavedLooks((prev) => [...prev, currentOutfit]);
    alert("Look salvo com sucesso!");
  }

  return (
    <BrowserRouter>
      <div className="site-wrapper">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              Be Fashion
            </Link>
            <div className="navbar-links">
              <Link to="/">Início</Link>
              <Link to="/provador">Provador Virtual</Link>
              <Link to="/guardados">Meus Looks</Link>
            </div>
          </div>
        </nav>

        <div className="app-container">
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/provador" element={<ProvadorPage onSaveOutfit={handleSaveOutfit} />} />
              <Route path="/guardados" element={<SavedLooksPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);