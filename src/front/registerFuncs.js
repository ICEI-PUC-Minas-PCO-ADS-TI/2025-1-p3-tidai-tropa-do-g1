import api from "../services/api";

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
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarSenha(senha) {
  return /^(?=.*[a-z])(?=.*[A-Z]).{5,}$/.test(senha);
}

export async function registrarOrganizacao(formData) {
  if (!validarCPF(formData.cpf)) {
    throw new Error("CPF inválido.");
  }

  if (!validarEmail(formData.email)) {
    throw new Error("E-mail inválido.");
  }

  if (!validarSenha(formData.senha)) {
    throw new Error(
      "A senha deve ter no mínimo 5 caracteres, com pelo menos uma letra maiúscula e uma minúscula."
    );
  }

  const timestamp = Date.now();
  const dataNascimentoIso = formData.dataNascimento
    ? new Date(formData.dataNascimento).toISOString()
    : null;

  const payload = {
    nome: formData.nomeUsuario.trim(),
    documento: formData.cpf.replace(/[^\d]/g, ""),
    tipoDocumento: "CPF",
    dataNascimento: dataNascimentoIso,
    email: `teste-${timestamp}-${Math.random()
      .toString(36)
      .substring(7)}@crows.com`,
    senha: formData.senha.trim(),
    tipoUsuario: "Admin",
    ativo: true,
    foto: null,
    organizacao: {
      id: 0,
      nome: formData.nomeOrganizacao.trim(),
      cnpj: `000000000001${String(timestamp).slice(-4)}${Math.floor(
        Math.random() * 100
      )
        .toString()
        .padStart(2, "0")}`,
      dataCriacao: new Date().toISOString(),
      ramo: formData.ramo.trim(),
      telefone: formData.telefone.replace(/[^\d]/g, ""),
      cep: formData.cep.replace(/[^\d]/g, ""),
      email: `org-${timestamp}-${Math.random()
        .toString(36)
        .substring(7)}@crows.com`,
      senha: formData.senha.trim(),
      imagemPerfil: null,
    },
  };

  try {
    const response = await api.post("/Usuarios", payload);

    if (response.status === 201 || response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Erro desconhecido ao cadastrar. Status HTTP: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Erro ao cadastrar organização:", error);

    let errorMessage = "Erro ao se comunicar com o servidor.";

    if (error.response) {
      const serverData = error.response.data;
      if (serverData) {
        if (
          serverData.errors &&
          typeof serverData.errors === "object" &&
          Object.keys(serverData.errors).length > 0
        ) {
          errorMessage = "Erros de validação:\n";
          for (const key in serverData.errors) {
            if (
              serverData.errors.hasOwnProperty(key) &&
              Array.isArray(serverData.errors[key])
            ) {
              errorMessage += `- ${key}: ${serverData.errors[key].join(
                ", "
              )}\n`;
            }
          }
        } else if (typeof serverData === "string") {
          errorMessage = serverData;
        } else if (typeof serverData === "object") {
          errorMessage = serverData.message || JSON.stringify(serverData);
        }
      } else {
        errorMessage = `Erro do servidor (Status ${error.response.status}): ${error.response.statusText}`;
      }
    } else if (error.request) {
      errorMessage =
        "Erro de rede: O servidor não respondeu. Verifique sua conexão ou se o backend está online e o CORS configurado.";
    } else {
      errorMessage = "Erro inesperado: " + error.message;
    }

    throw new Error(errorMessage);
  }
}
