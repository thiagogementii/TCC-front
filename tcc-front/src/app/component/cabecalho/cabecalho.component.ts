import { Component } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent {
  // itens para o dropdown "Comprar" — usado pelo componente reutilizável
  comprarItems = [
    { label: 'Carros', route: '/comprar/carros' },
    { label: 'Motos', route: '/comprar/motos' },
    { label: 'Leilões', route: '/comprar/leiloes' }
  ];

  onComprarSelect(item: any) {
    // manipulador de seleção do dropdown — por ora apenas loga. Ajuste conforme necessidade.
    console.log('Selecionado do dropdown Comprar:', item);
  }
}
