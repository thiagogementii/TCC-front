import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ImagemCarrossel } from '../models/imagem-carrossel.model';
import { Marca } from '../models/marca.model';
import { Carro } from '../models/carro.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Configure sua URL base da API aqui
  private urlApi = 'http://localhost:3000/api'; // Altere para sua API

  constructor(private http: HttpClient) { }

  // ============ IMAGENS DO CARROSSEL ============
  obterImagensCarrossel(): Observable<ImagemCarrossel[]> {
    // return this.http.get<ImagemCarrossel[]>(`${this.urlApi}/imagens-carrossel`);

    // Mock temporário - substitua pela chamada real da API
    return of([
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=600&fit=crop',
        alt: 'Carro esportivo vermelho',
        titulo: 'Encontre seu carro ideal',
        subtitulo: 'As melhores ofertas em veículos seminovos e novos'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=600&fit=crop',
        alt: 'Carro luxuoso preto',
        titulo: 'Qualidade garantida',
        subtitulo: 'Veículos revisados e certificados'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=600&fit=crop',
        alt: 'SUV moderno',
        titulo: 'Financiamento facilitado',
        subtitulo: 'Condições especiais para você realizar seu sonho'
      },
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=600&fit=crop',
        alt: 'Carro sedan elegante',
        titulo: 'Diversas opções',
        subtitulo: 'Sedans, SUVs, hatches e muito mais'
      }
    ]);
  }

  // ============ MARCAS ============
  obterMarcas(): Observable<Marca[]> {
    // return this.http.get<Marca[]>(`${this.urlApi}/marcas`);

    // Mock temporário - substitua pela chamada real da API
    return of([
      {
        id: 1,
        nome: 'Toyota',
        slug: 'toyota',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Toyota_EU.svg/200px-Toyota_EU.svg.png',
        quantidade: 45
      },
      {
        id: 2,
        nome: 'Volkswagen',
        slug: 'volkswagen',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/200px-Volkswagen_logo_2019.svg.png',
        quantidade: 38
      },
      {
        id: 3,
        nome: 'Chevrolet',
        slug: 'chevrolet',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chevrolet_logo.svg/200px-Chevrolet_logo.svg.png',
        quantidade: 52
      },
      {
        id: 4,
        nome: 'Ford',
        slug: 'ford',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/200px-Ford_logo_flat.svg.png',
        quantidade: 41
      },
      {
        id: 5,
        nome: 'Fiat',
        slug: 'fiat',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Fiat_logo.svg/200px-Fiat_logo.svg.png',
        quantidade: 35
      },
      {
        id: 6,
        nome: 'Honda',
        slug: 'honda',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/200px-Honda_Logo.svg.png',
        quantidade: 29
      },
      {
        id: 7,
        nome: 'Hyundai',
        slug: 'hyundai',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/200px-Hyundai_Motor_Company_logo.svg.png',
        quantidade: 33
      },
      {
        id: 8,
        nome: 'Nissan',
        slug: 'nissan',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Nissan_2020_logo.svg/200px-Nissan_2020_logo.svg.png',
        quantidade: 27
      },
      {
        id: 9,
        nome: 'Renault',
        slug: 'renault',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Renault_2021.svg/200px-Renault_2021.svg.png',
        quantidade: 31
      },
      {
        id: 10,
        nome: 'Jeep',
        slug: 'jeep',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Jeep_logo.svg/200px-Jeep_logo.svg.png',
        quantidade: 22
      }
    ]);
  }

  obterMarcaPorSlug(slug: string): Observable<Marca | undefined> {
    // return this.http.get<Marca>(`${this.urlApi}/marcas/${slug}`);

    // Mock temporário
    return new Observable(observador => {
      this.obterMarcas().subscribe(marcas => {
        const marca = marcas.find(m => m.slug === slug);
        observador.next(marca);
        observador.complete();
      });
    });
  }

  // ============ CARROS ============
  obterCarros(): Observable<Carro[]> {
    // return this.http.get<Carro[]>(`${this.urlApi}/carros`);
    return of([]);
  }

  obterCarrosPorMarca(slugMarca: string): Observable<Carro[]> {
    // return this.http.get<Carro[]>(`${this.urlApi}/carros/marca/${slugMarca}`);

    // Mock temporário - gera carros fictícios
    return new Observable(observador => {
      this.obterMarcaPorSlug(slugMarca).subscribe(marca => {
        if (!marca) {
          observador.next([]);
          observador.complete();
          return;
        }

        const carros = this.gerarCarrosMock(marca.nome, marca.quantidade);
        observador.next(carros);
        observador.complete();
      });
    });
  }

  buscarCarros(consulta: string): Observable<Carro[]> {
    // return this.http.get<Carro[]>(`${this.urlApi}/carros/buscar?q=${consulta}`);
    return of([]);
  }

  // ============ HELPER - REMOVER QUANDO INTEGRAR API REAL ============
  private gerarCarrosMock(nomeMarca: string, quantidade: number): Carro[] {
    const modelos = ['Sedan', 'SUV', 'Hatch', 'Pick-up', 'Crossover'];
    const transmissoes = ['Manual', 'Automático', 'CVT'];
    const imagens = [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=400&h=300&fit=crop'
    ];

    const carros: Carro[] = [];
    for (let i = 0; i < Math.min(quantidade, 12); i++) {
      carros.push({
        id: i + 1,
        nome: `${nomeMarca} ${modelos[i % modelos.length]} ${2018 + (i % 5)}`,
        nomeMarca: nomeMarca,
        ano: 2018 + (i % 5),
        preco: 45000 + (i * 5000) + Math.random() * 10000,
        km: 20000 + (i * 5000) + Math.random() * 30000,
        transmissao: transmissoes[i % transmissoes.length],
        imagem: imagens[i % imagens.length]
      });
    }
    return carros;
  }
}
