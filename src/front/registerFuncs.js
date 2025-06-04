/*** Função para validar CPF*/
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}

/**
 * Função para validar CNPJ
 */
// function validarCNPJ(cnpj) {
//     cnpj = cnpj.replace(/[^\d]+/g, '');
//     if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

//     let t = cnpj.length - 2,
//         d = cnpj.substring(t),
//         d1 = parseInt(d.charAt(0)),
//         d2 = parseInt(d.charAt(1)),
//         calc = x => {
//             let n = cnpj.substring(0, x),
//                 y = x - 7,
//                 s = 0;
//             for (let i = x; i >= 1; i--) {
//                 s += n.charAt(x - i) * y--;
//                 if (y < 2) y = 9;
//             }
//             const r = s % 11;
//             return r < 2 ? 0 : 11 - r;
//         };

//     return calc(t) === d1 && calc(t + 1) === d2;
// }

/**
 * Função para validar e-mail
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Função para validar senha
 * Mínimo 5 caracteres, 1 maiúscula, 1 minúscula
 */
function validarSenha(senha) {
  return /^(?=.*[a-z])(?=.*[A-Z]).{5,}$/.test(senha);
}

/**
 * Função para coletar os dados do formulário de cadastro e salvar no localStorage.
 */
export function handleRegisterClick() {
  const inputs = document.querySelectorAll(".register-form input");

  const [
    nomeInput,
    organizacaoInput,
    cnpjInput,
    telefoneInput,
    cpfInput,
    emailInput,
    emailConfirmInput,
    senhaInput,
    senhaConfirmInput,
  ] = inputs;

  // Verifica se os campos email e senha estão de acordo com suas confirmações
  if (emailInput.value != emailConfirmInput.value) {
    alert("Os e-mails não coincidem.");
    return;
  }
  if (senhaInput.value != senhaConfirmInput.value) {
    alert("As senhas não coincidem.");
    return;
  }

  const usuario = {
    nome: nomeInput.value,
    organizacao: organizacaoInput.value,
    cnpj: cnpjInput.value,
    telefone: telefoneInput.value,
    cpf: cpfInput.value,
    email: emailInput.value,
    senha: senhaInput.value,
  };

  // Validações
  if (!validarCPF(usuario.cpf)) {
    alert("CPF inválido.");
    return;
  }

  // if (!validarCNPJ(usuario.cnpj)) {
  //     alert("CNPJ inválido.");
  //     return;
  // }

  if (!validarEmail(usuario.email)) {
    alert("E-mail inválido.");
    return;
  }

  if (!validarSenha(usuario.senha)) {
    alert(
      "A senha deve ter no mínimo 5 caracteres, com pelo menos uma letra maiúscula e uma minúscula."
    );
    return;
  }

  // Armazena usuário se tudo estiver certo
  let usuarios = [];
  const usuariosStr = localStorage.getItem("usuarios");
  if (usuariosStr) {
    try {
      usuarios = JSON.parse(usuariosStr);
      if (!Array.isArray(usuarios)) usuarios = [];
    } catch {
      usuarios = [];
    }
  }

  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Cadastro realizado com sucesso!");

  // Limpa os campos do formulário
  inputs.forEach((input) => {
    input.value = "";
  });
}
