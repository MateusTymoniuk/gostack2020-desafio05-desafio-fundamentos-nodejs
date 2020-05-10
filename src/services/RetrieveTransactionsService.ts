import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export default class RetrieveTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Response {
    const transactions = this.transactionsRepository.all();

    const balance = this.transactionsRepository.getBalance();

    return { transactions, balance };
  }
}
