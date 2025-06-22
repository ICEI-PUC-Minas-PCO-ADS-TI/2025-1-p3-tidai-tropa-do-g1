import api from "../services/api"; // Sua instância configurada do Axios

// --- Funções de Validação (recomendo mantê-las em um arquivo separado de "utils" se crescerem) ---
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarSenha(senha) {
  return /^(?=.*[a-z])(?=.*[A-Z]).{5,}$/.test(senha);
}


/**
 * Registra uma nova organização e seu primeiro usuário (administrador).
 * @param {object} formData - Os dados vindos do formulário do React.
 * @throws {Error} - Lança um erro com uma mensagem amigável em caso de falha.
 */
export async function registrarOrganizacao(formData) {
  // ... (validações iniciais de CPF, email, senha não mudam)

  // ********* NOVA ESTRUTURA DE PAYLOAD *********
  // O objeto principal agora é o Usuário, com a Organização aninhada dentro dele.
  const payload = {
    // Dados do Usuário no nível principal
    nome: formData.nomeUsuario,
    documento: formData.cpf.replace(/[^\d]/g, ""),
    tipoDocumento: "CPF",
    dataNascimento: new Date(formData.dataNascimento).toISOString(),
    email: formData.email,
    senha: formData.senha,
    tipoUsuario: "Admin",
    ativo: true,

    // Objeto da Organização aninhado
    organizacao: {
      nome: formData.nomeOrganizacao,
      cnpj: formData.cnpj.replace(/[^\d]/g, ""),
      ramo: formData.ramo,
      telefone: formData.telefone.replace(/[^\d]/g, ""),
      cep: formData.cep.replace(/[^\d]/g, ""),
      // A API pode exigir que o email/senha da organização também sejam informados aqui
      email: formData.email,
      senha: formData.senha,
    }
  };

  try {
    // ********* MUDANÇA DE ENDPOINT *********
    // A chamada agora é para o endpoint de Usuários, como no seu código original.
    const response = await api.post("/usuarios", payload);
    return response.data;
  } catch (error) {
    // A lógica de tratamento de erro continua a mesma
    console.error("Detalhes do erro da API:", error.response?.data);

    if (error.response && error.response.data) {
      const data = error.response.data;
      if (data.errors && Object.keys(data.errors).length > 0) {
        const errorMessages = Object.values(data.errors).flat().join("\n");
        throw new Error(errorMessages);
      }
      if (data.message) {
        throw new Error(data.message);
      }
    }
    
    throw new Error("Ocorreu um erro de validação não especificado pelo servidor.");
  }
}