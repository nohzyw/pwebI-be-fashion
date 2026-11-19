const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const LARGURA_MANEQUIM = 149;
const ALTURA_MANEQUIM = 783;

const PECAS = [
  { src: 'IMG_7886-removebg-preview.png', out: 'quepe-preto.png', w: 56, h: 40, left: 48, top: 2 },
  { src: 'IMG_7887-removebg-preview.png', out: 'oculos-fino-preto.png', w: 42, h: 16, left: 53, top: 36 },
  { src: 'IMG_7888-removebg-preview.png', out: 'choker-preta.png', w: 28, h: 14, left: 60, top: 96 },
  { src: 'IMG_7894-removebg-preview.png', out: 'camiseta-femme-fatale.png', w: 122, h: 155, left: 13, top: 112 },
  { src: 'IMG_7896-removebg-preview.png', out: 'polo-adidas-bege.png', w: 124, h: 162, left: 12, top: 110 },
  { src: 'IMG_7897-removebg-preview.png', out: 'blusa-california-azul.png', w: 124, h: 158, left: 12, top: 114 },
  { src: 'IMG_7901-removebg-preview.png', out: 'top-preto-cruz.png', w: 94, h: 152, left: 27, top: 116 },
  { src: 'IMG_7898-removebg-preview.png', out: 'regata-vermelha-sweetheart.png', w: 94, h: 150, left: 27, top: 116 },
  { src: 'IMG_7891-removebg-preview.png', out: 'regata-preta-tribal.png', w: 94, h: 148, left: 27, top: 118 },
  { src: 'IMG_7895-removebg-preview.png', out: 'regata-rosa-renda.png', w: 94, h: 152, left: 27, top: 116 },
  { src: 'IMG_7882-removebg-preview.png', out: 'regata-preta-um-ombro.png', w: 94, h: 150, left: 27, top: 116 },
  { src: 'IMG_7884-removebg-preview.png', out: 'top-tomara-caia-vermelho.png', w: 88, h: 122, left: 30, top: 146 },
  { src: 'IMG_7890-removebg-preview.jpg', out: 'top-branco-caveira.png', w: 88, h: 118, left: 30, top: 148, removerFundoPreto: true },
  { src: 'IMG_7902-removebg-preview.png', out: 'saia-jeans-cinza-cinto.png', w: 114, h: 115, left: 17, top: 256 },
  { src: 'IMG_7889-removebg-preview.jpg', out: 'saia-branca-franzida.png', w: 112, h: 112, left: 18, top: 258, removerFundoPreto: true },
  { src: 'IMG_7885-removebg-preview.png', out: 'short-bege-estrelas.png', w: 114, h: 108, left: 17, top: 256 },
  { src: 'IMG_7892-removebg-preview.png', out: 'short-jeans-escuro.png', w: 114, h: 105, left: 17, top: 258 },
  { src: 'IMG_7883-removebg-preview.png', out: 'vestido-azul-drapeado.png', w: 112, h: 295, left: 18, top: 145 },
  { src: 'IMG_7881-removebg-preview.png', out: 'vestido-rosa-franzido.png', w: 108, h: 285, left: 20, top: 120 },
  { src: 'IMG_7893-removebg-preview.png', out: 'camiseta-nirvana-bege.png', w: 132, h: 175, left: 8, top: 112 }
];

async function removerPreto(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r < 25 && g < 25 && b < 25) {
      data[i + 3] = 0;
    }
  }
  return sharp(data, { raw: { width: info.