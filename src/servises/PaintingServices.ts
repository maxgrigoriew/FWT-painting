import { http } from '@/http';

export default class PaintingServices {
  static async getPaintings(
    currentPage?: number,
    limitPages?: number,
    searchQuery?: string,
    authorId?: number | null,
    locationId?: number | null,
    createdSelectFrom?: string,
    createdSelectBefore?: string
  ) {
    const params = {
      _page: currentPage,
      _limit: limitPages,
      q: searchQuery,
      authorId: authorId,
      locationId: locationId,
      created_gte: createdSelectFrom,
      created_lte: createdSelectBefore
    };

    for (const item in params) {
      if (!params[item as keyof typeof params]) {
        delete params[item as keyof typeof params];
      }
    }

    return http.get('/paintings', {
      params
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
      PaintingServices.getPaintings(),
      PaintingServices.getAuthors(),
      PaintingServices.getLocations()
    ]);
    return [paintings, authors, locations];
  }
}
