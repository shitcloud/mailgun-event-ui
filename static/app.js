const app = new Vue({
  el: '#app',
  data: {
    events: [],
    pages: {},
    selected: {},
    
    showOpened: true,
    showDelivered: true,
    showAccepted: true,
    showFailed: true,
    filterRecipient: ''
  },

  async mounted() {
    this.getEvents()
  },

  methods: {
    async getEvents(page) {
      const response = await axios.get((page ? '/events/' + page.number : '/events') + window.location.search)
      console.log(response)
      this.events = response.data.items
      this.pages = response.data.pages
    },
    eventTag(event) {
      if (event === 'opened')
        return 'is-info'
      if (event === 'delivered')
        return 'is-success'
      if (event === 'failed')
        return 'is-danger'
      if (event === 'accepted')
        return 'is-primary'
    },
    highlight(code, language) {
      return hljs.highlight(code, { language }).value
    }
  },
  computed: {
    filteredEvents: function () { return this.events.filter(e => {
      if (!this.showOpened && e.event === 'opened')
        return false
      if (!this.showDelivered && e.event === 'delivered')
        return false
      if (!this.showAccepted && e.event === 'accepted')
        return false
      if (!this.showFailed && e.event === 'failed')
        return false
      if (this.filterRecipient !== '' && e.recipient !== this.filterRecipient)
        return false
      return true
    })}
  }
})