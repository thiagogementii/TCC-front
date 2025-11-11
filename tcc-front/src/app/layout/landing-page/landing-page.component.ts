import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  @ViewChild('brandsWrapper') brandsWrapper!: ElementRef;

  currentSlide = 0;
  searchQuery = '';
  private autoSlideInterval: any;

  // Imagens do carrossel principal
  carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=600&fit=crop',
      alt: 'Carro esportivo vermelho',
      title: 'Encontre seu carro ideal',
      subtitle: 'As melhores ofertas em veículos seminovos e novos'
    },
    {
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=600&fit=crop',
      alt: 'Carro luxuoso preto',
      title: 'Qualidade garantida',
      subtitle: 'Veículos revisados e certificados'
    },
    {
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=600&fit=crop',
      alt: 'SUV moderno',
      title: 'Financiamento facilitado',
      subtitle: 'Condições especiais para você realizar seu sonho'
    },
    {
      url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=600&fit=crop',
      alt: 'Carro sedan elegante',
      title: 'Diversas opções',
      subtitle: 'Sedans, SUVs, hatches e muito mais'
    }
  ];

  // Marcas de carros
  carBrands = [
    {
      name: 'Toyota',
      slug: 'toyota',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Toyota_EU.svg/200px-Toyota_EU.svg.png',
      count: 45
    },
    {
      name: 'Volkswagen',
      slug: 'volkswagen',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/200px-Volkswagen_logo_2019.svg.png',
      count: 38
    },
    {
      name: 'Chevrolet',
      slug: 'chevrolet',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chevrolet_logo.svg/200px-Chevrolet_logo.svg.png',
      count: 52
    },
    {
      name: 'Ford',
      slug: 'ford',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/200px-Ford_logo_flat.svg.png',
      count: 41
    },
    {
      name: 'Fiat',
      slug: 'fiat',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Fiat_logo.svg/200px-Fiat_logo.svg.png',
      count: 35
    },
    {
      name: 'Honda',
      slug: 'honda',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/200px-Honda_Logo.svg.png',
      count: 29
    },
    {
      name: 'Hyundai',
      slug: 'hyundai',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/200px-Hyundai_Motor_Company_logo.svg.png',
      count: 33
    },
    {
      name: 'Nissan',
      slug: 'nissan',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Nissan_2020_logo.svg/200px-Nissan_2020_logo.svg.png',
      count: 27
    },
    {
      name: 'Renault',
      slug: 'renault',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Renault_2021.svg/200px-Renault_2021.svg.png',
      count: 31
    },
    {
      name: 'Jeep',
      slug: 'jeep',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Jeep_logo.svg/200px-Jeep_logo.svg.png',
      count: 22
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  // Carrossel principal
  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.carouselImages.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  // Carrossel de marcas
  scrollBrands(direction: string) {
    const wrapper = this.brandsWrapper.nativeElement;
    const scrollAmount = 300;

    if (direction === 'left') {
      wrapper.scrollLeft -= scrollAmount;
    } else {
      wrapper.scrollLeft += scrollAmount;
    }
  }

  navigateToBrand(brandSlug: string) {
    this.router.navigate(['/marca', brandSlug]);
  }
}
