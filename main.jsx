import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Heart,
  Menu,
  Palette,
  RotateCcw,
  Save,
  Settings,
  Shirt,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import "./styles.css";

/* =========================================
   ESTILOS
========================================= */

/* ================================
   ADICIONE ESTE BLOCO NO SEU main.jsx
   Substitua o componente antigo FemaleDoll
================================ */

const garmentCatalog = {
  blusas: [
    {
      id: "hoodie",
      name: "Moletom oversized",
      color: "#315b8f",
      description: "Capuz, cordões e bolso frontal",
    },
    {
      id: "babytee",
      name: "Baby tee metalizada",
      color: "#d997c9",
      description: "Modelagem curta com brilho Y2K",
    },
    {
      id: "corset",
      name: "Corset de veludo",
      color: "#35243f",
      description: "Estruturado com amarração",
    },
    {
      id: "laceblouse",
      name: "Blusa de renda",
      color: "#f3d5dc",
      description: "Gola delicada e laço frontal",
    },
    {
      id: "whiteshirt",
      name: "Camisa branca",
      color: "#f4f2eb",
      description: "Colarinho, botões e punhos",
    },
  ],

  partes: [
    {
      id: "cargo",
      name: "Calça cargo",
      color: "#315e91",
      description: "Modelagem ampla com bolsos",
    },
    {
      id: "miniskirt",
      name: "Mini saia plissada",
      color: "#c66e9f",
      description: "Pregas e cintura alta",
    },
    {
      id: "longskirt",
      name: "Saia longa gótica",
      color: "#211a2e",
      description: "Veludo escuro com fenda",
    },
    {
      id: "tulleskirt",
      name: "Saia de tule",
      color: "#f2c9d8",
      description: "Camadas leves e românticas",
    },
    {
      id: "straightjeans",
      name: "Jeans reto",
      color: "#aac4dd",
      description: "Corte clássico e versátil",
    },
  ],

  calcados: [
    {
      id: "sneakers",
      name: "Tênis chunky",
      color: "#e8e2d8",
      description: "Solado alto e cadarços",
    },
    {
      id: "boots",
      name: "Bota tratorada",
      color: "#211c2b",
      description: "Cano alto e solado robusto",
    },
    {
      id: "heels",
      name: "Scarpin delicado",
      color: "#a74e78",
      description: "Salto fino e acabamento feminino",
    },
    {
      id: "loafers",
      name: "Mocassim clássico",
      color: "#815536",
      description: "Couro com fivela dourada",
    },
  ],

  acessorios: [
    {
      id: "bag",
      name: "Bolsa baguette",
      color: "#d17caa",
      description: "Alça curta e formato compacto",
    },
    {
      id: "glasses",
      name: "Óculos futurista",
      color: "#91cfe1",
      description: "Lentes coloridas estilo Y2K",
    },
    {
      id: "choker",
      name: "Choker dourada",
      color: "#d9ac55",
      description: "Corrente fina e delicada",
    },
    {
      id: "ribbon",
      name: "Laço de cabelo",
      color: "#e891a8",
      description: "Laço romântico de cetim",
    },
  ],
};

/* ================================
   CORPO-BASE DO CROQUIS
================================ */

function CroquisBody() {
  return (
    <>
      <div className="croquis-balance-line" />

      <div className="croquis-hair" />

      <div className="croquis-head">
        <span className="croquis-eye eye-left" />
        <span className="croquis-eye eye-right" />
        <span className="croquis-lips" />
      </div>

      <div className="croquis-neck" />

      <div className="croquis-torso-base" />

      <div className="croquis-arm croquis-arm-left" />
      <div className="croquis-arm croquis-arm-right" />

      <div className="croquis-leg croquis-leg-left" />
      <div className="croquis-leg croquis-leg-right" />
    </>
  );
}

/* ================================
   BLUSAS
================================ */

function BlouseLayer({ type }) {
  if (type === "hoodie") {
    return (
      <div className="garment-layer blouse-layer hoodie-layer">
        <span className="hoodie-hood" />
        <span className="hoodie-string hoodie-string-left" />
        <span className="hoodie-string hoodie-string-right" />
        <span className="hoodie-pocket" />
      </div>
    );
  }

  if (type === "babytee") {
    return (
      <div className="garment-layer blouse-layer babytee-layer">
        <span className="babytee-collar" />
        <span className="babytee-shine" />
      </div>
    );
  }

  if (type === "corset") {
    return (
      <div className="garment-layer blouse-layer corset-layer">
        <span className="corset-bust-line" />
        <span className="corset-lacing" />
        <span className="corset-bone corset-bone-left" />
        <span className="corset-bone corset-bone-right" />
      </div>
    );
  }

  if (type === "laceblouse") {
    return (
      <div className="garment-layer blouse-layer laceblouse-layer">
        <span className="lace-collar" />
        <span className="lace-bow" />
        <span className="lace-cuff lace-cuff-left" />
        <span className="lace-cuff lace-cuff-right" />
      </div>
    );
  }

  if (type === "whiteshirt") {
    return (
      <div className="garment-layer blouse-layer whiteshirt-layer">
        <span className="shirt-collar shirt-collar-left" />
        <span className="shirt-collar shirt-collar-right" />
        <span className="shirt-placket" />
        <span className="shirt-cuff shirt-cuff-left" />
        <span className="shirt-cuff shirt-cuff-right" />
      </div>
    );
  }

  return null;
}

/* ================================
   PARTES DE BAIXO
================================ */

function BottomLayer({ type }) {
  if (type === "cargo") {
    return (
      <div className="garment-layer bottom-layer cargo-layer">
        <span className="cargo-center-seam" />
        <span className="cargo-pocket cargo-pocket-left" />
        <span className="cargo-pocket cargo-pocket-right" />
      </div>
    );
  }

  if (type === "miniskirt") {
    return (
      <div className="garment-layer bottom-layer miniskirt-layer">
        <span className="skirt-waistband" />
        <span className="skirt-pleat pleat-one" />
        <span className="skirt-pleat pleat-two" />
        <span className="skirt-pleat pleat-three" />
        <span className="skirt-pleat pleat-four" />
      </div>
    );
  }

  if (type === "longskirt") {
    return (
      <div className="garment-layer bottom-layer longskirt-layer">
        <span className="longskirt-slit" />
        <span className="longskirt-fold fold-left" />
        <span className="longskirt-fold fold-right" />
      </div>
    );
  }

  if (type === "tulleskirt") {
    return (
      <div className="garment-layer bottom-layer tulleskirt-layer">
        <span className="tulle-layer tulle-one" />
        <span className="tulle-layer tulle-two" />
        <span className="tulle-layer tulle-three" />
      </div>
    );
  }

  if (type === "straightjeans") {
    return (
      <div className="garment-layer bottom-layer jeans-layer">
        <span className="jeans-waistband" />
        <span className="jeans-seam jeans-seam-left" />
        <span className="jeans-seam jeans-seam-right" />
        <span className="jeans-pocket jeans-pocket-left" />
        <span className="jeans-pocket jeans-pocket-right" />
      </div>
    );
  }

  return null;
}

/* ================================
   CALÇADOS
================================ */

function ShoesLayer({ type }) {
  if (!type) {
    return null;
  }

  return (
    <>
      <div className={`shoe-layer shoe-layer-left ${type}`} />
      <div className={`shoe-layer shoe-layer-right ${type}`} />
    </>
  );
}

/* ================================
   ACESSÓRIOS
================================ */

function AccessoryLayer({ type }) {
  if (type === "bag") {
    return (
      <div className="accessory-layer bag-layer">
        <span className="bag-handle" />
      </div>
    );
  }

  if (type === "glasses") {
    return (
      <div className="accessory-layer glasses-layer">
        <span />
        <span />
      </div>
    );
  }

  if (type === "choker") {
    return <div className="accessory-layer choker-layer" />;
  }

  if (type === "ribbon") {
    return <div className="accessory-layer ribbon-layer" />;
  }

  return null;
}

/* ================================
   NOVO CROQUIS
================================ */

function FashionCroquis({ outfit }) {
  return (
    <div className="croquis-stage">
      <div className="croquis-aura" />

      <div className="fashion-croquis">
        <CroquisBody />

        {outfit?.blusas && (
          <BlouseLayer type={outfit.blusas.id} />
        )}

        {outfit?.partes && (
          <BottomLayer type={outfit.partes.id} />
        )}

        {outfit?.calcados && (
          <ShoesLayer type={outfit.calcados.id} />
        )}

        {outfit?.acessorios && (
          <AccessoryLayer
            type={outfit.acessorios.id}
          />
        )}
      </div>

      <div className="croquis-caption">
        <strong>Croquis de moda</strong>
        <span>Selecione as peças para vestir</span>
      </div>
    </div>
  );
}

/* ================================
   ESTADO DO LOOK
================================ */

function createEmptyOutfit() {
  return {
    blusas: null,
    partes: null,
    calcados: null,
    acessorios: null,
  };
}

function wearPiece(category, piece, setOutfit) {
  setOutfit((currentOutfit) => ({
    ...currentOutfit,
    [category]: piece,
  }));
}

function removePiece(category, setOutfit) {
  setOutfit((currentOutfit) => ({
    ...currentOutfit,
    [category]: null,
  }));
}

/* ================================
   CARD DE PEÇA
================================ */

function GarmentCard({
  piece,
  category,
  outfit,
  setOutfit,
}) {
  const isWearing =
    outfit?.[category]?.id === piece.id;

  function togglePiece() {
    if (isWearing) {
      removePiece(category, setOutfit);
    } else {
      wearPiece(category, piece, setOutfit);
    }
  }

  return (
    <button
      className={`garment-card ${
        isWearing ? "garment-card-active" : ""
      }`}
      onClick={togglePiece}
    >
      <span
        className={`garment-thumbnail garment-thumbnail-${piece.id}`}
        style={{ "--piece-color": piece.color }}
      />

      <strong>{piece.name}</strong>

      <small>
        {isWearing
          ? "Clique para retirar"
          : "Clique para vestir"}
      </small>
    </button>
  );
}

/* ================================
   USO NO LOOKBUILDER
================================ */

/*
Substitua o componente de visualização antigo por:

<FashionCroquis outfit={outfit} />

E, dentro do componente que controla o look, use este estado:

const [outfit, setOutfit] = useState(
  createEmptyOutfit()
);

Para vestir uma peça:

wearPiece("blusas", piece, setOutfit);

Para retirar uma peça:

removePiece("blusas", setOutfit);

Exemplo para renderizar os cards:

{garmentCatalog.blusas.map((piece) => (
  <GarmentCard
    key={piece.id}
    piece={piece}
    category="blusas"
    outfit={outfit}
    setOutfit={setOutfit}
  />
))}
*/

createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);