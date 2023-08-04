export type GroupType =
  | 'Frontend'
  | 'Product'
  | 'Design'
  | 'Frontend'
  | 'Backend'
  | 'Android';

export type taskListType = {
  id: string;
  text: React.ReactNode;
  disabled?: boolean;
};
export type dataType = {
  key: string;
  value: GroupType;
};

export type choiceType = 'edit' | 'new' | 'user-edit' | 'user-new';
