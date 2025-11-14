import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ModalService } from '../../services/modal.service';
import { Carro } from '../../models/carro.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalhes-carro',
  templateUrl: './detalhes-carro.component.html',
  styleUrls: ['./detalhes-carro.component.scss']
})
export class DetalhesCarroComponent implements OnInit, OnDestroy {
  carro?: Carro;
  carregando = false;
  erro = '';
  isAberto = false;
  private subscription?: Subscription;

  constructor(
    private apiService: ApiService,
    public modalService: ModalService
  ) {}

  ngOnInit() {
    this.subscription = this.modalService.carroId$.subscribe(carroId => {
      if (carroId) {
        this.isAberto = true;
        this.carregarCarro(carroId);
      } else {
        this.isAberto = false;
        this.carro = undefined;
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  carregarCarro(id: number) {
    this.carregando = true;
    this.erro = '';

    this.apiService.obterCarroPorId(id).subscribe({
      next: (carro) => {
        this.carro = carro;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar carro:', erro);
        this.erro = 'Erro ao carregar detalhes do carro.';
        this.carregando = false;
      }
    });
  }

  fechar() {
    this.modalService.fechar();
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

