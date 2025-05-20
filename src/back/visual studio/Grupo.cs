namespace Back_Crows.model
{
    public class Grupo
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string Descricao { get; set; }

        public string Tipo { get; set; }

        public int OrganizacaoId { get; set; }
        public Organizacao Organizacao { get; set; }


        public ICollection<GrupoUsuario> Usuarios { get; set; }
    }
}
