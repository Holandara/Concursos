import { Extension, Node, mergeAttributes } from '@tiptap/core';

/** Callout (bloco de destaque estilo Notion). */
export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'paragraph+',
  defining: true,
  parseHTML() {
    return [{ tag: 'div.callout' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'callout' }), 0];
  },
});

/** Tamanho de fonte via mark textStyle (ex.: 14px, 18px, 24px). */
export const FontSize = Extension.create({
  name: 'fontSize',
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) => element.style.fontSize || null,
            renderHTML: (attributes: Record<string, unknown>) =>
              attributes['fontSize'] ? { style: `font-size: ${attributes['fontSize']}` } : {},
          },
        },
      },
    ];
  },
});
