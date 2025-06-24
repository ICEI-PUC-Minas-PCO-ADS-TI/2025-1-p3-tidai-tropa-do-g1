import api from "../services/api";

export async function loginUser({ email, senha, organizacao, tipoLogin }) {
  if (!email || !senha || !organizacao) {
    throw new Error("E-mail, senha e organização são obrigatórios.");
  }

  try {
    if (tipoLogin === "admin") {
      const response = await api.get("/Organizacoes");
      const organizacoes = response.data;

      const orgEncontrada = organizacoes.find(
        (o) =>
          o.email.toLowerCase() === email.trim().toLowerCase() &&
          o.senha === senha &&
          o.nome.toLowerCase() === organizacao.trim().toLowerCase()
      );

      if (orgEncontrada) {
        const token = "token-" + Date.now();
        localStorage.setItem("authToken", token);
        localStorage.setItem("usuarioLogado", JSON.stringify(orgEncontrada));
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return orgEncontrada;
      } else {
        throw new Error(
          "Email, senha ou organização incorretos para Administrador."
        );
      }
    } else {
      const response = await api.get("/Usuarios");
      const usuarios = response.data;

      const userEncontrado = usuarios.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.senha === senha &&
          u.organizacao &&
          u.organizacao.nome.toLowerCase() === organizacao.trim().toLowerCase()
      );

      if (userEncontrado) {
        const token = "token-" + Date.now();
        localStorage.setItem("authToken", token);
        localStorage.setItem("usuarioLogado", JSON.stringify(userEncontrado));
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return userEncontrado;
      } else {
        throw new Error("Email, senha ou organização incorretos para Usuário.");
      }
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw new Error(
      error.message ||
        "Erro de comunicação com o servidor. Tente novamente mais tarde."
    );
  }
}

export function logoutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("usuarioLogado");
  delete api.defaults.headers.common["Authorization"];
}
