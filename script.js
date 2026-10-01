// Alternar entre as páginas
function navigate(pageId) {
  const pages = document.querySelectorAll('.page-section');
  pages.forEach(page => page.style.display = 'none');

  const selectedPage = document.getElementById(`page-${pageId}`);
  if (selectedPage) {
    selectedPage.style.display = 'block';
  }
}

// Alternar entre frente e costas do manequim
let viewMode = 'front';
function toggleViewMode() {
  const img = document.getElementById('manequim-img');
  const btn = document.getElementById('btn-toggle');

  if (viewMode === 'front') {
    viewMode = 'back';
    img.src = 'assets/manequim-costa.png';
    btn.textContent = 'Ver Frente';
  } else {
    viewMode = 'front';
    img.src = 'assets/manequim-frente.png';
    btn.textContent = 'Ver Costas';
  }
}
function salvarLook() {
  alert('Look salvo com sucesso!');
}

function selectCategory(categoryName) {
  const display = document.getElementById('items-display');
  display.innerHTML = `<p style="color: #38bdf8; font-weight: bold;">Exibindo peças para: ${categoryName.toUpperCase()}</p>`;
}