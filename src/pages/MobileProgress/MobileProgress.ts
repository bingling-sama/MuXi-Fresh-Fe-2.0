export interface Step {
  current: number;
  status: 'wait' | 'process' | 'finish' | 'error';
}
