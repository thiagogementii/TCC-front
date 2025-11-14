import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  voltarInicio() {
    this.router.navigate(['/inicio']);
  }

}
