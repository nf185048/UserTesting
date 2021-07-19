import * as React from 'react'

import { createMuiTheme } from '@material-ui/core/styles'
import makeTheme from '@ncr-design-system/theme-utils'

import { CheckboxIcon, RadioIcon } from '../icons'
import { makeCreateBreakpoints, makeCreateTypography, makeCreateUiColor } from './primitive-transformers'
import { createShadows } from './shadows'

import type { Config } from '@ncr-design-system/theme-utils'

import type { Overrides } from '@material-ui/core/styles/overrides'
import type { ComponentsProps } from '@material-ui/core/styles/props'
import type { Theme, ThemeOptions } from '@material-ui/core/styles'

/**
 * @author NCR XD Team
 * @abstract Create a Material UI Theme object, using NCR Design System tokens.
 *
 * @description This will create a Material UI theme that mimics the NCR Design System very closely, under basic use. It leaves some specific `Material` things untouched, however - to avoid compatibility issues (such as input styles).
 *
 * @param theme - the NCR DS Theme Config to use for generating the MUI Theme
 * @param overwrite - if you'd like to overwrite some of the options that this function creates by default, you can do so here, by specifying a MuiTheme options object. It will overwrite any options that this function tries to set automatically.
 * @param options - An options object that allows you to disable parts of this function's behavior. You can set 'disablePalette' for instance, and this function will fallback to your overwrite settings (or, if you don't have any, it will fall back to the MUI defaults).
 *
 * @returns {Theme} - A MUI Theme
 */
export const createTheme = (
  theme: Config.config,
  overwrite: ThemeOptions = {},
  options: {
    disablePalette?: boolean
    disableShape?: boolean
    disableTypography?: boolean
    disableShadows?: boolean
    disableOverrides?: boolean
    disableProps?: boolean
  } = {},
): Theme => {
  const opts = Object.assign(
    {
      disablePalette: false,
      disableShape: false,
      disableTypography: false,
      disableShadows: false,
      disableOverrides: false,
      disableProps: false,
    },
    options,
  )

  const t = makeTheme(theme ? theme : { color: { type: 'light' } })
  const { color, shadow, typography, radii } = t

  const use = {
    color: makeCreateUiColor(t),
    breakpoint: makeCreateBreakpoints(t),
    type: makeCreateTypography(t, makeCreateBreakpoints(t)),
  }

  const themeOverrides: Overrides = {
    MuiAppBar: {
      root: {
        borderBottom:
          t.color.type === 'light' ? color.grey['10'] : color.grey['20'],
        boxShadow: 'none',
      },
    },
    MuiButtonBase: {
      root: {
        // boxShadow: 'none',
        '&:focus-visible': {
          boxShadow: `0px 0px 1px ${color.grey['30']}`,
        },
      },
    },
    MuiMenu: {
      paper: {
        background: t.color.type === 'dark' ? '#000000' : '#ffffff',
        boxShadow:
          t.color.type === 'dark'
            ? `0 0 0 1px ${color.grey['20']}`
            : `0 0 0 1px ${color.grey['10']}, ${t.shadow.xs}`,
      },
    },
    MuiMenuItem: {
      root: {
        color: color.grey['60'],
        transition: '300ms ease color, background-color',
        '&:hover': {
          color: color.grey['80'],
          backgroundColor: color.grey['20'],
        },
        '&.Mui-selected': {
          backgroundColor: color.primary['50'],
          color: '#ffffff',
          '&:hover': {
            // background: color.grey['30'],
            backgroundColor: color.primary['40'],
            color: '#ffffff',
          },
        },
      },
    },
    // @ts-expect-error this is not yet in '@material-ui/core', so it throws an error when we include it.
    MuiAutocomplete: {
      popper: {
        background: t.color.type === 'dark' ? '#000000' : '#ffffff',
        borderRadius: t.radii.sm,
        marginTop: 8,
        boxShadow:
          t.color.type === 'dark'
            ? `0 0 0 1px ${color.grey['30']}`
            : `0 0 0 1px ${color.grey['10']}, ${t.shadow.xs}`,
      },
      option: {
        color: color.grey['60'],
        transition: '300ms ease color, background-color',
        '&[data-focus="true"]': {
          color: color.grey['80'],
          backgroundColor: color.grey['20'],
        },
        '&[aria-selected="true"]': {
          backgroundColor: color.primary['50'],
          color: '#ffffff',
          '&[data-focus="true"]': {
            // background: color.grey['30'],
            backgroundColor: color.primary['40'],
            color: '#ffffff',
          },
        },
      },
    },
    MuiFormControl: {},
    MuiFormHelperText: {
      contained: {
        marginLeft: 12,
        marginRight: 8,
        marginTop: 0,
      },
    },
  }

  const baseComponentsProps: ComponentsProps = {
    MuiAppBar: {
      color: 'primary',
    },
    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true,
      focusVisibleClassName: 'ncr-focus-visible',
    },
    MuiButton: {
      disableElevation: true,
      disableFocusRipple: true,
      disableTouchRipple: true,
      disableRipple: true,
      focusVisibleClassName: 'ncr-focus-visible',
    },
    MuiButtonGroup: {
      disableElevation: true,
      disableFocusRipple: true,
      disableRipple: true,
    },
    MuiCheckbox: {
      disableFocusRipple: true,
      disableRipple: true,
      disableTouchRipple: true,
      icon: <CheckboxIcon.Empty />,
      checkedIcon: <CheckboxIcon.Checked />,
      indeterminateIcon: <CheckboxIcon.Indeterminate />,
    },
    MuiRadio: {
      icon: <RadioIcon.Empty />,
      checkedIcon: <RadioIcon.Checked />,
    },
    MuiSwitch: {
      focusRipple: false,
    },
    MuiCard: {
      elevation: 0,
      variant: 'outlined',
    },
    MuiOutlinedInput: {
      notched: false,
    },
    MuiTextField: {
      variant: 'outlined',
    },
  }

  const transformColor = (c: keyof typeof t['color']) => {
    const keys = Object.keys(t.color[c])
    const values = Object.values(t.color[c]) as string[]
    const mappedEntries = keys.map((k: string, i: number): [
      key: string,
      value: string,
    ] => {
      const parsedKey = String(parseInt(k) * 10)
      const newKey = parsedKey === 'NaN' ? 'contrastText' : parsedKey
      const newValue =
        values[i] === 'black'
          ? '#000000'
          : values[i] === 'white'
            ? '#ffffff'
            : values[i]

      return [newKey, newValue]
    })

    return Object.fromEntries(mappedEntries)
  }

  const baseTheme: ThemeOptions = {
    palette: {
      type: t.color.type,
      primary: {
        ...use.color('primary'),
        ...transformColor('primary'),
      },
      secondary: {
        ...use.color('secondary'),
        ...transformColor('secondary'),
      },
      grey: {
        ...transformColor('grey'),
      },
      success: {
        ...use.color('green'),
        ...transformColor('green'),
      },
      warning: {
        ...use.color('orange'),
        ...transformColor('orange'),
      },
      error: {
        ...use.color('red'),
        ...transformColor('red'),
      },
      info: {
        ...use.color('blue'),
        ...transformColor('blue'),
      },
      text: {
        primary: color.grey['90'],
        secondary: color.grey['60'],
        disabled: color.grey['40'],
        hint: color.grey['60'],
      },
      background: {
        default: t.color.type === 'light' ? '#ffffff' : '#050505',
        paper: color.grey['5'],
      },
      divider: t.color.type === 'light' ? color.grey['10'] : color.grey['20'],
    },
    shape: {
      borderRadius: parseInt(radii.sm),
    },
    typography: {
      fontFamily: typography.body.fontFamily,
      fontWeightRegular: parseInt(typography.weight.normal),
      fontWeightMedium: parseInt(typography.weight.bold) - 100,
      fontWeightBold: parseInt(typography.weight.xbold),
      h1: use.type('largeTitle', true),
      h2: use.type('title1', true),
      h3: use.type('title2', true),
      h4: use.type('title3', true),
      h5: use.type('headline', true),
      h6: use.type('headline'),
      button: use.type('headline'),
      body1: use.type('body'),
      body2: use.type('callout'),
      overline: use.type('callout', true),
      subtitle1: use.type('subhead'),
      subtitle2: use.type('footnote'),
      caption: use.type('caption2'),
    },
    shadows: createShadows(shadow),
  }

  const mergeOverrides = () => {
    if (!overwrite.overrides) {
      return themeOverrides as ThemeOptions['overrides']
    }

    const base: any = overwrite.overrides
    const overridesKeys = Object.keys(
      themeOverrides,
    ) as (keyof typeof themeOverrides)[]
    overridesKeys.forEach(k => {
      base[k] = Object.assign(themeOverrides[k], base[k] ? base[k] : {})
    })
    return base as ThemeOptions['overrides']
  }

  const mergeProps = () => {
    if (!overwrite.props) {
      return baseComponentsProps as ThemeOptions['props']
    }

    const base: any = overwrite.props
    const propsKeys = Object.keys(
      baseComponentsProps,
    ) as (keyof typeof baseComponentsProps)[]
    propsKeys.forEach(k => {
      base[k] = Object.assign(baseComponentsProps[k], base[k] ? base[k] : {})
    })
    return base as ThemeOptions['props']
  }

  return createMuiTheme({
    spacing: overwrite.spacing || 4,
    palette: opts.disablePalette
      ? overwrite.palette
      : Object.assign(baseTheme.palette, overwrite.palette ?? {}),
    shape: opts.disableShape
      ? overwrite.shape
      : Object.assign(baseTheme.shape, overwrite.shape ?? {}),
    typography: opts.disableTypography
      ? overwrite.typography
      : Object.assign(baseTheme.typography, overwrite.typography ?? {}),
    shadows: opts.disableShadows
      ? overwrite.shadows
      : overwrite.shadows ?? baseTheme.shadows,
    overrides: opts.disableOverrides ? overwrite.overrides : mergeOverrides(),
    props: opts.disableProps ? overwrite.props : mergeProps(),
  })
}
