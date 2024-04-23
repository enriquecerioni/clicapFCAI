export const sidebarOptions = [
  //1-Admin 2-Docente Investigador  3-Evaluador 4-Estudiante
  {
    section: "Listas",
    options: [
      {
        name: "Listado de usuarios",
        icon: "fa-solid fa-users",
        redirection: "/users",
        roles: [1],
      },
      {
        name: "Listado de trabajos",
        icon: "fa-solid fa-file",
        redirection: "/jobs",
        roles: [1],
      },
      {
        name: "Listado de pagos",
        icon: "fa-solid fa-wallet",
        redirection: "/pays",
        roles: [1],
      },
      {
        name: "Listado de constancias de AR",
        icon: "fa-solid fa-list-check",
        redirection: "/certificates",
        roles: [1],
      },
      {
        name: "Listado de Certificados Otorgados",
        icon: "fa-solid fa-list-check",
        redirection: "/certificates-awarded",
        roles: [1],
      },
      {
        name: "Generar certificados",
        icon: "fa-solid fa-user-graduate",
        redirection: "/generate-certificate",
        roles: [1],
      },
      {
        name: "Configuración",
        icon: "fa-solid fa-gear",
        redirection: "/configuration",
        roles: [1],
      },
      {
        name: "Trabajos asignados",
        icon: "fa-solid fa-file",
        redirection: "/jobs",
        roles: [2],
      },
      {
        name: "Mis trabajos",
        icon: "fa-solid fa-file",
        redirection: "/myjobs",
        roles: [2, 3, 4],
      },

      {
        name: "Mis pagos",
        icon: "fa-solid fa-wallet",
        redirection: "/mypays",
        roles: [2, 3, 4],
      },

      {
        name: "Constancia de alumno regular",
        icon: "fa-solid fa-list-check",
        redirection: "/student",
        roles: [4],
      },

      {
        name: "Mis certificados",
        icon: "fa-solid fa-user-graduate",
        redirection: "/mycertificates",
        roles: [2, 3, 4],
      },
    ],
  },
];
