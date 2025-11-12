import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barra-busca',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() titulo: string = 'Encontre o carro dos seus sonhos';
  @Input() placeholderTexto: string = 'Buscar por marca, modelo ou ano...';
  @Input() textoBotao: string = 'Buscar';
  @Output() buscar = new EventEmitter<string>();

  consultaBusca: string = '';

  aoBuscar() {
    this.buscar.emit(this.consultaBusca);
  }
}
