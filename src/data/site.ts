export const site = {
  name: 'Jessé Oliveira',
  tagline: 'Sites, sistemas e aplicativos',
  pitch: 'Construo, coloco no ar e continuo por perto sempre que precisar.',
  url: 'https://jesseoliveira.com.br',
  city: 'Valença',
  region: 'BA',
  phoneDisplay: '(75) 98828-7627',
  whatsapp: '5575988287627',
  github: 'https://github.com/JesseLD',
} as const;

export function whatsappLink(message = 'Oi Jessé! Vim pelo seu site e queria um orçamento.') {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
