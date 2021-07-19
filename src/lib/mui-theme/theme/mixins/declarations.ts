import type { Config } from '@ncr-design-system/theme-utils'

export type ThemeMixinBase = (theme: Config.Theme) => { [key: string]: any }
export type ThemeMixinCurried<T> = (theme: Config.Theme) => T
export type CurriedMixinFn =
  | ((props: 'primary' | 'secondary' | 'base') => { [key: string]: any })
  | ((
      props: 'primary' | 'secondary' | 'base',
      fv?: boolean,
    ) => { [key: string]: any })
export type ThemeMixinCurriedColor = ThemeMixinCurried<CurriedMixinFn>
export type ThemeMixin<T = unknown> = T extends ThemeMixinBase
  ? ThemeMixinBase
  : T extends ThemeMixinCurried<infer L>
  ? ThemeMixinCurried<L>
  : T
