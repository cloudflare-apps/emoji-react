(function () {
  'use strict'

  if (!window.addEventListener) return // Check for IE9+

  var options = INSTALL_OPTIONS
  var element
  var BUTTON_WIDTH = 52
  var BUTTON_HEIGHT = 35
  var resizeHandler

  function updateElement () {
    window.removeEventListener('resize', resizeHandler)

    element = INSTALL.createElement(options.location, element)
    element.setAttribute('app', 'emoji-react')
    element.setAttribute('data-position', options.position)

    var emojis = options.emojis.map(emoji => `:${emoji.value}:`)

    var location = INSTALL_ID === 'preview' ? INSTALL.proxy.originalURL.raw : window.location.href
    var url = location
      .replace(/(http:\/\/|https:\/\/)/gi, '')
      .replace(/^\/|\/$/g, '')

    var iframe = document.createElement('iframe')
    iframe.src = 'https://emojireact.com/embed?emojis=' + emojis.join(',') + '&url=' + url
    iframe.scrolling = 'no'
    iframe.frameBorder = '0'
    iframe.style.width = BUTTON_WIDTH * emojis.length + 'px'

    function computeHeight () {
      var computed = window.getComputedStyle(iframe)
      var computedWidth = parseInt(computed.width, 10)

      iframe.style.height = BUTTON_HEIGHT * Math.ceil(emojis.length / (computedWidth / BUTTON_WIDTH)) + 'px'
    }

    resizeHandler = computeHeight
    iframe.onload = resizeHandler

    window.addEventListener('resize', resizeHandler)

    element.appendChild(iframe)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateElement)
  } else {
    updateElement()
  }

  window.INSTALL_SCOPE = {
    setOptions: function (nextOptions) {
      options = nextOptions

      updateElement()
    },
    setPosition: function (nextOptions) {
      options = nextOptions

      element.setAttribute('data-position', options.position)
    }
  }
}())
