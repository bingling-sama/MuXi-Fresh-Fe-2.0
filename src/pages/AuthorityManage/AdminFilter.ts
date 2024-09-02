export interface AdminFilter {
  grade: string;
  group: Group;
  school: string;
  status: string;
}

export enum Group {
  All = 'All',
  // Android = 'Android',
  Backend = 'Backend',
  Design = 'Design',
  Frontend = 'Frontend',
  Product = 'Product',
}
