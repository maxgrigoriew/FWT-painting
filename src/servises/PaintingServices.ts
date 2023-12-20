import { http } from '@/http'

export default class PaintingServices {
  static async getPaintings(currentPage = 1, limitPages = 10) {
    return http.get('/paintings', {
      params: {
        _page: currentPage,
        _limit: limitPages
      }
    })
  }

  static async getAuthors() {
    return http.get('/authors')
  }

  static async getLocations() {
    return http.get('/locations')
  }

  static async getAll() {
    const [paintings, authors, locations] = await Promise.all([
      PaintingServices.getPaintings(),
      PaintingServices.getAuthors(),
      PaintingServices.getLocations()
    ])
    return [paintings, authors, locations]
  }
}
