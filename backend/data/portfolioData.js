const perfil = {
  nome: "Ramon de Almeida Lopes",
  titulo: "Desenvolvedor Full Stack Júnior",
  bio: "Sou um desenvolvedor proativo com experiência em Back-end Java/Spring e em transição para o ecossistema JavaScript moderno (Node e React). Gosto de criar APIs eficientes e fáceis de consumir.",
  fotoUrl: "/assets/profile.jpg",
  links: {
    github: "https://github.com/ramon-lopes",
    linkedin: "http://linkedin.com/in/ramon-almeida-lopes",
  },
};

const projetos = [
  {
    id: 1,
    titulo: "App Gerenciador de Estoque",
    descricao:
      "Aplicativo mobile desenvolvido em Flutter para gerenciamento de inventário e controle de produtos. Este projeto consome uma API RESTful para persistência de dados.",
    tecnologias: ["Dart", "Flutter", "HTTP", "MVC (Model-View-Controller)"],
    linkRepo: "https://github.com/projeto1/repo",
    linkDemo: "#",
  },
  {
    id: 2,
    titulo: "API de Controle de Estoque (Back-end)",
    descricao:
      "API RESTful desenvolvida com Java e Spring Boot para gerenciar dados de produtos e inventário. Esta aplicação atua como servidor central, fornecendo dados e segurança para a aplicação mobile.",
    tecnologias: [
      "Java 17",
      "Spring Boot",
      "Maven",
      "Spring Security",
      "MySQL",
      "Hibernate",
    ],
    linkRepo: "https://github.com/ramon-lopes/estoque-api-backend.git",
    linkDemo: "#",
  },
  // Adicione seus outros projetos aqui!
];

const skills = [
  {
    categoria: "Back-end",
    lista: [
      "REST APIs",
      "Java",
      "Spring Boot",
      "SQL",
      "C# (C Sharp)",
      "Node.js",
      "Express",
    ],
  },
  {
    categoria: "Front-end",
    lista: ["HTML5", "CSS3", "Design Responsivo", "JavaScript", "React"],
  },
  {
    categoria: "Ferramentas",
    lista: [
      "Git",
      "GitHub",
      "VS Code",
      "IntelliJ",
      "Visual Studio",
      "Postman",
      "NPM",
      "Shell/PowerShell",
    ],
  },
];

const formacao = [
  {
    instituicao: "Cotil - Colégio Técnico de Limeira (Unicamp)",
    curso: "Técnico em Desenvolvimento de Sistemas",
    periodo: "2018 - 2020",
    descricao: "Formação focada em lógica de programação, banco de dados, e desenvolvimento de software. Base para linguagens como C#, Java e SQL.",
  },
];

module.exports = {
  perfil,
  projetos,
  skills,
  formacao,
};