import { prepareMixins } from './helpers'
import {
  hlboth,
  hlbothContained,
  hlbothOutline,
  hlgroupContained,
  hlgroupOutline,
  hlgroupText,
} from './mixin-highlight'

const allMixins = {
  hlboth,
  hlbothOutline,
  hlbothContained,
  hlgroupContained,
  hlgroupOutline,
  hlgroupText,
}

export const getMixins = prepareMixins(allMixins)
