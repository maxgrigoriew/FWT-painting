import axios from 'axios'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  id: 'store',
  state: () => {
    return {
      limitPages: 6,
      pages: 0,
      currentPage: 2,
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
        const response = await axios.get(
          'https://test-front.framework.team/paintings',
          {
            params: {
              _page: this.currentPage,
              _limit: this.limitPages
            }
          }
        )
        console.log(this.pages)
        this.pages = Math.ceil(
          +response.headers['x-total-count'] / this.limitPages
        )
        console.log(this.pages)
        this.paintings = [...response.data]

        return response.data
      } catch (error) {
        console.log(error)
      } finally {
        setTimeout(() => {
          this.isLoading = false
        }, 500)
      }

      return
    },
    async fetchAuthors() {
      try {
        const response = await axios.get(
          'https://test-front.framework.team/authors'
        )

        this.authors = [...response.data]

        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    async fetchLocations() {
      try {
        const response = await axios.get(
          'https://test-front.framework.team/locations'
        )

        this.locations = [...response.data]

        return response.data
      } catch (error) {
        console.log(error)
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
