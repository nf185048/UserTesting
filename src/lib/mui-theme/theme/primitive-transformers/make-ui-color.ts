import type { Config } from '@ncr-design-system/theme-utils'

type UIColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'red'
  | 'blue'
  | 'green'
  | 'purple'
  | 'orange'
  | 'teal'
  | 'pink'

export const makeCreateUiColor =
  ({ color }: Config.Theme) =>
  (
    key: UIColor,
  ): {
    light: string
    main: string
    dark: string
    contrastText: string
  } => {
    return {
      light: color[key]['40'],
      main: color[key]['50'],
      dark: color[key]['60'],
      contrastText: color[key].contrastText,
    }
  }
