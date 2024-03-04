export interface TodoTypes {
  id: string;
  title: string;
  completed: boolean;
}

export interface EditParamsTypes {
  todo: TodoTypes;
  onUpdateTodo: (param: Omit<TodoTypes, "completed">) => void;
  onDeleteTodo: (id: string) => void;
  isUpdateLoading?: boolean;
  isDeleteLoading?: boolean;
}
