import type { ThemeMixinCurriedColor } from './declarations'

export const hlbothContained: ThemeMixinCurriedColor =
  theme => (props: 'primary' | 'secondary' | 'base') => {
    const { color } = theme
    const c = props !== 'base' ? color[props] : color.grey
    return {
      main: {
        boxShadow: `0px 0px 4px ${c['40']}, 0px 0px 6px ${c['40']}`,
      },
      focusVisible: {
        boxShadow: `inset 0px 0px 0px 2px ${c['60']}, inset 0px 0px 0px 4px ${c.contrastText}`,
      },
    }
  }

export const hlbothOutline: ThemeMixinCurriedColor =
  theme => (props: 'primary' | 'secondary' | 'base') => {
    const { color } = theme
    const c = props !== 'base' ? color[props] : color.grey
    return {
      main: {
        boxShadow: `0px 0px 4px 0px ${c['30']}, 0px 0px 6px ${c['40']}`,
      },
      focusVisible: {
        boxShadow: `inset 0px 0px 0px 2px ${c['40']}`,
      },
    }
  }

export const hlboth: ThemeMixinCurriedColor =
  theme => (props: 'primary' | 'secondary' | 'base') => {
    const { color } = theme
    const c = props !== 'base' ? color[props] : color.grey
    return {
      main: {
        boxShadow: `0px 0px 4px 0px ${c['30']}, 0px 0px 6px ${c['40']}`,
      },
      focusVisible: {
        boxShadow: `inset 0px 0px 0px 2px ${c['80']}`,
      },
    }
  }

export const hlgroupContained: ThemeMixinCurriedColor =
  theme =>
  (props: 'primary' | 'secondary' | 'base', fv = false) => {
    const { color } = theme
    const c = props !== 'base' ? color[props] : color.grey
    return {
      main: {
        boxShadow: `inset 0px 0px 0px ${fv ? '2' : '1'}px ${c['60']}`,
      },
      focusVisible: {
        boxShadow: `inset 0px 0px 0px 2px ${c['60']}, inset 0px 0px 0px 4px ${c['5']}`,
      },
    }
  }

export const hlgroupOutline: ThemeMixinCurriedColor =
  theme =>
  (props: 'primary' | 'secondary' | 'base', fv = false) => {
    const { color } = theme
    const c = props !== 'base' ? color[props] : color.grey
    return {
      boxShadow: `inset 0px 0px 0px ${fv ? '2' : '0'}px ${c['40']}`,
    }
  }

export const hlgroupText: ThemeMixinCurriedColor =
  theme =>
  (props: 'primary' | 'secondary' | 'base', fv = false) => {
    const { color } = theme
    const c = props !== 'base' ? color[props] : color.grey
    return {
      boxShadow: `inset 0px 0px 0px ${fv ? '2' : '0'}px ${c['30']}`,
    }
  }
