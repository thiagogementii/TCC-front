import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private carroIdSubject = new BehaviorSubject<number | null>(null);
  public carroId$ = this.carroIdSubject.asObservable();

  constructor() { }

  abrirDetalhes(carroId: number) {
    this.carroIdSubject.next(carroId);
  }

  fechar() {
    this.carroIdSubject.next(null);
  }

  get isAberto(): boolean {
    return this.carroIdSubject.value !== null;
  }
}

