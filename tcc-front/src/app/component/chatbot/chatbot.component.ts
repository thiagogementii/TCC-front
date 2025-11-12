import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Mensagem {
  texto: string;
  isBot: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  isOpen = false;
  mensagens: Mensagem[] = [];
  mensagemAtual = '';
  carregando = false;

  private webhookUrl = 'http://localhost:5678/webhook/chatbot';

  constructor(private http: HttpClient) {
    // Mensagem inicial de boas-vindas
    this.mensagens.push({
      texto: 'Olá! 👋 Como posso ajudar você hoje?',
      isBot: true,
      timestamp: new Date()
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  enviarMensagem() {
    if (!this.mensagemAtual.trim() || this.carregando) {
      return;
    }

    // Adiciona a mensagem do usuário
    const mensagemUsuario = this.mensagemAtual.trim();
    this.mensagens.push({
      texto: mensagemUsuario,
      isBot: false,
      timestamp: new Date()
    });

    // Limpa o input
    this.mensagemAtual = '';
    this.carregando = true;

    // Envia a mensagem para o webhook do n8n via GET com query parameter
    const url = `${this.webhookUrl}?message=${encodeURIComponent(mensagemUsuario)}`;

    this.http.get<any>(url)
      .subscribe({
        next: (resposta) => {
          console.log('Resposta do webhook:', resposta);
          // Adiciona a resposta do bot - tente diferentes propriedades que o n8n pode retornar
          const textoResposta = resposta.message || resposta.response || resposta.reply || resposta.output || resposta.text || JSON.stringify(resposta);

          this.mensagens.push({
            texto: textoResposta,
            isBot: true,
            timestamp: new Date()
          });
          this.carregando = false;
        },
        error: (erro) => {
          console.error('Erro ao enviar mensagem:', erro);
          this.mensagens.push({
            texto: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
            isBot: true,
            timestamp: new Date()
          });
          this.carregando = false;
        }
      });
  }

  tratarEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.enviarMensagem();
    }
  }

  get botaoDesabilitado(): boolean {
    return this.carregando || !this.mensagemAtual || this.mensagemAtual.trim().length === 0;
  }
}
