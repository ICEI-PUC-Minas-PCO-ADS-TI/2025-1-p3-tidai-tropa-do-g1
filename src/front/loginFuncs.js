export function loginUser(login, senha, organizacao) {
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
}
