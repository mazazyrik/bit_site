import '../styles/fonts.css';
import '../styles/index.css';
import '../styles/animations.css';

document.addEventListener("DOMContentLoaded", () => {
  const headerContents = document.querySelectorAll(".animation-content");
  
  headerContents.forEach((header, index) => {
      setTimeout(() => {
          header.classList.add("show-animation-content");
      }); 
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('.lazy-image');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.classList.add('visible');
        
        observer.unobserve(image);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
  });

  images.forEach(image => {
    imageObserver.observe(image);
  });
});

