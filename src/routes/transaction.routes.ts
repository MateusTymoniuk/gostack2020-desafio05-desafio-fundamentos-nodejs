import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import RetrieveTransactionService from '../services/RetrieveTransactionsService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const retrieveTransactionService = new RetrieveTransactionService(
      transactionsRepository,
    );
    const transactions = retrieveTransactionService.execute();
    return response.status(200).json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    return response.status(201).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
