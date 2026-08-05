import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { db, now } from '../../../core/db/database';
import { RichEditorComponent, EditorChange } from '../../../shared/editor/rich-editor.component';

/**
 * Aba de documento rico — usada tanto para "Resumo" quanto para "Minhas observações".
 * Auto-save: sem botão salvar; o editor emite alterações debounced.
 */
@Component({
  selector: 'app-doc-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RichEditorComponent],
  template: `
    @if (ready()) {
      <app-rich-editor
        [content]="initialJson()"
        [placeholder]="kind === 'summary'
          ? 'Escreva seu resumo deste assunto… títulos, listas, tabelas, código, callouts.'
          : 'Anotações livres: cole links, imagens, checklists, tabelas — sem limite.'"
        minHeight="16rem"
        (changed)="save($event)" />
    } @else {
      <p class="text-sm text-faint">Carregando…</p>
    }
  `,
})
export class DocTabComponent implements OnInit {
  @Input({ required: true }) subjectId!: number;
  @Input({ required: true }) kind!: 'summary' | 'notes';

  readonly ready = signal(false);
  readonly initialJson = signal<string | null>(null);
  private docId: number | null = null;

  async ngOnInit(): Promise<void> {
    const doc = await db.docs.where('[subjectId+kind]').equals([this.subjectId, this.kind]).first();
    if (doc) {
      this.docId = doc.id!;
      this.initialJson.set(doc.json);
    }
    this.ready.set(true);
  }

  async save(change: EditorChange): Promise<void> {
    if (this.docId != null) {
      await db.docs.update(this.docId, { json: change.json, text: change.text, updatedAt: now() });
    } else {
      this.docId = await db.docs.add({
        subjectId: this.subjectId, kind: this.kind,
        json: change.json, text: change.text, updatedAt: now(),
      });
    }
  }
}
