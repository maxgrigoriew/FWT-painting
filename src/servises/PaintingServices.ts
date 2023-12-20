import { http } from '@/http'

export default class PaintingServices {
  static async getAll(currentPage, limitPages) {
    console.log(currentPage, limitPages)
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
}
