function navigate(pageId) {
  const pages = document.querySelectorAll('.page-section');
  pages.forEach(page => page.style.display = 'none');

  const selectedPage = document.getElementById(`page-${pageId}`);
  if (selectedPage) {
    selectedPage.style.display = 'block';
  }
}

let viewMode = 'front';

function toggleViewMode() {
  const img = document.getElementById('manequim-img');
  const btn = document.getElementById('btn-toggle');

  if (!img || !btn) return;

  if (viewMode === 'front') {
    viewMode = 'back';
    img.src = '/assets/manequim-costa.png'; 
    btn.textContent = 'Ver Frente';
  } else {
    viewMode = 'front';
    img.src = '/assets/manequim-frente.png'; 
    btn.textContent = 'Ver Costas';
  }
}

// Salvar look
function salvarLook() {
  alert('Look salvo com sucesso!');
}

// Seleção de categoria
function selectCategory(categoryName) {
  const display = document.getElementById('items-display');
  if (display) {
    display.innerHTML = `<p style="color: #38bdf8; font-weight: bold;">Exibindo peças para: ${categoryName.toUpperCase()}</p>`;
  }
}