/* ===== Datos editables ===== */
const MODULOS = [
  {n:'HTML5', h:10, i:'🧱', c:'#38BDF8', o:'Entender cómo se construye una página web desde cero', k:['Estructura de una página','Listas y enlaces','Multimedia','Formularios']},
  {n:'CSS', h:8, i:'🎨', c:'#8B5CF6', o:'Mejorar la apariencia con estilos visuales', k:['Selectores','Herencia','Posicionamiento y animación']},
  {n:'Maquetación web', h:10, i:'📐', c:'#34D399', o:'Organizar elementos para diseños claros y funcionales', k:['Estática y dinámica','Plantillas','Diseño responsive']},
  {n:'PHP', h:12, i:'⚙️', c:'#38BDF8', o:'Procesar lo que ingresa el usuario y crear páginas dinámicas', k:['Variables y operadores','if / else / switch','for / while','Envío y recepción de datos']}
];
const PRODUCTOS = [
  {t:'Página web institucional', i:'🏛️', d:['Logotipo','Menú de navegación','Nosotros','Servicios','Noticias','Galería','HTML5 + CSS']},
  {t:'Sitio web informativo', i:'📰', d:['Tema: tecnología, educación, deportes o videojuegos','Maquetación con Flexbox','Menús de navegación','Diseño adaptable a dispositivos']},
  {t:'MOOC: aula virtual', i:'🎓', d:['Capacitación sobre una asignatura de tu elección','Interactiva con el usuario','PHP procesa y visualiza la información']}
];
const PARTES = [
  ['Logo','b-logo','⭐ Mi Logo'],['Menú','b-menu','Inicio · Nosotros · Servicios'],
  ['Nosotros','b-nos','👥 Nosotros: quiénes somos'],['Servicios','b-serv','🛎️ Servicios'],
  ['Noticias','b-not','📰 Noticias'],['Galería','b-gal','🖼️ Galería']
];
const TIEMPOS = ['50 s','1 min','1 min','3 min','3 min','1 min','2 min','1 min','1 min','1 min'];

const $ = (s, p = document) => p.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h) e.innerHTML = h; return e; };

/* ===== Navegación ===== */
const slides = [...document.querySelectorAll('.slide')];
const menu = $('#menu');
let cur = 0;
slides.forEach((s, i) => {
  const b = el('button', '', s.dataset.title);
  b.onclick = () => go(i);
  menu.append(b);
});
function go(i) {
  cur = Math.max(0, Math.min(slides.length - 1, i));
  slides.forEach((s, k) => s.classList.toggle('active', k === cur));
  [...menu.children].forEach((b, k) => {
    b.classList.toggle('on', k === cur);
    if (k === cur) b.scrollIntoView({inline: 'center', block: 'nearest'});
  });
  $('#bar').style.width = ((cur + 1) / slides.length * 100) + '%';
  $('#count').textContent = (cur + 1) + ' / ' + slides.length;
  if (slides[cur].querySelector('[data-count]')) countUp();
}
document.querySelectorAll('[data-go]').forEach(b =>
  b.onclick = () => go(cur + (b.dataset.go === 'next' ? 1 : -1)));
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'PageDown') go(cur + 1);
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(cur - 1);
  if (e.key.toLowerCase() === 'f') toggleFS();
});
let tx = 0;
document.addEventListener('touchstart', e => tx = e.touches[0].clientX);
document.addEventListener('touchend', e => {
  const d = e.changedTouches[0].clientX - tx;
  if (Math.abs(d) > 70) go(cur + (d < 0 ? 1 : -1));
});
function toggleFS() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}
$('#fs').onclick = toggleFS;

/* ===== Contadores InnovaWeb ===== */
function countUp() {
  document.querySelectorAll('[data-count]').forEach(n => {
    const max = +n.dataset.count; let v = 0;
    const t = setInterval(() => {
      v += Math.ceil(max / 20); if (v >= max) { v = max; clearInterval(t); }
      n.textContent = v;
    }, 40);
  });
}

/* ===== Selector de módulos ===== */
const tabs = $('#tabs'), route = $('#route'), panel = $('#modPanel');
MODULOS.forEach((m, i) => {
  const b = el('button', '', `<span class="ico">${m.i}</span><strong>${m.n}</strong><span>${m.h} h</span>`);
  b.setAttribute('role', 'tab');
  b.onclick = () => pick(i);
  tabs.append(b);
  const r = el('div'); r.style.flex = m.h; r.style.background = m.c;
  route.append(r);
});
function pick(i) {
  const m = MODULOS[i];
  [...tabs.children].forEach((b, k) => b.classList.toggle('on', k === i));
  [...route.children].forEach((r, k) => r.classList.toggle('on', k <= i));
  panel.innerHTML = `<div class="hrs">${m.h} h</div><div><h3>${m.i} ${m.n}</h3><p class="tag">${m.o}</p><div class="kws">${m.k.map(x => `<span>${x}</span>`).join('')}</div></div>
    <p class="tag" style="margin-left:auto">Total del curso: 40 horas</p>`;
}
pick(0);

/* ===== Demo: construye una página ===== */
const page = $('#page'), browser = $('#browser'), dBtns = $('#demoBtns');
PARTES.forEach(([n, c, txt]) => {
  const b = el('button', 'btn', '+ ' + n);
  b.onclick = () => {
    page.querySelector('.empty')?.remove();
    if (!page.querySelector('.' + c)) page.append(el('div', 'blk ' + c, txt));
    b.classList.add('on');
  };
  dBtns.append(b);
});
const css = el('button', 'btn', '🎨 Aplicar CSS');
css.onclick = () => { page.classList.toggle('css'); css.classList.toggle('on'); };
const mob = el('button', 'btn', '📱 Vista móvil');
mob.onclick = () => { browser.classList.toggle('mobile'); mob.classList.toggle('on'); };
const rst = el('button', 'btn', '↺ Reiniciar');
rst.onclick = () => {
  page.innerHTML = '<p class="empty">Toca los botones para añadir partes ↑</p>';
  page.classList.remove('css'); browser.classList.remove('mobile');
  dBtns.querySelectorAll('.on').forEach(b => b.classList.remove('on'));
};
dBtns.append(css, mob, rst);

/* ===== Productos (tarjetas interactivas) ===== */
const prod = $('#products');
PRODUCTOS.forEach((p, i) => {
  const c = el('button', 'card lv' + (i + 1), `<span class="ico">${p.i}</span><h3>${p.t}</h3><p class="tag">Toca para ver</p>`);
  c.style.textAlign = 'left';
  c.onclick = () => {
    const open = c.classList.toggle('open');
    c.innerHTML = open
      ? `<span class="ico">${p.i}</span><h3>${p.t}</h3><ul class="kw" style="font-size:1rem;margin:0">${p.d.map(x => `<li>${x}</li>`).join('')}</ul>`
      : `<span class="ico">${p.i}</span><h3>${p.t}</h3><p class="tag">Toca para ver</p>`;
  };
  prod.append(c);
});

/* ===== Vivienda inteligente ===== */
const st = {luz: false, puerta: false, clima: false, alarma: true};
const hb = $('#homeBtns');
const acciones = {
  luz: ['💡 Luz (relé)', () => $('#win').classList.toggle('on', st.luz)],
  puerta: ['🚪 Puerta (servo)', () => $('#door').classList.toggle('open', st.puerta)],
  clima: ['🌀 Motor DC', () => $('#fan').classList.toggle('on', st.clima)],
  alarma: ['🔔 Alarma (buzzer)', () => $('#alarm').textContent = st.alarma ? '🔒' : '🔓']
};
Object.entries(acciones).forEach(([k, [txt, fn]]) => {
  const b = el('button', 'btn' + (st[k] ? ' on' : ''), txt);
  b.onclick = () => { st[k] = !st[k]; b.classList.toggle('on', st[k]); fn();
    $('#temp').textContent = '📱 Bluetooth → ' + txt.replace(/^\S+\s/, '') + (st[k] ? ' ON' : ' OFF'); };
  hb.append(b);
});

go(0);
