'use strict'

const Helpers = use('Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} params
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store ({ params, request }) {
    const property = await Property.findOrFail(params.id)
  
    const images = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))
    
    if (!images.movedAll()) {
      return images.errors()
    }

    await Promise.all(
      images
        .movedList()
        .map(image => property.images().create({ path: image.fileName }))
    )
  }

  /**
   * Display a single image.
   * GET images/:path
   * 
   * @param {object} params
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }
}

module.exports = ImageController
