export interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  location: string;
  attendees: number;
  expenses: Expense[];
  totalExpense: number;
  status: "upcoming" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: number;
  item: string;
  amount: number;
  category: string;
  receipt?: string;
}

export interface EventFormData {
  title: string;
  date: string;
  description: string;
  location: string;
  expenses: Omit<Expense, "id">[];
}
