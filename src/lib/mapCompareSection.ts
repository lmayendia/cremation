// utils/mapCompareSection.ts
import { RichTextContent } from '@/types';

type RawCompareSection = {
  heading: string;
  firstParagraph: Array<{ children: Array<{ text: string }> }>;
  secondParagraph: Array<{ children: Array<{ text: string }> }>;
  subscriptionPrice: number;
  oneTimePrice: number;
  nfdaLinkText: string;
  nfdaUrl: string;
  chartTitle: string;
};

export const mapCompareSection = (
  raw: RawCompareSection,
  currency: string = 'USD',
) => {
  /* tiny helper – flattens Strapi (Slate) nodes into plain HTML */
  const toHtml = (nodes: Array<{ children: Array<{ text: string }> }>) =>
    nodes
      .map((n) => n.children.map((c) => c.text).join(''))
      .join('<br />');

  const nfdaLink = `<a data-testid="${currency}" href="${raw.nfdaUrl}" target="_blank" rel="noopener noreferrer">${raw.nfdaLinkText}</a>`;

  const checklistItems: RichTextContent[] = [
    {
      type: 'html',
      content:
        'Recogido y traslado. <em>De ser necesario se llevará al Instituto de Ciencias Forenses.</em>',
    },
    { type: 'plain', content: 'Traslado a nuestras facilidades.' },
    { type: 'plain', content: 'Tramitación de toda la permisología.' },
    { type: 'plain', content: 'Proceso completo de cremación.' },
    { type: 'plain', content: 'Preparación de todas las certificaciones necesarias.' },
    { type: 'plain', content: 'Urna temporera.' },
  ];

  return {
    section1: {
      heading: raw.heading,
      firstParagraph: toHtml(raw.firstParagraph).replace('{{nfdaLink}}', nfdaLink),
      secondParagraph: toHtml(raw.secondParagraph)
        .replace('{{subscriptionPrice}}', String(raw.subscriptionPrice))
        .replace('{{oneTimePrice}}', String(raw.oneTimePrice)),
      checklistItems,
      chartTitle: raw.chartTitle,
      nfdaLinkText: raw.nfdaLinkText,
      nfdaUrl: raw.nfdaUrl,
    },
  };
};