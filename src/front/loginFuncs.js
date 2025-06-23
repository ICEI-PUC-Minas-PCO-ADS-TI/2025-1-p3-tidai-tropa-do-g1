import api from "../services/api";

export async function loginUser(credentials) {
  const { email, senha, organizacao } = credentials;

  if (!email || !senha || !organizacao) {
    throw new Error("E-mail, senha e organização são obrigatórios.");
  }

  try {
    const response = await api.post("/usuarios/login", {
      email: email.trim().toLowerCase(),
      senha: senha,
      organizacao: organizacao.trim(),
    });

    const { usuario, token } = response.data;

    if (usuario && token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return usuario;
    } else {
      throw new Error("Resposta da API inválida após o login.");
    }
  } catch (error) {
    console.error(
      "Erro ao fazer login:",
      error.response?.data || error.message
    );

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 400)
    ) {
      throw new Error(
        error.response.data.message || "Login, senha ou organização incorretos."
      );
    } else {
      throw new Error(
        "Erro de comunicação com o servidor. Tente novamente mais tarde."
      );
    }
  }
}

export function logoutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("usuarioLogado");
  delete api.defaults.headers.common["Authorization"];
}
