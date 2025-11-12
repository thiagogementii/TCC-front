import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ImagemCarrossel } from '../../models/imagem-carrossel.model';

@Component({
  selector: 'app-carrossel-hero',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss']
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  @Input() imagens: ImagemCarrossel[] = [];
  @Input() intervaloAutoPlay: number = 5000; // 5 segundos
  @Input() autoPlay: boolean = true;

  slideAtual = 0;
  private intervaloSlideAutomatico: any;

  ngOnInit() {
    if (this.autoPlay && this.imagens.length > 1) {
      this.iniciarSlideAutomatico();
    }
  }

  ngOnDestroy() {
    this.pararSlideAutomatico();
  }

  iniciarSlideAutomatico() {
    this.intervaloSlideAutomatico = setInterval(() => {
      this.proximoSlide();
    }, this.intervaloAutoPlay);
  }

  pararSlideAutomatico() {
    if (this.intervaloSlideAutomatico) {
      clearInterval(this.intervaloSlideAutomatico);
    }
  }

  proximoSlide() {
    this.slideAtual = (this.slideAtual + 1) % this.imagens.length;
  }

  slideAnterior() {
    this.slideAtual = this.slideAtual === 0 ? this.imagens.length - 1 : this.slideAtual - 1;
  }

  irParaSlide(indice: number) {
    this.slideAtual = indice;
    if (this.autoPlay) {
      this.pararSlideAutomatico();
      this.iniciarSlideAutomatico();
    }
  }
}
