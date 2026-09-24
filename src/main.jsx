import React, { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import html2canvas from "html2canvas";
import "./styles.css";

/* =========================================
   CATÁLOGO COM ESTILOS E IMAGENS PNG
========================================= */
const garmentCatalog = [
  // ESTILO VINTAGE
  {
    id: "hat-vintage",
    name: "Chapéu de Aba Larga",
    category: "hat",
    style: "vintage",
    image: "/assets/hat-vintage.png",
  },
  {
    id: "dress-vintage",
    name: "Vestido Romântico",
    category: "top",
    style: "vintage",
    image: "/assets/dress-vintage.png",
  },
  // ESTILO STREETWEAR
  {
    id: "hoodie-street",
    name: "Moletom Oversized",
    category: "top",
    style: "streetwear",
    image: "/assets/hoodie.png",
  },
  {
    id: "cargo-street",
    name: "Calça Cargo",
    category: "bottom",
    style: "streetwear",
    image: "/assets/cargo.png",
  },
  // ESTILO GÓTICO
  {
    id: "skirt-gothic",
    name: "Saia Longa de Veludo",
    category: "bottom",
    style: "gotico",
    image: "/assets/longskirt.png",
  },
  {
    id: "boots-gothic",
    name: "Bota Tratorada",
    category: "shoes",
    style: "gotico",
    image: "/assets/boots.png",
  },
];

/* =========================================
   COMPONENTE DO MANEQUIM (STAGE)
========================================= */
function FashionCroquis({ outfit, viewMode, croquisRef }) {
  // Define qual base carregar (frente ou costas)
  const bodyImage =
    viewMode === "front"
      ? "/src/assets/croqui-frente.png"
      : "/src/assets/croqui-costas.png";

  return (
    <div className="croquis-container" ref={croquisRef}>
      {/* Corpo Base */}
      <img src={bodyImage} alt="Manequim Base" className="layer layer-body" />

      {/* Camada das Peças Selecionadas */}
      {outfit.bottom && (
        <img src={outfit.bottom.image} alt="" className="layer layer-bottom" />
      )}
      {outfit.top && (
        <img src={outfit.top.image} alt="" className="layer layer-top" />
      )}
      {outfit.shoes && (
        <img src={outfit.shoes.image} alt="" className="layer layer-shoes" />
      )}
      {outfit.hat && (
        <img src={outfit.hat.image} alt="" className="layer layer-hat" />
      )}
    </div>
  );
}

/* =========================================
   APLICAÇÃO PRINCIPAL
========================================= */
function App() {
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [viewMode, setViewMode] = useState("front"); // 'front' ou 'back'
  const [outfit, setOutfit] = useState({
    hat: null,
    top: null,
    bottom: null,
    shoes: null,
  });

  const croquisRef = useRef(null);

  // Alterna vestir/retirar peça
  function togglePiece(item) {
    setOutfit((prev) => ({
      ...prev,
      [item.category]: prev[item.category]?.id === item.id ? null : item,
    }));
  }

  // Função para exportar a imagem
  async function downloadOutfit() {
    if (!croquisRef.current) return;
    const canvas = await html2canvas(croquisRef.current);
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "meu-look-croqui.png";
    link.click();
  }

  // Filtragem dos itens pelo estilo selecionado
  const filteredItems =
    selectedStyle === "all"
      ? garmentCatalog
      : garmentCatalog.filter((item) => item.style === selectedStyle);

  return (
    <div className="app-container">
      {/* PAINEL ESQUERDO: CROQUI + AÇÕES */}
      <div className="croquis-stage-wrapper">
        <FashionCroquis
          outfit={outfit}
          viewMode={viewMode}
          croquisRef={croquisRef}
        />

        <div className="stage-actions">
          <button
            className="btn-action"
            onClick={() =>
              setViewMode(viewMode === "front" ? "back" : "front")
            }
          >
            🔄 Girar ({viewMode === "front" ? "Frente" : "Costas"})
          </button>

          <button className="btn-action" onClick={downloadOutfit}>
            💾 Salvar Look
          </button>
        </div>
      </div>

      {/* PAINEL DIREITO: FILTROS + CATÁLOGO */}
      <div className="catalog-container">
        <h2>Provador Virtual</h2>

        {/* Filtro por Estilo */}
        <div className="filter-bar">
          <button
            className={`btn-filter ${selectedStyle === "all" ? "active" : ""}`}
            onClick={() => setSelectedStyle("all")}
          >
            Todos
          </button>
          <button
            className={`btn-filter ${selectedStyle === "vintage" ? "active" : ""}`}
            onClick={() => setSelectedStyle("vintage")}
          >
            Vintage
          </button>
          <button
            className={`btn-filter ${selectedStyle === "streetwear" ? "active" : ""}`}
            onClick={() => setSelectedStyle("streetwear")}
          >
            Streetwear
          </button>
          <button
            className={`btn-filter ${selectedStyle === "gotico" ? "active" : ""}`}
            onClick={() => setSelectedStyle("gotico")}
          >
            Gótico
          </button>
        </div>

        {/* Listagem das peças */}
        <div className="cards-grid">
          {filteredItems.map((item) => {
            const isWearing = outfit[item.category]?.id === item.id;
            return (
              <div
                key={item.id}
                className={`garment-card ${isWearing ? "active" : ""}`}
                onClick={() => togglePiece(item)}
              >
                <img src={item.image} alt={item.name} />
                <strong>{item.name}</strong>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================
   RENDERIZAÇÃO
========================================= */
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);