import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface DropdownItem {
  label: string;
  route?: string;
  href?: string;
  data?: any;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  /** Texto exibido no gatilho do dropdown */
  @Input() label = '';
  /** Itens do menu (route usa routerLink, href usa link externo) */
  @Input() items: DropdownItem[] = [];
  /** Abrir ao passar o mouse quando true; caso contrário abre ao clicar (útil para mobile) */
  @Input() openOnHover = true;
  /** Emite o item selecionado */
  @Output() select = new EventEmitter<DropdownItem>();

  isOpen = false;

  onToggle(event: Event) {
    // previne navegação de âncora vazia
    event.preventDefault();
    if (!this.openOnHover) {
      this.isOpen = !this.isOpen;
    }
  }

  onOpen() {
    if (this.openOnHover) this.isOpen = true;
  }

  onClose() {
    if (this.openOnHover) this.isOpen = false;
  }

  onSelect(item: DropdownItem) {
    this.select.emit(item);
    // fechar menu após seleção (comportamento comum)
    this.isOpen = false;
  }
}