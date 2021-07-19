import type { Config } from '@ncr-design-system/theme-utils'

export const makeCreateTypography =
  (
    { typography }: Config.Theme,
    bp: (p: keyof Config.Theme['breakpoints']) => string,
  ) =>
  (variant: keyof Config.Theme['typography']['xs'], bold = false) => {
    const data = {
      xs: typography.xs[variant],
      sm: typography.sm[variant],
      md: typography.md[variant],
      lg: typography.lg[variant],
      xl: typography.xl[variant],
    }

    const createType = (size: keyof typeof data) => ({
      fontFamily: data[size].fontFamily,
      fontSize: `${parseInt(data[size].fontSize) / 16}rem`,
      lineHeight: data[size].lineHeight,
      letterSpacing: data[size].letterSpacing,
      fontWeight: parseInt(
        bold ? typography.weight.bold : data[size].fontWeight,
      ),
    })

    return {
      ...createType('xs'),
      [bp('sm')]: {
        ...createType('sm'),
      },
      [bp('md')]: {
        ...createType('md'),
      },
      [bp('lg')]: {
        ...createType('lg'),
      },
      [bp('xl')]: {
        ...createType('xl'),
      },
    }
  }
