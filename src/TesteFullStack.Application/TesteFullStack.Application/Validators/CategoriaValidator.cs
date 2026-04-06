using FluentValidation;
using TesteFullStack.Application.DTOs;

namespace TesteFullStack.Application.Validators;

public class CategoriaValidator : AbstractValidator<CategoriaForRegistrationDTO>
{
    public CategoriaValidator()
    {
        RuleFor(x => x.Descricao)
            .NotEmpty().WithMessage("A descrição é obrigatória.")
            .MaximumLength(400).WithMessage("A descrição não pode ultrapassar 400 caracteres.");

        RuleFor(x => x.Finalidade)
            .IsInEnum().WithMessage("A finalidade informada é inválida."); // Garante que mandaram 0, 1 ou 2 do Enum
    }
}