# Bella Casa Verde Floricultura — Website Institucional

Website institucional premium para a **Bella Casa Verde Floricultura**, localizada em Paraíso do Tocantins — TO.

## Estrutura

```
/
├── index.html        # Página principal (todas as seções)
├── css/style.css     # Identidade visual (paleta, tipografia, layout)
├── js/main.js        # Interações (menu, formulário, galeria)
├── robots.txt        # SEO
├── sitemap.xml       # SEO
└── Identidade visual # Documento com as diretrizes da marca (fonte)
```

## Tecnologias

- HTML5, CSS3 e JavaScript puro (sem dependências externas, apenas Google Fonts).
- Totalmente responsivo (computador, tablet e smartphone).
- SEO on-page: meta tags, Open Graph, dados estruturados (JSON-LD / Florist), sitemap e robots.txt.
- Acessibilidade: navegação por teclado, labels, foco visível, textos alternativos.

## Como as fontes foram aplicadas

As fontes originais indicadas (Catchy Mager e Steak and Cheese) não estão disponíveis no Google Fonts. Conforme orientado no briefing, foram usadas alternativas visualmente semelhantes:

| Função na marca | Fonte indicada | Fonte aplicada |
|---|---|---|
| Funcional / legível (menus, textos, botões, formulários, rodapé) | Montserrat | Montserrat |
| Autoral / elegante (títulos, chamadas) | Catchy Mager | Playfair Display |
| Manuscrita (frases decorativas, assinaturas) | Steak and Cheese | Great Vibes |

## WhatsApp / Orçamento

- Número: +55 63 3602-7339 → `wa.me/556336027339`
- O formulário valida os campos (nome ≥ 2 caracteres, telefone com máscara brasileira, e-mail opcional mas validado se preenchido, produto e mensagem obrigatórios) e abre o WhatsApp com a mensagem personalizada.

## Conteúdos pendentes (placeholders claramente identificados)

Para não publicar informações fictícias, os seguintes itens aguardam material oficial da empresa:

- **Logotipo oficial** em formato digital
- **Fotos** da loja, fachada e interior
- **Fotos** de Hélia Maria e Fernando
- **Fotos** dos produtos e arranjos
- **Depoimentos** reais de clientes (com autorização)
- **URL oficial do Facebook** (o link está marcado como "em breve")
- **Link/coordenadas do Google Maps** confirmados (o mapa usa um placeholder e o endereço em texto)

Cada placeholder está identificado no HTML/CSS com o texto entre colchetes, ex.: `[ Foto da loja ]`.

## Como hospedar

1. Suba todo o conteúdo para seu provedor (ou plataforma de hosting estático).
2. Substitua o domínio de exemplo (`bellacasaverde.com.br`) pelo domínio oficial.
3. Atualize `robots.txt`, `sitemap.xml` e a tag `<link rel="canonical">` com o domínio final.
4. Substitua os placeholders pelas fotos oficiais e pela URL do Facebook.
5. Ao confirmar a localização no Google Maps, substitua o placeholder do mapa pelo iframe oficial.
