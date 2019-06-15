/*!
 * @copyright: Copyright (c) 2018 Oparand Ltd - Synergixe
 *
 * @author: https://twitter.com/isocroft
 * @version: 0.0.2
 * @desc:
 * @created: 13/05/2018 
 */
 
<template>
  <svg :class="{icon: icon}">
    <use :xlink:href="`#${href}`" />
  </svg>
</template>

<script>

// let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

export default {
  name: 'Icon',
  props: {
    icon: {
      type: Boolean,
      default: true
    },
    href: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
svg {
  display: inline-block;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
}

svg.icon {
    height: 1em;
    width: 1em;
    fill: transparent;
}

</style>
