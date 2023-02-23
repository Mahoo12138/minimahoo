
module.exports = Behavior({
  behaviors: [],
  properties: {},
  data: {},
  methods: {
    getEventData: function ({ currentTarget }: CustomEvent) {
      return currentTarget?.dataset || {}
    }
  }
})