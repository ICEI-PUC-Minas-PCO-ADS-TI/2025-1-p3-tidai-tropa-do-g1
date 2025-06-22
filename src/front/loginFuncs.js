import api from "../services/api";

/**
 * Autentica um usuário enviando as credenciais para a API.
 * @param {object} credentials - Um objeto contendo { email, senha, organizacao }.
 * @returns {object} Os dados do usuário logado.
 * @throws {Error} Lança um erro se o login falhar.
 */
export async function loginUser(credentials) {
  const { email, senha, organizacao } = credentials;

  if (!email || !senha || !organizacao) {
    throw new Error("E-mail, senha e organização são obrigatórios.");
  }

  try {
    // 1. Envia as credenciais para um endpoint POST dedicado ao login.
    const response = await api.post("/usuarios/login", {
      email: email.trim().toLowerCase(),
      senha: senha,
      organizacao: organizacao.trim(), // Enviamos o nome/código da organização
    });

    // 2. Se o login for bem-sucedido (status 200), a API retornará os dados do usuário e o token.
    const { usuario, token } = response.data;

    if (usuario && token) {
      // 3. Armazena os dados no localStorage para uso na aplicação.
      localStorage.setItem("authToken", token); // Guarde o token!
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario)); // Guarde o objeto do usuário
      
      // Configura o token no cabeçalho do Axios para requisições futuras
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return usuario; // Retorna os dados do usuário para a página de Login
    } else {
      throw new Error("Resposta da API inválida após o login.");
    }

  } catch (error) {
    console.error("Erro ao fazer login:", error.response?.data || error.message);

    // 4. Trata erros específicos, como "Credenciais inválidas".
    if (error.response && (error.response.status === 401 || error.response.status === 400)) {
      throw new Error(error.response.data.message || "Login, senha ou organização incorretos.");
    } else {
      throw new Error("Erro de comunicação com o servidor. Tente novamente mais tarde.");
    }
  }
}

export function logoutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("usuarioLogado");
  delete api.defaults.headers.common['Authorization'];
}