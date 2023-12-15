import axios from 'axios'

import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      limitPages: 6,
      pages: 0,
      currentPage: 1,
      paintings: [],
      isLightTheme: false,
      isLoading: false
    }
  },
  actions: {
    async fetchPaintings(currentPage = 1) {
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
        this.pages = Math.ceil(
          response.headers['x-total-count'] / this.limitPages
        )
        this.paintings = [...response.data]
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
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
