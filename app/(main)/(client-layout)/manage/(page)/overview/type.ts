export interface IAssets {
  label: string;
  value: number;
  key?: string;
}

export enum EStrategy {
  GDN = 'gmx',
  CTA = 'cta',
  LMH = 'lmh',
  PT = 'pt',
  SEA = 'sea',
  SCM = 'scm',
}

export const EStrategyMap: any = {
  [EStrategy.GDN]: 'GDN',
  [EStrategy.CTA]: 'CTA',
  [EStrategy.LMH]: 'LMH',
  [EStrategy.PT]: 'PT',
  [EStrategy.SEA]: 'SEA',
  [EStrategy.SCM]: 'SCM',
}