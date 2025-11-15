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
  botDigitando = false;
  textoDigitando = '';

  private webhookUrl = 'http://localhost:5678/webhook/chatbot';
  private primeiraAbertura = true;

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.isOpen = !this.isOpen;

    // Se for a primeira vez que abre o chat, mostra a mensagem de boas-vindas com animação
    if (this.isOpen && this.primeiraAbertura) {
      this.primeiraAbertura = false;
      setTimeout(() => {
        this.animarDigitacao('Olá! 👋 Como posso ajudar você hoje?');
      }, 300); // Pequeno delay para suavizar a abertura
    }
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
          // Adiciona a resposta do bot com efeito de digitação
          const textoResposta = resposta.message || resposta.response || resposta.reply || resposta.output || resposta.text || JSON.stringify(resposta);

          this.carregando = false;
          this.animarDigitacao(textoResposta);
        },
        error: (erro) => {
          console.error('Erro ao enviar mensagem:', erro);
          this.carregando = false;
          this.animarDigitacao('Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.');
        }
      });
  }

  animarDigitacao(texto: string) {
    this.botDigitando = true;
    this.textoDigitando = '';
    let index = 0;
    const velocidade = 30; // Velocidade em ms por caractere

    // Adiciona uma mensagem vazia que será preenchida
    const mensagemIndex = this.mensagens.length;
    this.mensagens.push({
      texto: '',
      isBot: true,
      timestamp: new Date()
    });

    const intervalo = setInterval(() => {
      if (index < texto.length) {
        this.textoDigitando += texto.charAt(index);
        this.mensagens[mensagemIndex].texto = this.textoDigitando;
        index++;

        // Auto-scroll para a última mensagem
        setTimeout(() => this.scrollParaUltimaMensagem(), 0);
      } else {
        clearInterval(intervalo);
        this.botDigitando = false;
        this.textoDigitando = '';
      }
    }, velocidade);
  }

  scrollParaUltimaMensagem() {
    const chatMessages = document.querySelector('.chatbot-messages');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
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
