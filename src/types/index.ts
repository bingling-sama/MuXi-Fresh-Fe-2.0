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

export type TableType = {
  name: string;
  grade: string;
  college: string;
  status: string;
  user_id: string;
  key: string;
  group: string;
  task_id: string;
  avatar: string;
  email: string;
};

export type CommentType = {
  avatar: string;
  nickname: string;
  content: string;
  group: string;
};

export type TaskInfoType = {
  title_text: string;
  content: string;
  urls: string[];
};
