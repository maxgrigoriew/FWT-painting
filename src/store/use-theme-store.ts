import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => {
    return {
      isLightTheme: true
    }
  },
  actions: {
    changeTheme() {
      this.isLightTheme = !this.isLightTheme
      document.querySelector('body')?.classList.toggle('light-theme')
    }
  }
})
