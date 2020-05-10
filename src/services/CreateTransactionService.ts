import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

export default class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (this.isTransactionTypeInvalid(type)) {
      throw Error('Transaction type not allowed.');
    }

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (balance.total < value) {
        throw Error(
          'Transaction value not allowed: cannot have negative balance',
        );
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }

  private isTransactionTypeInvalid(type: string): boolean {
    if (type === 'income' || type === 'outcome') {
      return false;
    }
    return true;
  }
}
