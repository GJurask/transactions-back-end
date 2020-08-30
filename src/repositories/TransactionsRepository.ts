import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  // eslint-disable-next-line class-methods-use-this
  public all(): Transaction[] {
    if (this.transactions.length === 0) {
      throw Error('No transactions were made');
    }
    return this.transactions;
  }

  // eslint-disable-next-line class-methods-use-this
  public getBalance(): Balance {
    /*
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    // eslint-disable-next-line array-callback-return
    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        balance.income += transaction.value;
        balance.total += transaction.value;
      } else {
        balance.outcome += transaction.value;
        balance.total -= transaction.value;
      }
    });
      */
    const balance = this.transactions.reduce(
      (accumulator: Balance, transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }

        accumulator.total = accumulator.income - accumulator.outcome;
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  // eslint-disable-next-line class-methods-use-this
  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
