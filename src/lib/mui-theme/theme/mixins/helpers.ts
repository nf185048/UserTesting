import type { Config } from '@ncr-design-system/theme-utils'

import {
  ThemeMixinBase,
  ThemeMixinCurried,
  ThemeMixinCurriedColor,
} from './declarations'

export type ReturnKeys<
  T extends {
    [key: string]:
      | ThemeMixinBase
      | ThemeMixinCurried<unknown>
      | ThemeMixinCurriedColor
  },
> = {
  [P in keyof T]: ReturnType<T[P]>
}

export const prepareMixins =
  <
    T extends {
      [key: string]:
        | ThemeMixinBase
        | ThemeMixinCurried<unknown>
        | ThemeMixinCurriedColor
    },
  >(
    mis: T,
  ) =>
  (theme: Config.Theme): ReturnKeys<T> => {
    const keys = Object.keys(mis) as (keyof typeof mis)[]
    type Mixins = ReturnKeys<typeof mis>
    const obj: Partial<Mixins> = {}
    keys.forEach(key => ((obj[key] as any) = mis[key](theme)))
    return obj as ReturnKeys<typeof mis>
  }
