import { http } from '@/http'

export default class PaintingServices {
  static async getAll(currentPage, limitPages) {
    return http.get('/paintings', {
      _page: currentPage,
      _limit: limitPages
    })
  }

  static async registration(email, password) {
    return http.post('/login', { email, password, confirmPassword })
  }
}
