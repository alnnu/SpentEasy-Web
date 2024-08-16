type User = {
  email: string;
  name: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
};

type SignUpError = {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
};

type AccountType = {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  userEmail: string;
};

type AccountData = {
  id: string;
  name: string;
  createdAt: string;
  userEmail: string;
};

type CategoryData = {
  id: string;
  name: string;
  createdAt: string;
  userEmail: string;
};
type TransactionCreate = {
  value: number;
  date: string;
  description: string;
  accountId: string;
  categoryId: string;
  isExpense: boolean;
};