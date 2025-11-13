import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Carro } from '../../models/carro.model';

@Component({
  selector: 'app-busca-resultados',
  templateUrl: './busca-resultados.component.html',
  styleUrls: ['./busca-resultados.component.scss']
})
export class BuscaResultadosComponent implements OnInit {
  consulta: string = '';
  carros: Carro[] = [];
  carregando: boolean = false;
  erro: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Observa mudanças nos query params
    this.route.queryParams.subscribe(params => {
      this.consulta = params['q'] || '';
      if (this.consulta) {
        this.buscarCarros();
      }
    });
  }

  buscarCarros() {
    this.carregando = true;
    this.erro = '';

    this.apiService.buscarCarros(this.consulta).subscribe({
      next: (resultados) => {
        this.carros = resultados;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao buscar carros:', erro);
        this.erro = 'Erro ao buscar carros. Tente novamente.';
        this.carregando = false;
      }
    });
  }

  novaBusca(novaBusca: string) {
    if (novaBusca.trim()) {
      this.router.navigate(['/busca'], { queryParams: { q: novaBusca } });
    }
  }

  voltarInicio() {
    this.router.navigate(['/inicio']);
  }

  formatarPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  formatarKm(km: number): string {
    return km.toLocaleString('pt-BR') + ' km';
  }
}
