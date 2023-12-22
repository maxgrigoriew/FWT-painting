import { http } from '@/http';

export default class PaintingServices {
  static async getPaintings(
    currentPage = 1,
    limitPages = 12,
    searchQuery = '',
    authorId = 1
  ) {
    return http.get('/paintings', {
      params: {
        _page: currentPage,
        _limit: limitPages,
        q: searchQuery,
        authorId: authorId
      }
    });
  }

  static async getAuthors() {
    return http.get('/authors');
  }

  static async getLocations() {
    return http.get('/locations');
  }

  static async getAll() {
    const [paintings, authors, locations] = await Promise.all([
      PaintingServices.getPaintings(1, 12, '', 1),
      PaintingServices.getAuthors(),
      PaintingServices.getLocations()
    ]);
    return [paintings, authors, locations];
  }
}
