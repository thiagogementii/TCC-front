import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() mostrarBotaoVoltar: boolean = true;
  @Input() textoBotaoVoltar: string = 'Voltar';
  @Output() voltar = new EventEmitter<void>();

  onVoltar() {
    this.voltar.emit();
  }
}
