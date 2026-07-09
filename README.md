# 🌈 Mundo Pequeno

Site estático voltado ao universo infantil: cuidados, alimentação, brincadeiras, galeria de fotos, desenhos para colorir e jogos interativos para bebês, crianças e adolescentes.

## 🎯 Objetivo do Projeto

Reunir em um único lugar, com visual lúdico e acolhedor, conteúdo útil e divertido para famílias: dicas práticas de cuidados e alimentação, inspiração de brincadeiras por faixa etária, uma galeria de fotos encantadora, desenhos para imprimir e colorir, e jogos que funcionam 100% no navegador.

## ✅ Funcionalidades já implementadas

### Página Inicial (`index.html`)
- Hero com colagem de fotos, estatísticas e chamadas para ação
- Seção "Sobre" com 4 cartões de destaque (Cuidados, Alimentação, Brincadeiras, Desenhos)
- Seção **Cuidados**: 6 cartões (sono, higiene, saúde bucal, segurança, desenvolvimento, bem-estar emocional)
- Seção **Alimentação**: dicas numeradas, fotos e lista de "reduza ao máximo"
- Seção **Brincadeiras**: grid com filtro por idade (Bebês / Crianças / Adolescentes)
- Preview da **Galeria** com atalho para a página completa
- Cartões de chamada para **Desenhos** e **Jogos**
- Seção **Dicas** com accordion de perguntas frequentes
- Formulário de **Newsletter** integrado à API de tabelas
- Cabeçalho fixo responsivo com menu mobile e rodapé completo

### Galeria de Fotos (`galeria.html`)
- Grade de fotos com filtros por categoria (Bebês, Brincando, Alimentação, Em Família)
- Lightbox com navegação (anterior/próximo, teclado, fechar)

### Desenhos para Colorir (`desenhos.html`)
- 8 desenhos temáticos (animais, fantasia, dinossauros, espaço, natureza)
- Botão **Ver** (abre em lightbox) e **Imprimir** (abre janela de impressão só com a imagem)
- Seção "Como imprimir" em 3 passos

### Jogos (`jogos.html`)
- 🧠 **Jogo da Memória**: 8 pares de emojis, contagem de tempo e jogadas
- 🐾 **Quiz dos Bichinhos**: 5 perguntas de múltipla escolha com pontuação final
- ❌⭕ **Jogo da Velha**: dois jogadores no mesmo dispositivo
- 🎨 **Sequência de Cores** (estilo Simon): memorize e repita a sequência, nível crescente

### Geral
- Design responsivo (mobile, tablet, desktop)
- Animações de entrada ao rolar a página (scroll reveal)
- Botão "voltar ao topo"
- Paleta de cores lúdica (amarelo, azul, rosa, verde, lilás) com tipografia Baloo 2 + Nunito
- Ícones via Font Awesome

## 🔗 Estrutura de páginas e navegação

| Página | Caminho | Descrição |
|---|---|---|
| Início | `index.html` | Hero, cuidados, alimentação, brincadeiras, dicas, newsletter |
| Início (âncoras) | `index.html#cuidados`, `#alimentacao`, `#brincadeiras`, `#dicas`, `#newsletter` | Seções específicas da home |
| Galeria | `galeria.html` | Fotos filtráveis + lightbox |
| Desenhos | `desenhos.html` | Desenhos para colorir e imprimir |
| Jogos | `jogos.html` | 4 mini-jogos interativos |

Não há parâmetros de URL/query utilizados — toda a navegação é feita por links internos e âncoras.

## 🗄️ Dados e armazenamento

O site utiliza a **RESTful Table API** fornecida pela plataforma para armazenar as inscrições da newsletter.

### Tabela: `newsletter_subscribers`
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | texto | Identificador único (gerado automaticamente) |
| `nome` | texto | Nome do responsável que se inscreveu |
| `email` | texto | E-mail de contato |
| `interesse` | texto | Área de interesse (bebês / crianças / adolescentes) |

O formulário na home (`#newsletter`) envia um `POST` para `tables/newsletter_subscribers` a cada nova inscrição.

Todos os demais dados do site (textos, dicas, cards de brincadeiras, fotos da galeria, desenhos, perguntas do quiz) são estáticos, definidos diretamente no HTML/JS — não exigem backend adicional.

## 🖼️ Recursos visuais

Todas as fotografias e ilustrações usadas são de bancos de imagens livres/CC, buscadas via ferramenta de busca de imagens integrada. Ícones: Font Awesome 6. Fontes: Google Fonts (Baloo 2 e Nunito).

## 🚧 Funcionalidades não implementadas (limitações da plataforma)

- Login/cadastro de usuários com autenticação
- Upload de fotos pelos próprios usuários/famílias
- Geração de PDF real dos desenhos (usa-se impressão direta do navegador)
- Envio automático de e-mails para a newsletter (apenas armazenamento dos dados)
- Painel administrativo para gerenciar conteúdo

Essas funcionalidades exigiriam processamento server-side, autenticação ou serviços de terceiros com chave de API, o que está fora do escopo de um site estático.

## 🔜 Próximos passos sugeridos

1. Adicionar mais desenhos para colorir e categorias na galeria
2. Criar página de "receitas saudáveis" com passo a passo ilustrado
3. Adicionar mais níveis/jogos (caça-palavras, quebra-cabeça deslizante)
4. Implementar painel simples (via tabela) para moderar inscrições da newsletter
5. Adicionar suporte a múltiplos idiomas (i18n)
6. Otimizar imagens (lazy-loading) para melhorar performance em conexões lentas

## 🛠️ Tecnologias utilizadas

- HTML5 semântico
- CSS3 (variáveis CSS, Grid, Flexbox, animações)
- JavaScript puro (vanilla) — sem frameworks
- Google Fonts (Baloo 2, Nunito)
- Font Awesome 6 (ícones)
- RESTful Table API (armazenamento da newsletter)

## 📁 Estrutura de arquivos

```
index.html          → Página inicial
galeria.html         → Galeria de fotos com lightbox
desenhos.html        → Desenhos para colorir/imprimir
jogos.html            → Jogos interativos
css/
  └── style.css      → Estilos globais e responsivos
js/
  ├── main.js        → Menu, scroll reveal, accordion, filtros, lightbox, newsletter
  ├── desenhos.js     → Lógica de visualizar/imprimir desenhos
  └── games.js        → Lógica dos 4 jogos (memória, quiz, jogo da velha, sequência de cores)
README.md            → Este documento
```

## 🚀 Publicação

Para publicar o site e obter uma URL pública, utilize a aba **Publish** da plataforma — o processo de deploy é feito automaticamente com um clique.
