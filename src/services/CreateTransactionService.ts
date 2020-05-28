import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    // Validação do type -> income | outcome
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Tipo inválido!');
    }

    const { total } = this.transactionsRepository.getBalance();

    // Caso de teste 3
    if (type === 'outcome' && total < value) {
      throw new Error('Saldo insuficiente!');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
