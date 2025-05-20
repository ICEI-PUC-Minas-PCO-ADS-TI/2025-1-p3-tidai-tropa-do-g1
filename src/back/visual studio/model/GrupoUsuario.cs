namespace Back_Crows.model
{
    // Tabela de associação entre usuários e grupos N:N
    public class GrupoUsuario
    {
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        public int GrupoId { get; set; }
        public Grupo Grupo { get; set; }
    }
}
