namespace Back_Crows.model
{
    public class Usuario
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string Documento { get; set; }

        public string TipoDocumento { get; set; }

        public DateTime DataNascimento { get; set; }

        public string Email { get; set; }

        public string Senha { get; set; }

        public string TipoUsuario { get; set; }

        public bool Ativo { get; set; }

        // chave estrangeira
        public int OrganizacaoId { get; set; }
        public Organizacao Organizacao { get; set; }

        // Relacionamentos
        public ICollection<GrupoUsuario> Grupos { get; set; }
    }
}
