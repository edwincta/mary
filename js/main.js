// Aquí estuvo ArsenioLupin

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
      
      // Crear un ID único para cada tarjeta basado en el título del servicio
      const cardId = servicio.titulo.toLowerCase().replace(/\s+/g, '-');
      
      const itemsHTML = servicio.items.map(item => {
        const itemId = item.toLowerCase().replace(/\s+/g, '-');
        return `
          <li class="service-item" 
              data-service="${item}" 
              id="${cardId}-${itemId}">
            <span>${item}</span>
          </li>
        `;
      }).join('');
      
      serviceCard.innerHTML = `
        <img src="${servicio.imagen}" alt="${servicio.titulo}" class="service-img">
        <div class="service-content">
          <h3>${servicio.titulo}</h3>
          <p>${servicio.descripcion}</p>
          <div class="service-items-container">
            <ul class="service-items">
              ${itemsHTML}
            </ul>
            <div class="whatsapp-button-container">
              <a href="#" 
                 target="_blank" 
                 class="btn-agendar"
                 data-whatsapp="${servicio.whatsapp}"
                 data-servicio="${servicio.titulo}">
                Agendar Cita
              </a>
            </div>
          </div>
        </div>
      `;
      
      servicesGrid.appendChild(serviceCard);
      
      // Agregar manejadores de clic a los ítems de servicio
      const serviceItems = serviceCard.querySelectorAll('.service-item');
      const serviceItemsContainer = serviceCard.querySelector('.service-items');
      const whatsappButtonContainer = serviceCard.querySelector('.whatsapp-button-container');
      const btnAgendar = serviceCard.querySelector('.btn-agendar');
      
      serviceItems.forEach(item => {
        item.addEventListener('click', function(e) {
          e.stopPropagation(); // Evitar que el clic se propague a la tarjeta
          
          // Si el ítem ya está seleccionado, deseleccionarlo
          if (this.classList.contains('selected')) {
            this.classList.remove('selected');
            whatsappButtonContainer.classList.remove('visible');
            serviceItemsContainer.classList.remove('has-selection');
            return;
          }
          
          // Obtener el ítem seleccionado
          const selectedItem = this.dataset.service;
          const selectedItemId = this.id;
          
          // Actualizar el enlace de WhatsApp con el ítem seleccionado
          if (btnAgendar) {
            const whatsappNumber = btnAgendar.dataset.whatsapp;
            const servicioNombre = btnAgendar.dataset.servicio;
            const mensaje = `Hola, estoy interesado/a en el servicio de ${servicioNombre}: ${selectedItem}`;
            btnAgendar.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
            btnAgendar.dataset.service = selectedItem;
            
            // Mover el botón de WhatsApp después del ítem seleccionado
            const selectedElement = document.getElementById(selectedItemId);
            if (selectedElement) {
              // Mostrar el botón de WhatsApp
              whatsappButtonContainer.classList.add('visible');
              
              // Hacer scroll suave hasta el ítem seleccionado
              selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
          
          // Marcar que hay una selección
          serviceItemsContainer.classList.add('has-selection');
          
          // Remover la clase 'selected' de todos los ítems en esta tarjeta
          serviceItems.forEach(i => i.classList.remove('selected'));
          
          // Agregar la clase 'selected' al ítem clickeado
          this.classList.add('selected');
          
          // Agregar clase de animación
          this.classList.add('pulse');
          setTimeout(() => this.classList.remove('pulse'), 500);
        });
      });
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

// Inicializar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar autoplay de la galería
  setTimeout(() => {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
      galleryGrid.addEventListener('mouseenter', resetAutoplay);
      galleryGrid.addEventListener('mouseleave', startAutoplay);
    }
  }, 1000);
  
  // Inicializar el botón de WhatsApp
  inicializarWhatsAppButton();
  
  // Inicializar Lightbox
  inicializarLightbox();
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
      
      // Obtener solo los campos que existen en el formulario actual
      const nombre = form.querySelector('input[type="text"]').value;
      const servicio = form.querySelector('select').value;
      const mensaje = form.querySelector('textarea').value;
      
      // Validar que los campos requeridos no estén vacíos
      if (!nombre || servicio === '' || !mensaje) {
        alert('Por favor completa todos los campos del formulario.');
        return;
      }
      
      // Determinar el número de teléfono según el servicio
      let numeroTelefono;
      const servicioMinusculas = servicio.toLowerCase();
      
      if (['pestañas', 'cejas'].includes(servicioMinusculas)) {
        // Número para Pestañas y Cejas
        numeroTelefono = '573150666697';
      } else {
        // Número para Uñas, Maquillaje, Depilación en cera, Capilar
        numeroTelefono = '573217566840';
      }
      
      // Crear mensaje para WhatsApp con los campos disponibles
      const mensajeWhatsApp = `Hola 👋\n` +
        `*Nuevo mensaje de contacto*\n\n` +
        `*Nombre:* ${nombre}\n` +
        `*Servicio de interés:* ${servicio}\n\n` +
        `*Mensaje:*\n${mensaje}`;
      
      // Codificar el mensaje para URL
      const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);
      const url = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;
      
      // Abrir WhatsApp en una nueva pestaña
      window.open(url, '_blank');
      
      // Limpiar formulario
      form.reset();
      
      // Mostrar mensaje de confirmación
      alert('¡Gracias por tu mensaje! Serás redirigido a WhatsApp para completar tu solicitud.');
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

// Inicializar el botón flotante de WhatsApp
function inicializarWhatsAppButton() {
  const whatsappButton = document.querySelector('.whatsapp-button');
  const whatsappTooltip = document.querySelector('.whatsapp-tooltip');
  
  if (whatsappButton && whatsappTooltip) {
    // Cerrar el tooltip al hacer clic fuera de él
    document.addEventListener('click', function(e) {
      if (!whatsappButton.contains(e.target) && !whatsappTooltip.contains(e.target)) {
        whatsappTooltip.style.opacity = '0';
        whatsappTooltip.style.visibility = 'hidden';
        whatsappTooltip.style.transform = 'translateY(10px)';
      }
    });
    
    // Alternar visibilidad del tooltip al hacer clic en el botón
    whatsappButton.addEventListener('click', function(e) {
      e.stopPropagation();
      const isVisible = whatsappTooltip.style.opacity === '1';
      
      if (isVisible) {
        whatsappTooltip.style.opacity = '0';
        whatsappTooltip.style.visibility = 'hidden';
        whatsappTooltip.style.transform = 'translateY(10px)';
      } else {
        whatsappTooltip.style.opacity = '1';
        whatsappTooltip.style.visibility = 'visible';
        whatsappTooltip.style.transform = 'translateY(0)';
      }
    });

    const whatsappOptions = document.querySelectorAll('.whatsapp-option');
    whatsappOptions.forEach(option => {
      const serviceName = option.querySelector('.service-name').textContent;
      const phoneNumber = option.href.split('wa.me/')[1].split('?')[0];
      const message = `Hola, estoy interesado/a en los servicios de ${serviceName}. ¿Podrían brindarme más información?`;
      option.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      option.addEventListener('click', function(e) {
        e.stopPropagation();
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 100);
      });
    });
  }
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
