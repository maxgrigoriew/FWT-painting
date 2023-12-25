import { defineStore } from 'pinia';
import PaintingServices from './../servises/PaintingServices';
import {
  type Author,
  type Created,
  type Location,
  type MapLocation,
  type Painting
} from './../types/index';

interface State {
  pages: number;
  currentPage: number;
  isLoading: boolean;
  fetchAll: () => void;
  setFirstPage: () => void;
  setLastPage: () => void;
  decrementPage: () => void;
  incrementPage: () => void;
  setPage: (pagination: number) => void;
  authorSelect: Author;
  setSelectAuthor: (author: Author) => void;
  locationSelect: Location;
  setSelectLocation: (location: Location | null) => void;
  createdSelect: Created;
  setSelectCreated: (created: Created) => void;
  concatArray: Painting[];
  authorId: null | number;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  mapAuthors: Author[];
  mapLocations: Location[];
  changeTheme: () => void;
  paintings: Painting[];
  limitPages: number;
  authors: Author[];
  locations: MapLocation[];
  isLightTheme: boolean;
}

export const useStore = defineStore('store', {
  state: (): State => {
    //@ts-ignore
    return {
      limitPages: 12,
      pages: 1,
      currentPage: 1,
      paintings: [],
      authors: [],
      locations: [],
      isLightTheme: false,
      isLoading: false,
      searchQuery: '',
      authorSelect: {
        id: null,
        name: ''
      },
      locationSelect: {
        id: null,
        name: ''
      },
      createdSelect: {
        from: '',
        before: ''
      }
    };
  },
  getters: {
    mapAuthors: (state) => {
      return state.authors.map((item) => ({
        id: item.id,
        name: item.name
      }));
    },
    mapLocations: (state) => {
      return state.locations.map((location: MapLocation) => ({
        id: location.id,
        name: location.location
      }));
    },
    concatArray: (state) => {
      const arrayWidthName = state.paintings.map((painting) => {
        const author = state.authors.find((author) => {
          return painting.authorId === author.id;
        });

        if (author) {
          return {
            ...painting,
            authorName: author.name
          };
        }
      });

      return arrayWidthName.map((locationArg) => {
        const location = state.locations.find(
          (local) => locationArg?.locationId === local.id
        );
        if (location) {
          return {
            ...locationArg,
            localName: location.location
          };
        }
      });
    }
  },

  actions: {
    async fetchAuthors() {
      try {
        const response = await PaintingServices.getAuthors();
        this.authors = [...response.data];
      } catch (error) {
        console.error(error);
      }
    },
    async fetchLocations() {
      try {
        const response = await PaintingServices.getLocations();
        this.locations = [...response.data];
      } catch (error) {
        console.error(error);
      }
    },

    async fetchAll() {
      try {
        this.isLoading = true;
        const [paintings, authors, locations] = await Promise.all([
          PaintingServices.getPaintings(
            this.currentPage,
            this.limitPages,
            this.searchQuery,
            this.authorSelect?.id,
            this.locationSelect?.id,
            this.createdSelect.from,
            this.createdSelect.before
          ),
          PaintingServices.getAuthors(),
          PaintingServices.getLocations()
        ]);

        this.pages = Math.ceil(
          +paintings.headers['x-total-count'] / this.limitPages
        );

        this.paintings = [...paintings.data];
        this.authors = [...authors.data];
        this.locations = [...locations.data];

        this.isLoading = false;
      } catch (e) {
        console.error(e);
      }
    },

    setPage(currentPage: number) {
      this.currentPage = currentPage;
    },
    setFirstPage() {
      this.currentPage = 1;
    },
    setLastPage() {
      this.currentPage = this.pages;
    },
    incrementPage() {
      if (this.currentPage === this.pages) return;
      this.currentPage += 1;
    },
    decrementPage() {
      if (this.currentPage === 1) {
        return;
      }
      this.currentPage -= 1;
    },
    // changeTheme() {
    //   this.isLightTheme = !this.isLightTheme;
    //   document.querySelector('body')?.classList.toggle('light-theme');
    //   localStorage.setItem('is-light-theme', this.isLightTheme);
    // },
    // setTheme() {
    //   document.querySelector('body')?.classList.toggle('light-theme');
    //   localStorage.setItem('is-light-theme', this.isLightTheme);
    // },
    setSearchQuery(value: string) {
      this.searchQuery = value;
    },
    setSelectAuthor(option: Author) {
      this.authorSelect = option;
    },
    setSelectLocation(option: Location) {
      this.locationSelect = option;
    },
    setSelectCreated(created: Created) {
      this.createdSelect = { ...created };
    }
  }
});
