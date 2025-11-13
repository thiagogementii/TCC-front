import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Carro } from '../../models/carro.model';

@Component({
  selector: 'app-marca-carros',
  templateUrl: './marca-carros.component.html',
  styleUrls: ['./marca-carros.component.scss']
})
export class MarcaCarrosComponent implements OnInit {
  nomeMarca = '';
  slugMarca = '';
  quantidadeCarros = 0;
  carros: Carro[] = [];
  carregando = true;

  constructor(
    private rota: ActivatedRoute,
    private router: Router,
    private localizacao: Location,
    private servicoApi: ApiService
  ) {}

  ngOnInit() {
    this.rota.params.subscribe(parametros => {
      this.slugMarca = parametros['slug'];
      this.carregarDadosMarca();
    });
  }

  carregarDadosMarca() {
    this.carregando = true;

    // Buscar informações da marca
    this.servicoApi.obterMarcaPorSlug(this.slugMarca).subscribe({
      next: (marca) => {
        if (marca) {
          this.nomeMarca = marca.nome;
          this.quantidadeCarros = marca.quantidade;
          this.carregarCarros();
        } else {
          console.error('Marca não encontrada');
          this.router.navigate(['/inicio']);
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar marca:', erro);
        this.carregando = false;
      }
    });
  }

  carregarCarros() {
    // Buscar carros da marca
    this.servicoApi.obterCarrosPorMarca(this.slugMarca).subscribe({
      next: (carros) => {
        this.carros = carros;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar carros:', erro);
        this.carregando = false;
      }
    });
  }

  voltar() {
    this.localizacao.back();
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

