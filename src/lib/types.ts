export interface TodoTypes {
  id: string;
  title: string;
  completed: boolean;
}

export interface EditParamsTypes {
  title: TodoTypes['title'];
  id: TodoTypes['id'];
  onUpdateTodo: (param: Omit<TodoTypes, "completed">) => void;
  onDeleteTodo: (id: string) => void;
  isUpdateLoading?: boolean;
  isDeleteLoading?: boolean;
}
