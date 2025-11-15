import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagina-cabecalho',
  templateUrl: './pagina-cabecalho.component.html',
  styleUrls: ['./pagina-cabecalho.component.scss']
})
export class PaginaCabecalhoComponent {
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() mostrarBotaoVoltar: boolean = true;

  @Output() voltar = new EventEmitter<void>();

  onVoltarClick(): void {
    this.voltar.emit();
  }
}
