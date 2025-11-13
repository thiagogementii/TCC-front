import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ImagemCarrossel } from '../../models/imagem-carrossel.model';
import { Marca } from '../../models/marca.model';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  imagensCarrossel: ImagemCarrossel[] = [];
  marcasCarros: Marca[] = [];

  constructor(
    private router: Router,
    private servicoApi: ApiService
  ) {}

  ngOnInit() {
    this.carregarImagensCarrossel();
    this.carregarMarcas();
  }

  carregarImagensCarrossel() {
    this.servicoApi.obterImagensCarrossel().subscribe({
      next: (imagens) => {
        this.imagensCarrossel = imagens;
      },
      error: (erro) => {
        console.error('Erro ao carregar imagens do carrossel:', erro);
      }
    });
  }

  carregarMarcas() {
    this.servicoApi.obterMarcas().subscribe({
      next: (marcas) => {
        this.marcasCarros = marcas;
      },
      error: (erro) => {
        console.error('Erro ao carregar marcas:', erro);
      }
    });
  }

  aoBuscar(consulta: string) {
    if (consulta && consulta.trim()) {
      // Navega para página de resultados com a consulta
      this.router.navigate(['/busca'], { queryParams: { q: consulta.trim() } });
    }
  }

  aoSelecionarMarca(marca: Marca) {
    console.log('Marca selecionada:', marca);
    this.router.navigate(['/marca', marca.slug]);
  }
}
