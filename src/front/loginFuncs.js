import api from "../services/api";

export async function loginUser({ email, senha, organizacao }) {
  if (!email || !senha || !organizacao) {
    throw new Error("E-mail, senha e organização são obrigatórios.");
  }

  try {
    const response = await api.get("/Usuarios");
    const usuarios = response.data;

    const usuarioEncontrado = usuarios.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.senha === senha &&
        u.organizacao &&
        u.organizacao.nome.toLowerCase() === organizacao.trim().toLowerCase()
    );

    if (usuarioEncontrado) {
      const fakeToken = "fake-token-" + Date.now();

      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

      api.defaults.headers.common["Authorization"] = `Bearer ${fakeToken}`;

      return usuarioEncontrado;
    } else {
      throw new Error("Email, senha ou organização incorretos.");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw new Error(
      "Erro de comunicação com o servidor. Tente novamente mais tarde."
    );
  }
}

export function logoutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("usuarioLogado");
  delete api.defaults.headers.common["Authorization"];
}
