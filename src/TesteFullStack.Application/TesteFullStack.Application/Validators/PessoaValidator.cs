using FluentValidation;
using TesteFullStack.Application.DTOs;

namespace TesteFullStack.Application.Validators;

public class PessoaValidator : AbstractValidator<PessoaForRegistrationDTO>
{
    public  PessoaValidator()
    {
        RuleFor(x => x.Nome)
            .NotEmpty().WithMessage("O nome é obrigatório.")
            .MaximumLength(200).WithMessage("O nome não pode ultrapassar 200 caracteres.");

        RuleFor(x => x.Idade)
            .GreaterThanOrEqualTo(0).WithMessage("A idade não pode ser negativa.");
    }
}