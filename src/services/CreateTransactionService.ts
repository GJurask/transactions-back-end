import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (type.toLowerCase() === 'income' || type.toLowerCase() === 'outcome') {
      if (type.toLocaleLowerCase() === 'outcome') {
        const balance = this.transactionsRepository.getBalance();
        const newTotal = balance.total - value;
        if (newTotal < 0) throw Error('Cannot withdraw more than you have.');
      }

      const transaction = this.transactionsRepository.create({
        title,
        type,
        value,
      });

      return transaction;
    }

    throw Error('Invalid type. Try income or outcome');
  }
}

export default CreateTransactionService;
