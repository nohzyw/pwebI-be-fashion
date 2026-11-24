let todasAsPecas = [];
let lookAtual = {};

const AJUSTES_CATEGORIAS = {
  calcados: { x: 0, y: 0, scaleX: 1, scaleY: 1, origin: 'center bottom' },
  chapeu: { x: 0, y: 0, scaleX: 1, scaleY: 1, origin: 'center top' },
  oculos: { x: 0, y: 1.5, scaleX: 1, scaleY: 1, origin: 'center top' },
  cabelo: { x: 0, y: 0, scaleX: 1, scaleY: 1, origin: 'center top' }
};

const AJUSTES_PECAS = {};

document.addEventListener('DOMContentLoaded', async () => {
  await carregarPecas();
  renderizarGuardaRoupa();
  renderizarLooksSalvos();
});

async function carregarPecas() {
  try {
    const res = await fetch('/api/pecas');
    const dados = await res.json();
    todasAsPecas = dados;
  } catch (err) {
    console.error('Erro ao carregar peças:', err);
  }
}

function corrigirUrlImagem(url) {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('/assets/')) return url;
  return `/assets/${url.replace(/^\/+/, '')}`;
}

function navigate(pageId) {
  const pages = document.querySelectorAll('.page-section');
  pages.forEach(page => page.style.display = 'none');

  const selectedPage = document.getElementById(`page-${pageId}`);
  if (selectedPage) {
    selectedPage.style.display = 'block';
  }

  if (pageId === 'wardrobe') renderizarGuardaRoupa();
  if (pageId === 'guardados') renderizarLooksSalvos();
}

function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function obterZoomMiniatura(categoria) {
  const cat = normalizar(categoria);
  if (cat.includes('chapeu') || cat.includes('oculos') || cat.includes('cabelo')) {
    return 'transform: scale(3.5); transform-origin: top center;';
  }
  if (cat.includes('calcado')) {
    return 'transform: scale(4.2); transform-origin: bottom center;';
  }
  return 'transform: scale(2.2); transform-origin: center;';
}

function obterAjusteCamada(nome, chaveCat) {
  const chaveNome = normalizar(nome);
  if (AJUSTES_PECAS[chaveNome]) return AJUSTES_PECAS[chaveNome];

  for (const [catKey, ajuste] of Object.entries(AJUSTES_CATEGORIAS)) {
    if (chaveCat.includes(catKey)) return ajuste;
  }

  return { x: 0, y: 0, scaleX: 1, scaleY: 1, origin: 'center center' };
}

async function selectCategory(categoryName) {
  const display = document.getElementById('items-display');
  if (!display) return;

  if (todasAsPecas.length === 0) {
    await carregarPecas();
  }

  const filtradas = todasAsPecas.filter(
    p => normalizar(p.categoria) === normalizar(categoryName)
  );

  let html = `<p style="color: #38bdf8; font-weight: bold; margin-bottom: 12px;">Exibindo peças para: ${categoryName.toUpperCase()}</p>`;

  if (filtradas.length === 0) {
    html += `<p style="color: #94a3b8; font-size: 0.9rem;">Nenhuma peça cadastrada nesta categoria.</p>`;
    display.innerHTML = html;
    return;
  }

  html += `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">`;
  filtradas.forEach(peca => {
    const imgSrc = corrigirUrlImagem(peca.imagemUrl);
    const zoomStyle = obterZoomMiniatura(peca.categoria);
    html += `
      <div onclick="vestirPeca('${peca.nome}', '${peca.categoria}', '${imgSrc}', ${peca.zIndex || 2})"
           style="background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 8px; cursor: pointer; text-align: center; overflow: hidden;">
        <div style="width: 70px; height: 70px; margin: 0 auto; overflow: hidden; display: flex; align-items: center; justify-content: center;">
          <img src="${imgSrc}" alt="${peca.nome}" style="width: 70px; height: 70px; object-fit: contain; ${zoomStyle}">
        </div>
        <p style="color: #f8fafc; font-size: 0.75rem; margin-top: 6px;">${peca.nome}</p>
      </div>
    `;
  });
  html += `</div>`;

  display.innerHTML = html;
}

function vestirPeca(nome, categoria, imagemUrl, zIndex) {
  const manequimImg = document.getElementById('manequim-img');
  if (!manequimImg) return;

  const container = manequimImg.parentElement;
  container.style.position = 'relative';

  const chaveCat = normalizar(categoria);
  const camadaId = `camada-${chaveCat}`;
  let camada = document.getElementById(camadaId);

  if (camada && camada.getAttribute('src') === imagemUrl) {
    camada.remove();
    delete lookAtual[chaveCat];
    return;
  }

  if (!camada) {
    camada = document.createElement('img');
    camada.id = camadaId;
    container.appendChild(camada);
  }

  const rectManequim = manequimImg.getBoundingClientRect();
  const rectContainer = container.getBoundingClientRect();
  const ajuste = obterAjusteCamada(nome, chaveCat);

  camada.src = imagemUrl;
  camada.style.position = 'absolute';
  camada.style.top = (rectManequim.top - rectContainer.top) + 'px';
  camada.style.left = (rectManequim.left - rectContainer.left) + 'px';
  camada.style.width = rectManequim.width + 'px';
  camada.style.height = rectManequim.height + 'px';
  camada.style.objectFit = 'contain';
  camada.style.pointerEvents = 'none';
  camada.style.zIndex = (normalizar(nome).includes('oculos') || chaveCat.includes('oculos')) ? 90 : (Number(zIndex) || 1) + 10;
  camada.style.transformOrigin = ajuste.origin;
  camada.style.transform = `translate(${ajuste.x}%, ${ajuste.y}%) scale(${ajuste.scaleX}, ${ajuste.scaleY})`;

  lookAtual[chaveCat] = { nome, categoria, imagemUrl, zIndex };
}

function limparTudo() {
  document.querySelectorAll('[id^="camada-"]').forEach(camada => camada.remove());
  lookAtual = {};
}

function renderizarGuardaRoupa() {
  const container = document.getElementById('wardrobe-list');
  if (!container) return;

  if (todasAsPecas.length === 0) {
    container.innerHTML = `<p style="color: #94a3b8;">Nenhuma peça cadastrada no momento.</p>`;
    return;
  }

  let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; max-width: 900px; margin: 20px auto;">`;
  todasAsPecas.forEach(peca => {
    const imgSrc = corrigirUrlImagem(peca.imagemUrl);
    const zoomStyle = obterZoomMiniatura(peca.categoria);
    html += `
      <div style="background: rgba(255,255,255,0.05); border: 1px solid #334155; border-radius: 12px; padding: 15px; text-align: center;">
        <div style="width: 100px; height: 100px; margin: 0 auto 10px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
          <img src="${imgSrc}" alt="${peca.nome}" style="width: 100px; height: 100px; object-fit: contain; ${zoomStyle}">
        </div>
        <h4 style="color: #f8fafc; font-size: 0.95rem; margin-bottom: 4px;">${peca.nome}</h4>
        <span style="color: #38bdf8; font-size: 0.8rem;">${peca.categoria}</span>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

function salvarLook() {
  const pecasVestidas = Object.values(lookAtual);
  if (pecasVestidas.length === 0) {
    alert('Vista pelo menos uma peça no manequim antes de salvar!');
    return;
  }

  const salvos = JSON.parse(localStorage.getItem('befashion_looks') || '[]');
  salvos.push({
    id: Date.now(),
    data: new Date().toLocaleDateString('pt-BR'),
    pecas: pecasVestidas
  });
  localStorage.setItem('befashion_looks', JSON.stringify(salvos));

  alert('Look salvo com sucesso em "Meus Looks"!');
  renderizarLooksSalvos();
}

function renderizarLooksSalvos() {
  const container = document.getElementById('saved-looks-list');
  if (!container) return;

  const salvos = JSON.parse(localStorage.getItem('befashion_looks') || '[]');
  if (salvos.length === 0) {
    container.innerHTML = `<p style="color: #94a3b8; margin-top: 10px;">Nenhum look guardado ainda.</p>`;
    return;
  }

  let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 20px; max-width: 960px; margin: 20px auto;">`;

  salvos.forEach((look, index) => {
    const camadasHtml = look.pecas.map(p => {
      const chaveCat = normalizar(p.categoria);
      const ajuste = obterAjusteCamada(p.nome, chaveCat);
      const z = (normalizar(p.nome).includes('oculos') || chaveCat.includes('oculos')) ? 90 : (Number(p.zIndex) || 1) + 10;
      const src = corrigirUrlImagem(p.imagemUrl);

      return `
        <img src="${src}" alt="${p.nome}" title="${p.nome}"
             style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; pointer-events: none; z-index: ${z}; transform-origin: ${ajuste.origin}; transform: translate(${ajuste.x}%, ${ajuste.y}%) scale(${ajuste.scaleX}, ${ajuste.scaleY});">
      `;
    }).join('');

    html += `
      <div style="background: rgba(255,255,255,0.05); border: 1px solid #334155; border-radius: 12px; padding: 15px; text-align: center;">
        <h4 style="color: #38bdf8; margin-bottom: 4px;">Look #${index + 1}</h4>
        <p style="color: #94a3b8; font-size: 0.75rem; margin-bottom: 10px;">Salvo em ${look.data}</p>

        <div style="position: relative; width: 180px; height: 270px; margin: 0 auto 12px; background: rgba(15, 23, 42, 0.6); border-radius: 8px; overflow: hidden;">
          <img src="/assets/manequim-frente.png" alt="Manequim" style="width: 100%; height: 100%; object-fit: contain; display: block;">
          ${camadasHtml}
        </div>

        <div style="display: flex; gap: 8px; justify-content: center;">
          <button onclick="experimentarLookSalvo(${look.id})" style="padding: 6px 12px; font-size: 0.8rem; cursor: pointer; background: #38bdf8; color: #0f172a; border: none; border-radius: 6px; font-weight: 600;">
            Usar no Provador
          </button>
          <button onclick="excluirLookSalvo(${look.id})" style="padding: 6px 10px; font-size: 0.8rem; cursor: pointer; background: #ef4444; color: #fff; border: none; border-radius: 6px;">
            Excluir
          </button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function experimentarLookSalvo(id) {
  const salvos = JSON.parse(localStorage.getItem('befashion_looks') || '[]');
  const look = salvos.find(l => l.id === id);
  if (!look) return;

  navigate('provador');
  limparTudo();

  requestAnimationFrame(() => {
    look.pecas.forEach(p => {
      vestirPeca(p.nome, p.categoria, corrigirUrlImagem(p.imagemUrl), p.zIndex);
    });
  });
}

function excluirLookSalvo(id) {
  const salvos = JSON.parse(localStorage.getItem('befashion_looks') || '[]');
  const atualizados = salvos.filter(l => l.id !== id);
  localStorage.setItem('befashion_looks', JSON.stringify(atualizados));
  renderizarLooksSalvos();
}

