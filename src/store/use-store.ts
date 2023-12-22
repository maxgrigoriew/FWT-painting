import axios from 'axios';
import { defineStore } from 'pinia';

import PaintingServices from './../servises/PaintingServices';

interface Painting {
  id: number;
  authorId: string;
  created: string;
  imageUrl: string;
  locationId: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
}

interface Location {
  id: number;
  location: string;
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    fetchAll: () => void;
    fetchPaintings: (
      currentPage: number,
      limitPages: number,
      searchQuery: string,
      fetchPaintings: number
    ) => void;
    setFirstPage: () => void;
    setLastPage: () => void;
    decrementPage: () => void;
    incrementPage: () => void;
    setPage: (pagination: number) => void;
    setSelectAuthor: (author: Author) => void;
    concatArray: Painting[];
    authorId: null | number;
  }
}

export const useStore = defineStore('store', {
  id: 'painting',
  state: () => {
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
        name: null
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
      return state.locations.map((item) => ({
        id: item.id,
        name: item.location
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

      return arrayWidthName.map((painting) => {
        const location = state.locations.find(
          (local) => painting.locationId === local.id
        );
        if (location) {
          return {
            ...painting,
            localName: location.location
          };
        }
      });
    }
  },

  actions: {
    async fetchPaintings(currentPage, limitPages, searchQuery, authorId) {
      try {
        this.isLoading = true;
        const response = await PaintingServices.getPaintings(
          currentPage,
          limitPages,
          searchQuery,
          authorId
        );
        console.log(response);
        this.pages = Math.ceil(
          +response.headers['x-total-count'] / this.limitPages
        );
        this.paintings = [...response.data];
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
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
            this.authorSelect.id
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

    setPage(currentPage) {
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
    changeTheme() {
      this.isLightTheme = !this.isLightTheme;
      document.querySelector('body')?.classList.toggle('light-theme');
      localStorage.setItem('is-light-theme', this.isLightTheme);
    },
    setTheme() {
      document.querySelector('body')?.classList.toggle('light-theme');
      localStorage.setItem('is-light-theme', this.isLightTheme);
    },
    changeSearchQuery(value) {
      console.log(value);
      this.searchQuery = value;
    },
    setSelectAuthor(id: number) {
      this.authorSelect = id;
    }
  }
});
