using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_Crows.model
{
    [Table("Organizacoes")]
    public class Organizacao
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Display(Name = "Nome")]
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public string Nome { get; set; }

        [Display(Name = "CNPJ")]
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public string Cnpj { get; set; }

        [Display(Name = "Data de Criação")]
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public DateTime DataCriacao { get; set; }

        [Display(Name = "Ramo")]
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public string Ramo { get; set; }

        [Display(Name = "Telefone")]
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public string Telefone { get; set; }

        [Display(Name = "CEP")]
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public string Cep { get; set; }

        [Display(Name = "E-mail")]
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [EmailAddress(ErrorMessage = "O campo {0} não é um endereço de e-mail válido.")]
        public string Email { get; set; }

        [Display(Name = "Senha")]
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        [Display(Name = "Imagem do Perfil")]
        public string? ImagemPerfil { get; set; }


        // Relacionamentos:

        public ICollection<Usuario> Usuarios { get; set; }

        public ICollection<Grupo> Grupos { get; set; }

        public ICollection<Documento> Documentos { get; set; }
    }
}
