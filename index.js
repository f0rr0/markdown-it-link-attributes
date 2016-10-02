'use strict'

// Adapted from https://github.com/markdown-it/markdown-it/blob/fbc6b0fed563ba7c00557ab638fd19752f8e759d/docs/architecture.md

function markdownitLinkAttributes (md, config) {
  config = config || {}

  var defaultRender = md.renderer.rules.link_open || this.defaultRender
  var attributes = Object.keys(config)

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    attributes.forEach(function (attr) {

      var value = config[attr]
      var aIndex = tokens[idx].attrIndex(attr)

      if (tokens[idx].attrIndex('href') >= 0) {
        var href = tokens[idx].attrs[tokens[idx].attrIndex('href')][1]
        if (aIndex < 0 && !href.startsWith('#')) { // href not #something, attr doesn't exist, add new attribute
          tokens[idx].attrPush([attr, value])
        }
      }
    })

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self)
  }
}

markdownitLinkAttributes.defaultRender = function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}

module.exports = markdownitLinkAttributes
