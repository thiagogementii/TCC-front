import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ImagemCarrossel } from '../models/imagem-carrossel.model';
import { Marca } from '../models/marca.model';
import { Carro } from '../models/carro.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

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
    return this.http.get<Marca[]>(`${this.apiUrl}/marcas/`);
  }

  obterMarcaPorSlug(slug: string): Observable<Marca> {
    return this.http.get<Marca>(`${this.apiUrl}/marcas/slug/${slug}`);
  }

  // ============ CARROS ============
  obterCarros(): Observable<Carro[]> {
    return this.http.get<Carro[]>(`${this.apiUrl}/carros/`);
  }

  obterCarroPorId(id: number): Observable<Carro> {
    return this.http.get<Carro>(`${this.apiUrl}/carros/${id}`);
  }

  obterCarrosPorMarca(slugMarca: string): Observable<Carro[]> {
    // Primeiro busca a marca pelo slug para obter o ID
    return new Observable(observer => {
      this.obterMarcaPorSlug(slugMarca).subscribe({
        next: (marca) => {
          if (!marca || !marca.id) {
            observer.next([]);
            observer.complete();
            return;
          }
          // Busca todos os carros e filtra pela marca
          this.obterCarros().subscribe({
            next: (carros) => {
              const carrosFiltrados = carros.filter(c => c.marcaId === marca.id);
              observer.next(carrosFiltrados);
              observer.complete();
            },
            error: (err) => observer.error(err)
          });
        },
        error: (err) => observer.error(err)
      });
    });
  }

  buscarCarros(consulta: string): Observable<Carro[]> {
    // Busca todos os carros e filtra localmente
    // Se sua API tiver um endpoint de busca específico, ajuste aqui
    return new Observable(observer => {
      this.obterCarros().subscribe({
        next: (carros) => {
          const consultaLower = consulta.toLowerCase();
          const carrosFiltrados = carros.filter(c =>
            c.nome.toLowerCase().includes(consultaLower) ||
            c.nomeMarca?.toLowerCase().includes(consultaLower)
          );
          observer.next(carrosFiltrados);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
