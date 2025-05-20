namespace Back_Crows.model
{
    public class Documento
    {
        public int Id { get; set; }
        public string Tipo { get; set; }
        public string Dados { get; set; }
        public DateTime DataEnvio { get; set; }
        public bool IndexadoParaIa { get; set; }

        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        public int OrganizacaoId { get; set; }
        public Organizacao Organizacao { get; set; }
    }
}
