import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Marca } from '../../models/marca.model';

@Component({
  selector: 'app-carrossel-marcas',
  templateUrl: './brands-carousel.component.html',
  styleUrls: ['./brands-carousel.component.scss']
})
export class BrandsCarouselComponent {
  @ViewChild('wrapperMarcas') wrapperMarcas!: ElementRef;

  @Input() marcas: Marca[] = [];
  @Input() titulo: string = 'Marcas Disponíveis';
  @Input() subtitulo: string = 'Explore nossa seleção de veículos das melhores marcas';
  @Output() marcaSelecionada = new EventEmitter<Marca>();

  rolarMarcas(direcao: string) {
    const wrapper = this.wrapperMarcas.nativeElement;
    const quantidadeRolagem = 300;

    if (direcao === 'esquerda') {
      wrapper.scrollLeft -= quantidadeRolagem;
    } else {
      wrapper.scrollLeft += quantidadeRolagem;
    }
  }

  aoClicarMarca(marca: Marca) {
    this.marcaSelecionada.emit(marca);
  }
}
