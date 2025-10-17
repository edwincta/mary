// Datos de servicios
const servicios = [
  {
    titulo: 'Servicios de Uñas',
    imagen: 'imagen/servicio.png',
    descripcion: 'Tratamientos profesionales para el cuidado y embellecimiento de tus uñas',
    items: [
      'Manicure y pedicure tradicional',
      'Esmaltado semipermanente',
      'Uñas en acrílico',
      'Uñas en acrygel',
      'Recubrimiento en acrílico',
      'Recubrimiento en polygel',
      'Recubrimiento en rubber',
      'Recubrimiento en builder gel',
      'Uñas press on'
    ],
    whatsapp: '573217566840'
  },
  {
    titulo: 'Servicios de Maquillaje',
    imagen: 'imagen/servicio maquillaje.png',
    descripcion: 'Maquillaje profesional para cualquier ocasión especial',
    items: [
      'Maquillaje social',
      'Maquillaje artístico'
    ],
    whatsapp: '573217566840'
  },
  {
    titulo: 'Servicios Capilares',
    imagen: 'imagen/servicio cabello.png',
    descripcion: 'Tratamientos capilares completos para toda la familia',
    items: [
      'Cortes para toda la familia',
      'Tintes y rayitos',
      'Planchados',
      'Repolarizaciones',
      'Keratinas',
      'Peinados'
    ],
    whatsapp: '573217566840'
  },
  {
    titulo: 'Servicios de Pestañas',
    imagen: 'imagen/servicio pestañas.png',
    descripcion: 'Realza tu mirada con nuestros servicios de pestañas',
    items: [
      'Lifting',
      'Pestañas por punto',
      'Tecnológicas (brasileña YY)',
      'Tecnológicas (hawaiana W)',
      'Técnica clásica (natural y pestañina)'
    ],
    whatsapp: '573150666697'
  },
  {
    titulo: 'Servicios de Cejas',
    imagen: 'imagen/servicio cejas.png',
    descripcion: 'Diseño y cuidado profesional de cejas',
    items: [
      'Diseño de cejas',
      'Microblading',
      'Laminado de cejas',
      'Tinte de cejas'
    ],
    whatsapp: '573150666697'
  },
  {
    titulo: 'Depilación en Cera',
    imagen: 'imagen/servicio cera.png',
    descripcion: 'Depilación profesional con cera de alta calidad',
    items: [
      'Depilación facial',
      'Depilación corporal',
      'Depilación de cejas'
    ],
    whatsapp: '573217566840'
  }
];

// Imágenes de la galería
const imagenesGaleria = [
    'imagen/uña 1.jpg',
    'imagen/uña 2.jpg',
    'imagen/uña 3.jpg',
    'imagen/uña 4.jpg',
    'imagen/uña 5.jpg',
    'imagen/uña 6.jpg',
    'imagen/uña 7.jpg',
    'imagen/uña 8.jpg',
    'imagen/uña 9.jpg',
    'imagen/uña 10.jpg',
    'imagen/uña 11.jpg',
    'imagen/uña 12.jpg',
    'imagen/uña 13.jpg',
    'imagen/uña 14.jpg',
    'imagen/uña 15.jpg',
    'imagen/uña 16.jpg',
    'imagen/uña 17.jpg',
    'imagen/uña 18.jpg',
    'imagen/carol 1.jpg',
    'imagen/carol 2.jpg',
    'imagen/carol 3.jpg',
    'imagen/carol 4.jpg',
    'imagen/carol 5.jpg',
    'imagen/carol 6.jpg',
    'imagen/carol (4).jpg',
    'imagen/carol (7).jpg'
  ];

// Variables globales
let currentImageIndex = 0;

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
  inicializarMenu();
  cargarServicios();
  cargarGaleria();
  inicializarLightbox();
  inicializarFormulario();
  inicializarNavegacion();
});

// Menú móvil
function inicializarMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });
  }
}

// Cargar servicios dinámicamente
function cargarServicios() {
  const servicesGrid = document.querySelector('.services-grid');
  
  if (servicesGrid) {
    servicesGrid.innerHTML = '';
    
    servicios.forEach(servicio => {
      const serviceCard = document.createElement('div');
      serviceCard.className = 'service-card';
      
      const itemsHTML = servicio.items.map(item => `<li>${item}</li>`).join('');
      
      serviceCard.innerHTML = `
        <img src="${servicio.imagen}" alt="${servicio.titulo}" class="service-img">
        <div class="service-content">
          <h3>${servicio.titulo}</h3>
          <p>${servicio.descripcion}</p>
          <ul class="service-items">
            ${itemsHTML}
          </ul>
          <a href="https://wa.me/${servicio.whatsapp}?text=Hola%20👋%20quiero%20más%20información%20sobre%20${encodeURIComponent(servicio.titulo)}" 
             target="_blank" 
             class="btn-agendar">
            Agendar Cita
          </a>
        </div>
      `;
      
      servicesGrid.appendChild(serviceCard);
    });
  }
}

// Cargar galería como carrusel
let currentSlide = 0;

function getSlidesToShow() {
  if (window.innerWidth <= 576) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
}

function cargarGaleria() {
  const galleryGrid = document.querySelector('.gallery-grid');
  
  if (galleryGrid) {
    // Crear estructura del carrusel
    galleryGrid.innerHTML = `
      <div class="gallery-carousel"></div>
    `;
    
    const carousel = galleryGrid.querySelector('.gallery-carousel');
    
    // Agregar todas las imágenes
    imagenesGaleria.forEach((imagen, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.innerHTML = `<img src="${imagen}" alt="Trabajo ${index + 1}">`;
      galleryItem.addEventListener('click', () => abrirLightbox(index));
      carousel.appendChild(galleryItem);
    });
    
    // Crear controles
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
    controls.innerHTML = `
      <button class="carousel-btn prev-btn" aria-label="Anterior">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="carousel-dots"></div>
      <button class="carousel-btn next-btn" aria-label="Siguiente">
        <i class="fas fa-chevron-right"></i>
      </button>
    `;
    
    galleryGrid.parentElement.appendChild(controls);
    
    // Crear dots
    updateDots();
    
    // Event listeners para botones
    controls.querySelector('.prev-btn').addEventListener('click', prevSlide);
    controls.querySelector('.next-btn').addEventListener('click', nextSlide);
    
    // Responsive
    window.addEventListener('resize', () => {
      updateCarousel();
      updateDots();
    });
    
    // Autoplay
    startAutoplay();
  }
}

function updateDots() {
  const dotsContainer = document.querySelector('.carousel-dots');
  if (!dotsContainer) return;
  
  const slidesToShow = getSlidesToShow();
  const maxSlide = imagenesGaleria.length - slidesToShow;
  
  dotsContainer.innerHTML = '';
  
  for (let i = 0; i <= maxSlide; i++) {
    const dot = document.createElement('button');
    dot.className = `carousel-dot ${i === currentSlide ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function updateCarousel() {
  const carousel = document.querySelector('.gallery-carousel');
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;
  
  const itemWidth = items[0].offsetWidth;
  const gap = 24; // 1.5rem en px
  
  const offset = currentSlide * (itemWidth + gap);
  carousel.style.transform = `translateX(-${offset}px)`;
  
  // Actualizar dots
  document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  const slidesToShow = getSlidesToShow();
  const maxSlide = imagenesGaleria.length - slidesToShow;
  
  if (currentSlide < maxSlide) {
    currentSlide++;
  } else {
    currentSlide = 0; // Volver al inicio
  }
  
  updateCarousel();
  resetAutoplay();
}

function prevSlide() {
  const slidesToShow = getSlidesToShow();
  const maxSlide = imagenesGaleria.length - slidesToShow;
  
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = maxSlide; // Ir al final
  }
  
  updateCarousel();
  resetAutoplay();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  resetAutoplay();
}

// Autoplay
let autoplayInterval;

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 4000); // Cambia cada 4 segundos
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

// Pausar autoplay al hacer hover
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
      galleryGrid.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
      galleryGrid.addEventListener('mouseleave', startAutoplay);
    }
  }, 500);
});

// Lightbox
function inicializarLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeLightbox = document.getElementById('closeLightbox');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (closeLightbox) {
    closeLightbox.addEventListener('click', cerrarLightbox);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', imagenAnterior);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', imagenSiguiente);
  }

  // Cerrar con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      cerrarLightbox();
    } else if (e.key === 'ArrowLeft') {
      imagenAnterior();
    } else if (e.key === 'ArrowRight') {
      imagenSiguiente();
    }
  });

  // Cerrar al hacer clic fuera de la imagen
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        cerrarLightbox();
      }
    });
  }

  // Soporte para gestos táctiles
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {
    lightbox.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      imagenSiguiente();
    }
    if (touchEndX > touchStartX + 50) {
      imagenAnterior();
    }
  }
}

function abrirLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (lightbox && lightboxImg) {
    lightboxImg.src = imagenesGaleria[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function cerrarLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function imagenSiguiente() {
  currentImageIndex = (currentImageIndex + 1) % imagenesGaleria.length;
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightboxImg) {
    lightboxImg.src = imagenesGaleria[currentImageIndex];
  }
}

function imagenAnterior() {
  currentImageIndex = (currentImageIndex - 1 + imagenesGaleria.length) % imagenesGaleria.length;
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightboxImg) {
    lightboxImg.src = imagenesGaleria[currentImageIndex];
  }
}

// Formulario de contacto
function inicializarFormulario() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nombre = form.querySelector('input[type="text"]').value;
      const email = form.querySelector('input[type="email"]').value;
      const telefono = form.querySelector('input[type="tel"]').value;
      const servicio = form.querySelector('select').value;
      const mensaje = form.querySelector('textarea').value;
      
      // Crear mensaje para WhatsApp
      const mensajeWhatsApp = `Hola 👋
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Servicio: ${servicio}
Mensaje: ${mensaje}`;
      
      const url = `https://wa.me/573217566840?text=${encodeURIComponent(mensajeWhatsApp)}`;
      window.open(url, '_blank');
      
      // Limpiar formulario
      form.reset();
      
      // Mostrar mensaje de confirmación
      alert('¡Gracias por tu mensaje! Te redirigiremos a WhatsApp.');
    });
  }
}

// Navegación suave y activa
function inicializarNavegacion() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Marcar enlace activo al hacer scroll
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Scroll suave al hacer clic
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Animaciones al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.service-card, .gallery-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
