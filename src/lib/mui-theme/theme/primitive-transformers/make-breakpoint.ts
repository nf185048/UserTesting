import type { Config } from '@ncr-design-system/theme-utils'

export const makeCreateBreakpoints =
  ({ breakpoints }: Config.Theme) =>
  (size: keyof Config.Theme['breakpoints']) =>
    `@media screen and (min-width: ${breakpoints[size]})`
