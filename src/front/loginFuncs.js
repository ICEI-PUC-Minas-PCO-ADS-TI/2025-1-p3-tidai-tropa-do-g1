import api from "../services/api";

export async function loginUser(login, senha, organizacao) {
  try {
    const response = await api.get("/Usuarios");
    const usuarios = response.data;

    const usuario = usuarios.find(
      (u) =>
        u.email.toLowerCase() === login.toLowerCase() &&
        u.senha === senha &&
        u.organizacao.toLowerCase() === organizacao.toLowerCase()
    );

    if (usuario) {
      localStorage.setItem("usuarioLogadoId", usuario.id);
      localStorage.setItem("usuarioLogadoNome", usuario.nome);
      localStorage.setItem("usuarioLogadoEmail", usuario.email);
      localStorage.setItem("usuarioLogadoOrganizacao", usuario.organizacao);
      localStorage.setItem("perfil_foto", usuario.foto);
      return true;
    } else {
      alert("Login ou senha incorretos.");
      return false;
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    alert("Erro ao se comunicar com o servidor.");
    return false;
  }
}

/*export function loginUser(login, senha, organizacao) {
  // Busca os usuários cadastrados no localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Procura um usuário que corresponda aos campos preenchidos
  const user = usuarios.find(
    (u) =>
      u.email === login && u.senha === senha && u.organizacao === organizacao
  );

  if (user) {
    alert("Logado com sucesso!");
    localStorage.setItem("usuarioLogadoEmail", login);
    localStorage.setItem("usuarioLogadoOrganizacao", organizacao);
    return true;
  } else {
    alert("Login ou senha incorretos.");
    return false;
  }
}*/
