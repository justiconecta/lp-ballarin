/* ======================
   DOBRA1.JS - HERO OTIMIZADO
   ====================== */

// Tracking simplificado e funcional
function trackCTA(location) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            'location': location,
            'event_category': 'conversion'
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: location
        });
    }
    
    // Console para debug
    console.log('CTA clicked:', location);
}

// Video background management otimizado
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video-background');
    
    if (heroVideo) {
        // Tentar reproduzir o vídeo background
        heroVideo.play().catch(error => {
            console.log('Video background autoplay prevented:', error);
            // Fallback: aplicar background image se vídeo falhar
            const heroSection = document.querySelector('.hero');
            heroSection.style.background = 'linear-gradient(rgba(69, 61, 57, 0.6), rgba(69, 61, 57, 0.4)), url("assets/images/hero-background.jpeg")';
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
        });
        
        // Performance: pausar quando fora da tela
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(e => console.log('Video play error:', e));
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(heroVideo);
        
        // Loading states para vídeo background
        heroVideo.addEventListener('loadstart', () => {
            heroVideo.style.opacity = '0.7';
            heroVideo.style.filter = 'blur(2px)';
        });
        
        heroVideo.addEventListener('canplay', () => {
            heroVideo.style.opacity = '1';
            heroVideo.style.filter = 'none';
            heroVideo.style.transition = 'all 0.6s ease';
        });
        
        heroVideo.addEventListener('error', () => {
            console.log('Erro ao carregar vídeo background');
            // Fallback para background image
            const heroSection = document.querySelector('.hero');
            heroSection.style.background = 'linear-gradient(rgba(69, 61, 57, 0.6), rgba(69, 61, 57, 0.4)), url("assets/images/hero-background.jpeg")';
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
            heroVideo.style.display = 'none';
        });
        
        // Performance: reduzir qualidade em conexões lentas
        if (navigator.connection && navigator.connection.effectiveType) {
            const connectionType = navigator.connection.effectiveType;
            if (connectionType === 'slow-2g' || connectionType === '2g') {
                heroVideo.style.display = 'none';
                const heroSection = document.querySelector('.hero');
                heroSection.style.background = 'linear-gradient(rgba(69, 61, 57, 0.6), rgba(69, 61, 57, 0.4)), url("assets/images/hero-background.jpeg")';
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center';
                console.log('Conexão lenta detectada - vídeo background desabilitado');
            }
        }
        
        // Mobile: pausar vídeo background em alguns casos
        if (window.innerWidth <= 768 && 'ontouchstart' in window) {
            // Verificar se é dispositivo móvel real
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile) {
                // Manter vídeo mas com configurações otimizadas
                heroVideo.preload = 'none';
                console.log('Dispositivo móvel detectado - vídeo background otimizado');
            }
        }
    }
}

// Smooth scroll para âncoras
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicialização da dobra 1
document.addEventListener('DOMContentLoaded', function() {
    initHeroVideo();
    initSmoothScroll();
    
    console.log('Dobra 1 (Hero) carregada');
});

/* ======================
   DOBRA2.JS - AUTORIDADE OTIMIZADA
   ====================== */

// Scroll reveal otimizado para dobra 2
function initAutoridadeAnimations() {
    const autoridadeSection = document.querySelector('#autoridade');
    
    if (!autoridadeSection) return;
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar header
                const header = entry.target.querySelector('.autoridade-header');
                if (header) {
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                }
                
                // Animar fotos com stagger
                const fotos = entry.target.querySelectorAll('.foto-item-large');
                fotos.forEach((foto, index) => {
                    setTimeout(() => {
                        foto.style.opacity = '1';
                        foto.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(autoridadeSection);
}

// Lazy loading otimizado para imagens da dobra 2
function initAutoridadeLazyLoading() {
    const images = document.querySelectorAll('#autoridade img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                        img.classList.add('loaded');
                    };
                    
                    img.onerror = () => {
                        console.log('Erro ao carregar imagem:', img.src);
                        img.style.opacity = '0.5';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            imageObserver.observe(img);
        });
    }
}

// Performance para hover effects
function initAutoridadePerformance() {
    const fotoItems = document.querySelectorAll('.foto-item-large');
    
    fotoItems.forEach(item => {
        // Otimizar transforms para GPU
        item.style.willChange = 'transform';
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-12px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
}

// Inicialização da dobra 2
function initDobra2() {
    // Aplicar estilos iniciais para animação
    const autoridadeHeader = document.querySelector('.autoridade-header');
    const fotoItems = document.querySelectorAll('.foto-item-large');
    
    if (autoridadeHeader) {
        autoridadeHeader.style.opacity = '0';
        autoridadeHeader.style.transform = 'translateY(30px)';
        autoridadeHeader.style.transition = 'all 0.6s ease';
    }
    
    fotoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = 'all 0.6s ease';
    });
    
    // Inicializar funcionalidades
    initAutoridadeAnimations();
    initAutoridadeLazyLoading();
    initAutoridadePerformance();
    
    console.log('Dobra 2 (Autoridade) carregada');
}

// Auto-inicialização quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDobra2);
} else {
    initDobra2();
}

/* ======================
   DOBRA3.JS - BIOGRAFIA OTIMIZADA
   ====================== */

// Scroll reveal otimizado para dobra 3
function initBiografiaAnimations() {
    const biografiaSection = document.querySelector('#biografia');
    
    if (!biografiaSection) return;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar texto
                const biografiaText = entry.target.querySelector('.biografia-text');
                const biografiaImage = entry.target.querySelector('.biografia-image');
                
                if (biografiaText) {
                    biografiaText.style.opacity = '1';
                    biografiaText.style.transform = 'translateX(0)';
                }
                
                // Animar imagem com delay
                setTimeout(() => {
                    if (biografiaImage) {
                        biografiaImage.style.opacity = '1';
                        biografiaImage.style.transform = 'translateX(0)';
                    }
                }, 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(biografiaSection);
}

// Lazy loading para imagem da biografia
function initBiografiaLazyLoading() {
    const biografiaImage = document.querySelector('#biografia img[loading="lazy"]');
    
    if (!biografiaImage) return;
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                        img.classList.add('loaded');
                    };
                    
                    img.onerror = () => {
                        console.log('Erro ao carregar imagem da biografia:', img.src);
                        img.style.opacity = '0.5';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        biografiaImage.style.opacity = '0';
        biografiaImage.style.transition = 'opacity 0.4s ease';
        imageObserver.observe(biografiaImage);
    }
}

// Modal placeholder para botão "CONHECER O MÉTODO"
function openModal() {
    // Track do clique no botão
    if (typeof trackCTA === 'function') {
        trackCTA('biografia_modal');
    }
    
    const btn = event.target;
    
    // Feedback visual no botão
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 150);
    
    // Placeholder para modal - implementar conforme necessário
    console.log('Modal "Conhecer o Método" seria aberto aqui');
    
    // Exemplo de implementação simples:
    alert('Modal seria aberto aqui.\nImplementar conforme necessário:\n- Formulário de contato\n- Mais informações sobre o método\n- Link para WhatsApp');
}

// Performance para hover effects da biografia
function initBiografiaPerformance() {
    const biografiaImage = document.querySelector('.biografia-image');
    const quoteDestacada = document.querySelector('.quote-destacada');
    
    // Otimizar transforms para GPU
    if (biografiaImage) {
        biografiaImage.style.willChange = 'transform';
    }
    
    if (quoteDestacada) {
        quoteDestacada.style.willChange = 'transform';
    }
}

// Reading time estimator para o conteúdo
function initReadingTime() {
    const biografiaText = document.querySelector('.biografia-content-text');
    
    if (!biografiaText) return;
    
    const text = biografiaText.textContent || biografiaText.innerText;
    const wordsPerMinute = 200; // Velocidade média de leitura
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    console.log(`Tempo de leitura estimado da biografia: ${readingTime} minuto(s)`);
    
    // Opcional: Adicionar indicador visual de tempo de leitura
    // const readingIndicator = document.createElement('span');
    // readingIndicator.textContent = `${readingTime} min de leitura`;
    // readingIndicator.className = 'reading-time';
    // biografiaText.parentNode.insertBefore(readingIndicator, biografiaText);
}

// Scroll suave para âncoras dentro da biografia
function initBiografiaScrolling() {
    const biografiaLinks = document.querySelectorAll('#biografia a[href^="#"]');
    
    biografiaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Feedback visual no link
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Inicialização da dobra 3
function initDobra3() {
    // Aplicar estilos iniciais para animação
    const biografiaText = document.querySelector('.biografia-text');
    const biografiaImage = document.querySelector('.biografia-image');
    
    if (biografiaText) {
        biografiaText.style.opacity = '0';
        biografiaText.style.transform = 'translateX(-30px)';
        biografiaText.style.transition = 'all 0.8s ease';
    }
    
    if (biografiaImage) {
        biografiaImage.style.opacity = '0';
        biografiaImage.style.transform = 'translateX(30px)';
        biografiaImage.style.transition = 'all 0.8s ease';
    }
    
    // Inicializar funcionalidades
    initBiografiaAnimations();
    initBiografiaLazyLoading();
    initBiografiaPerformance();
    initReadingTime();
    initBiografiaScrolling();
    
    console.log('Dobra 3 (Biografia) carregada');
}

// Auto-inicialização quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDobra3);
} else {
    initDobra3();
}

/* ======================
   DOBRA4.JS - COMUNIDADE OTIMIZADA
   ====================== */

// Scroll reveal otimizado para dobra 4
function initComunidadeAnimations() {
    const comunidadeSection = document.querySelector('#resultados');
    
    if (!comunidadeSection) return;
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar header
                const header = entry.target.querySelector('.comunidade-header');
                if (header) {
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                }
                
                // Animar itens com stagger
                const items = entry.target.querySelectorAll('.comunidade-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                        item.classList.remove('loading');
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(comunidadeSection);
}

// Lazy loading otimizado para imagens da comunidade
function initComunidadeLazyLoading() {
    const images = document.querySelectorAll('#resultados img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const container = img.closest('.comunidade-item');
                    
                    // Adicionar loading state
                    if (container) {
                        container.classList.add('loading');
                    }
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                        img.classList.add('loaded');
                        if (container) {
                            container.classList.remove('loading');
                        }
                    };
                    
                    img.onerror = () => {
                        console.log('Erro ao carregar imagem da comunidade:', img.src);
                        img.style.opacity = '0.5';
                        if (container) {
                            container.classList.remove('loading');
                            container.style.background = '#f0f0f0';
                        }
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.4s ease';
            imageObserver.observe(img);
        });
    }
}

// Performance para hover effects
function initComunidadePerformance() {
    const comunidadeItems = document.querySelectorAll('.comunidade-item');
    
    comunidadeItems.forEach(item => {
        // Otimizar transforms para GPU
        item.style.willChange = 'transform';
        
        const img = item.querySelector('img');
        if (img) {
            img.style.willChange = 'transform';
        }
        
        // Touch events para mobile
        item.addEventListener('touchstart', () => {
            item.classList.add('touched');
        });
        
        item.addEventListener('touchend', () => {
            setTimeout(() => {
                item.classList.remove('touched');
            }, 300);
        });
    });
}

// Lightbox simples para imagens (opcional)
function initComunidadeLightbox() {
    const comunidadeItems = document.querySelectorAll('.comunidade-item');
    
    comunidadeItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const alt = img ? img.alt : 'Profissional especialista';
            
            // Track do clique na imagem
            if (typeof trackCTA === 'function') {
                trackCTA('comunidade_image_click');
            }
            
            // Feedback visual
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Implementação simples de lightbox
            console.log('Lightbox seria aberto para:', alt);
            
            // Placeholder para lightbox mais elaborado
            // createLightbox(img.src, alt);
            
            // Por enquanto, abrir em nova aba como fallback
            if (img && img.src) {
                window.open(img.src, '_blank');
            }
        });
    });
}

// Criar lightbox modal (implementação básica)
function createLightbox(imageSrc, imageAlt) {
    // Remover lightbox existente se houver
    const existingLightbox = document.querySelector('.lightbox-overlay');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: pointer;
    `;
    
    // Criar imagem
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    `;
    
    // Criar botão de fechar
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        color: white;
        font-size: 40px;
        cursor: pointer;
        z-index: 10000;
    `;
    
    // Eventos
    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    
    // Animar entrada
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    // Fechar lightbox
    const closeLightbox = () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    };
    
    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    
    // Fechar com ESC
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleKeydown);
        }
    };
    document.addEventListener('keydown', handleKeydown);
}

// Grid responsivo inteligente
function initComunidadeResponsive() {
    const grid = document.querySelector('.comunidade-grid');
    
    if (!grid) return;
    
    function adjustGrid() {
        const items = grid.querySelectorAll('.comunidade-item');
        const containerWidth = grid.offsetWidth;
        const itemMinWidth = 350;
        const gap = 40;
        
        // Calcular número de colunas otimizado
        let columns = Math.floor((containerWidth + gap) / (itemMinWidth + gap));
        columns = Math.max(1, Math.min(columns, items.length));
        
        // Aplicar grid otimizado apenas se necessário
        const currentColumns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
        if (currentColumns !== columns) {
            grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        }
    }
    
    // Ajustar no resize com debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustGrid, 150);
    });
    
    // Ajustar inicialmente
    adjustGrid();
}

// Inicialização da dobra 4
function initDobra4() {
    // Aplicar estilos iniciais para animação
    const comunidadeHeader = document.querySelector('.comunidade-header');
    const comunidadeItems = document.querySelectorAll('.comunidade-item');
    
    if (comunidadeHeader) {
        comunidadeHeader.style.opacity = '0';
        comunidadeHeader.style.transform = 'translateY(30px)';
        comunidadeHeader.style.transition = 'all 0.6s ease';
    }
    
    comunidadeItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.95)';
        item.style.transition = 'all 0.6s ease';
        item.classList.add('loading'); // Estado inicial de loading
    });
    
    // Inicializar funcionalidades
    initComunidadeAnimations();
    initComunidadeLazyLoading();
    initComunidadePerformance();
    initComunidadeLightbox();
    initComunidadeResponsive();
    
    console.log('Dobra 4 (Comunidade) carregada');
}

// Auto-inicialização quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDobra4);
} else {
    initDobra4();
}

/* ======================
   DOBRA5.JS - CTA FINAL OTIMIZADO
   ====================== */

// Scroll reveal otimizado para dobra 5
function initCtaFinalAnimations() {
    const ctaSection = document.querySelector('#inscricao');
    
    if (!ctaSection) return;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar elementos sequencialmente
                const title = entry.target.querySelector('.cta-final-title');
                const video = entry.target.querySelector('.cta-video-container');
                const button = entry.target.querySelector('.cta-final-button');
                
                if (title) {
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0)';
                }
                
                setTimeout(() => {
                    if (video) {
                        video.style.opacity = '1';
                        video.style.transform = 'translateY(0) scale(1)';
                    }
                }, 200);
                
                setTimeout(() => {
                    if (button) {
                        button.style.opacity = '1';
                        button.style.transform = 'translateY(0)';
                    }
                }, 400);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(ctaSection);
}

// Video management otimizado para CTA final
function initCtaFinalVideo() {
    const ctaVideo = document.querySelector('.cta-video');
    
    if (!ctaVideo) return;
    
    // Intersection Observer para video
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                ctaVideo.play().catch(error => {
                    console.log('CTA video autoplay prevented:', error);
                });
            } else {
                ctaVideo.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videoObserver.observe(ctaVideo);
    
    // Loading states
    ctaVideo.addEventListener('loadstart', () => {
        ctaVideo.style.opacity = '0.7';
        ctaVideo.style.filter = 'blur(1px)';
    });
    
    ctaVideo.addEventListener('canplay', () => {
        ctaVideo.style.opacity = '1';
        ctaVideo.style.filter = 'none';
        ctaVideo.style.transition = 'all 0.4s ease';
    });
    
    ctaVideo.addEventListener('error', () => {
        console.log('Erro ao carregar vídeo CTA final');
        const container = ctaVideo.closest('.cta-video-container');
        if (container) {
            container.style.background = '#444';
            container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:white;">Vídeo indisponível</div>';
        }
    });
    
    // Performance: Reduzir qualidade em conexões lentas
    if (navigator.connection && navigator.connection.effectiveType) {
        const connectionType = navigator.connection.effectiveType;
        if (connectionType === 'slow-2g' || connectionType === '2g') {
            ctaVideo.preload = 'none';
            console.log('Conexão lenta detectada - preload desabilitado');
        }
    }
}

// Modal otimizado para CTA final
function openModal() {
    // Track do clique no CTA final
    if (typeof trackCTA === 'function') {
        trackCTA('cta_final');
    } else {
        console.log('CTA Final clicked');
    }
    
    const btn = event.target;
    
    // Feedback visual premium no botão
    btn.style.transform = 'scale(0.95)';
    btn.style.boxShadow = '0 10px 30px rgba(69, 61, 57, 0.6)';
    
    setTimeout(() => {
        btn.style.transform = 'translateY(-3px) scale(1.02)';
        btn.style.boxShadow = '0 20px 50px rgba(69, 61, 57, 0.5)';
    }, 150);
    
    // Implementação do modal/redirecionamento
    // Opção 1: Redirect para WhatsApp
    const whatsappUrl = "https://wa.me/5511999999999?text=Olá! Tenho interesse em conhecer o Método B3D de Harmonização Orofacial - vim da página de inscrição";
    
    // Opção 2: Abrir modal de formulário
    // createCtaModal();
    
    // Por enquanto, usar WhatsApp
    window.open(whatsappUrl, '_blank');
    
    console.log('CTA Final - Modal/WhatsApp aberto');
}

// Criar modal de CTA (implementação avançada)
function createCtaModal() {
    // Remover modal existente se houver
    const existingModal = document.querySelector('.cta-modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'cta-modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(5px);
    `;
    
    // Criar modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 40px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
        box-shadow: 0 40px 120px rgba(0,0,0,0.3);
    `;
    
    modal.innerHTML = `
        <button class="modal-close" style="
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
        ">×</button>
        
        <h3 style="
            color: #E25042;
            font-size: 1.8rem;
            margin-bottom: 20px;
            text-align: center;
        ">Quero ser B3D!</h3>
        
        <p style="
            color: #453D39;
            text-align: center;
            margin-bottom: 30px;
            line-height: 1.6;
        ">Deixe seus dados e entraremos em contato para mais informações sobre o Método B3D</p>
        
        <form class="cta-form" style="display: flex; flex-direction: column; gap: 20px;">
            <input type="text" placeholder="Seu nome completo" required style="
                padding: 15px;
                border: 2px solid #eee;
                border-radius: 10px;
                font-size: 16px;
                transition: border-color 0.3s ease;
            ">
            <input type="email" placeholder="Seu email" required style="
                padding: 15px;
                border: 2px solid #eee;
                border-radius: 10px;
                font-size: 16px;
                transition: border-color 0.3s ease;
            ">
            <input type="tel" placeholder="Seu WhatsApp" required style="
                padding: 15px;
                border: 2px solid #eee;
                border-radius: 10px;
                font-size: 16px;
                transition: border-color 0.3s ease;
            ">
            <button type="submit" style="
                background: linear-gradient(135deg, #E25042, #f26b5b);
                color: white;
                padding: 18px;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
            ">ENVIAR INTERESSE</button>
        </form>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Animar entrada
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);
    
    // Eventos
    const closeBtn = modal.querySelector('.modal-close');
    const form = modal.querySelector('.cta-form');
    
    const closeModal = () => {
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    
    // Form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const nome = formData.get('nome') || form.elements[0].value;
        const email = formData.get('email') || form.elements[1].value;
        const whatsapp = formData.get('whatsapp') || form.elements[2].value;
        
        // Track form submission
        if (typeof trackCTA === 'function') {
            trackCTA('form_submission');
        }
        
        // Simular envio
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'ENVIANDO...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'ENVIADO!';
            submitBtn.style.background = '#27ae60';
            
            setTimeout(() => {
                closeModal();
                // Redirect para WhatsApp com dados
                const message = `Olá! Sou ${nome} e tenho interesse no Método B3D.\nEmail: ${email}\nWhatsApp: ${whatsapp}`;
                const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }, 1500);
        }, 2000);
    });
    
    // Focus no primeiro input
    modal.querySelector('input').focus();
    
    // Fechar com ESC
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeydown);
        }
    };
    document.addEventListener('keydown', handleKeydown);
}

// Performance para hover effects
function initCtaFinalPerformance() {
    const videoContainer = document.querySelector('.cta-video-container');
    const ctaButton = document.querySelector('.cta-final-button .btn-premium');
    
    // Otimizar transforms para GPU
    if (videoContainer) {
        videoContainer.style.willChange = 'transform';
        
        const video = videoContainer.querySelector('video');
        if (video) {
            video.style.willChange = 'transform';
        }
    }
    
    if (ctaButton) {
        ctaButton.style.willChange = 'transform';
        
        // Hover effect otimizado
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Scroll progress indicator para CTA
function initCtaScrollProgress() {
    const ctaSection = document.querySelector('#inscricao');
    
    if (!ctaSection) return;
    
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #E25042, #f26b5b);
        z-index: 9998;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.min(100, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        progressBar.style.width = scrollPercent + '%';
        
        // Remover quando chegar na CTA final
        const ctaRect = ctaSection.getBoundingClientRect();
        if (ctaRect.top <= window.innerHeight / 2) {
            progressBar.style.opacity = '0';
        } else {
            progressBar.style.opacity = '1';
        }
    });
}

// Inicialização da dobra 5
function initDobra5() {
    // Aplicar estilos iniciais para animação
    const ctaTitle = document.querySelector('.cta-final-title');
    const ctaVideo = document.querySelector('.cta-video-container');
    const ctaButton = document.querySelector('.cta-final-button');
    
    if (ctaTitle) {
        ctaTitle.style.opacity = '0';
        ctaTitle.style.transform = 'translateY(30px)';
        ctaTitle.style.transition = 'all 0.8s ease';
    }
    
    if (ctaVideo) {
        ctaVideo.style.opacity = '0';
        ctaVideo.style.transform = 'translateY(40px) scale(0.95)';
        ctaVideo.style.transition = 'all 0.8s ease';
    }
    
    if (ctaButton) {
        ctaButton.style.opacity = '0';
        ctaButton.style.transform = 'translateY(30px)';
        ctaButton.style.transition = 'all 0.8s ease';
    }
    
    // Inicializar funcionalidades
    initCtaFinalAnimations();
    initCtaFinalVideo();
    initCtaFinalPerformance();
    initCtaScrollProgress();
    
    console.log('Dobra 5 (CTA Final) carregada');
}

// Auto-inicialização quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDobra5);
} else {
    initDobra5();
}