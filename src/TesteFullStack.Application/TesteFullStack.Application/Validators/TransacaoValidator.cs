using FluentValidation;
using TesteFullStack.Application.DTOs;

namespace TesteFullStack.Application.Validators;

public class TransacaoValidator : AbstractValidator<TransacaoForRegistrationDTO>
{
    public TransacaoValidator()
    {
        RuleFor(x => x.Descricao)
            .NotEmpty().WithMessage("A descrição é obrigatória.")
            .MaximumLength(400).WithMessage("A descrição não pode ultrapassar 400 caracteres.");

        RuleFor(x => x.Valor)
            .GreaterThan(0).WithMessage("O valor da transação deve ser um número positivo maior que zero.");

        RuleFor(x => x.Tipo)
            .IsInEnum().WithMessage("O tipo de transação informado é inválido.");

        RuleFor(x => x.PessoaId)
            .NotEmpty().WithMessage("É necessário informar a pessoa que realizou a transação.");

        RuleFor(x => x.CategoriaId)
            .NotEmpty().WithMessage("É necessário informar a categoria da transação.");
    }
}