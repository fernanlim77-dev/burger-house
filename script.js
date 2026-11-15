// ===== CONFIGURAÇÃO DO WHATSAPP =====
// Troque pelo número real: 55 + DDD + número, só números.
const WHATSAPP_NUMBER = '5511999999999';

// ===== PRODUTOS DO CARDÁPIO =====
const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=80`;

const products = {
  burgers: [
    { name: 'House Classic', desc: 'Pão brioche, blend bovino 180g, cheddar, alface, tomate e molho da casa.', price: 32.9, image: img('1568901346375-23c9450c58cd') },
    { name: 'Bacon Supreme', desc: 'Blend 180g, bacon crocante, cheddar cremoso, cebola caramelizada e maionese defumada.', price: 38.9, image: img('1553979459-d2229ba7433b') },
    { name: 'Double Smash', desc: 'Dois smash burgers de 90g, queijo americano duplo, picles e molho especial.', price: 36.9, image: img('1586190848861-99aa4a171e90') },
    { name: 'Red Fire', desc: 'Blend 180g, queijo pepper jack, jalapeño, cebola crispy e maionese de chipotle.', price: 39.9, image: img('1571091718767-18b5b1457add') },
    { name: 'Cheese Lovers', desc: 'Blend 180g, quatro queijos derretidos, cebola roxa e maionese de alho assado.', price: 37.9, image: img('1550547660-d9450f859349') },
    { name: 'Garden Veggie', desc: 'Burger de grão-de-bico e cogumelos, queijo prato, rúcula, tomate e pesto.', price: 34.9, image: img('1572802419224-296b0aeee0d9') }
  ],
  sides: [
    { name: 'Batata Clássica', desc: 'Batata frita crocante com sal de ervas. Porção individual.', price: 16.9, image: img('1573080496219-bb080dd4f877') },
    { name: 'Batata Supreme', desc: 'Batata rústica com cheddar cremoso, bacon e cebolinha.', price: 24.9, image: img('1630384060421-cb20d0e0649d') },
    { name: 'Onion Rings', desc: 'Anéis de cebola empanados, servidos com molho barbecue.', price: 19.9, image: img('1639024471283-03518883512d') }
  ],
  drinks: [
    { name: 'Refrigerante', desc: 'Lata 350ml. Consulte os sabores disponíveis.', price: 7.9, image: img('1622483767028-3f66f32aef97') },
    { name: 'Milkshake', desc: 'Baunilha, chocolate ou morango, com chantilly. 400ml.', price: 22.9, image: img('1572490122747-3968b75cc699') },
    { name: 'Suco Natural', desc: 'Laranja, limão ou maracujá, feito na hora. 400ml.', price: 11.9, image: img('1600271886742-f049cd451bba') }
  ]
};

// ===== FUNÇÕES =====
const formatPrice = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

function renderMenu(category) {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = products[category].map((item, i) => `
    <article class="card" style="animation-delay:${i * 0.08}s">
      <div class="card__image">
        <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="card__body">
        <h3 class="card__name">${item.name}</h3>
        <p class="card__desc">${item.desc}</p>
        <div class="card__footer">
          <span class="card__price">${formatPrice(item.price)}</span>
          <a class="btn btn--red card__btn" target="_blank" rel="noopener"
             href="${whatsappLink(`Olá! Gostaria de pedir: 1x ${item.name} (${formatPrice(item.price)}).`)}">Pedir</a>
        </div>
      </div>
    </article>
  `).join('');
}

// ===== ABAS DO CARDÁPIO =====
document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    renderMenu(tab.dataset.category);
  });
});
renderMenu('burgers');

// ===== BOTÕES GERAIS DO WHATSAPP =====
document.querySelectorAll('[data-whatsapp]').forEach((btn) => {
  btn.href = whatsappLink('Olá! Gostaria de fazer um pedido na Burger House.');
  btn.target = '_blank';
  btn.rel = 'noopener';
});

// ===== MENU DO CELULAR =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('open');
  });
});

// ===== CABEÇALHO AO ROLAR =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== ANIMAÇÃO AO APARECER NA TELA =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    entry.target.querySelectorAll('[data-count]').forEach(animateCount);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ===== CONTADOR DOS NÚMEROS =====
function animateCount(el) {
  const target = Number(el.dataset.count);
  const duration = 1600;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
