export interface ITabbarConfig {
  roleTabBarShow: IRoleTabBarShow[][];
  listNum: number;
}

export interface IRoleTabBarShow {
  index: number;
  ident: string;
}

export interface IThemeColorConfig {
  colorConfig: string[];
  bgColorConfig: string[];
  bdColorConfig: string[];
}

export interface ILANGUAGES {
  name: string;
  value: string;
}
