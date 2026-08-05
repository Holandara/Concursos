import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Renderiza HTML gerado localmente pelo editor (TipTap) sem que o sanitizer
 * remova estilos inline (destaques coloridos, cores de texto, tamanhos).
 * Seguro aqui porque o conteúdo é sempre produzido pelo próprio usuário
 * no dispositivo — nunca vem de terceiros.
 */
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);
  transform(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
