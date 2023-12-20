import axios from 'axios'
import { defineStore } from 'pinia'

import PaintingServices from './../servises/PaintingServices'

export const useStore = defineStore('store', {
  id: 'store',
  state: () => {
    return {
      limitPages: 10,
      pages: 1,
      currentPage: 3,
      paintings: [],
      authors: [],
      locations: [],
      isLightTheme: false,
      isLoading: false
    }
  },
  getters: {
    getPages: (state) => {
      return state.pages
    },
    concatArray: (state) => {
      const arrayWidthName = state.paintings.map((painting) => {
        const author = state.authors.find((author) => {
          return painting.authorId === author.id
        })

        if (author) {
          return {
            ...painting,
            authorName: author.name
          }
        }
      })

      return arrayWidthName.map((painting) => {
        const location = state.locations.find(
          (local) => painting.locationId === local.id
        )
        if (location) {
          return {
            ...painting,
            localName: location.location
          }
        }
      })
    }
  },

  actions: {
    async fetchPaintings() {
      try {
        this.isLoading = true
        const response = await PaintingServices.getAll(
          this.currentPage,
          this.limitPages
        )
        this.pages = Math.ceil(
          +response.headers['x-total-count'] / this.limitPages
        )
        this.paintings = [...response.data]
        this.isLoading = false
      } catch (error) {
        console.error(error)
      }
    },
    async fetchAuthors() {
      try {
        const response = await PaintingServices.getAuthors()
        this.authors = [...response.data]
      } catch (error) {
        console.error(error)
      }
    },
    async fetchLocations() {
      try {
        const response = await PaintingServices.getLocations()
        this.locations = [...response.data]
      } catch (error) {
        console.error(error)
      }
    },

    async fetchAllData() {
      axios
        .all([
          this.fetchPaintings(),
          this.fetchAuthors(),
          this.fetchLocations()
        ])
        .then(
          axios.spread(
            (paintings_response, authors_response, locations_response) => {
              this.paintings = [...paintings_response]
              this.authors = [...authors_response]
              this.locations = [...locations_response]
            }
          )
        )
    },

    setPage(currentPage) {
      this.currentPage = currentPage
    },
    setFirstPage() {
      this.currentPage = 1
    },
    setLastPage() {
      this.currentPage = this.pages
    },
    incrementPage() {
      if (this.currentPage === this.pages) {
        return
      }
      this.currentPage += 1
    },
    decrementPage() {
      if (this.currentPage === 1) {
        return
      }
      this.currentPage -= 1
    },
    changeTheme() {
      this.isLightTheme = !this.isLightTheme
      document.querySelector('body')?.classList.toggle('light-theme')
      localStorage.setItem('is-light-theme', this.isLightTheme)
    },
    setTheme() {
      // if ( localStorage.getItem('is-light-theme')) {

      // }
      document.querySelector('body')?.classList.toggle('light-theme')
      localStorage.setItem('is-light-theme', this.isLightTheme)
    }
  }
})
