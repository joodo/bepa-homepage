export const state = () => ({
  editMode: true,
})

export const mutations = {
  enableEdit (state) {
    state.editMode = true
  },
  disableEdit (state) {
    state.editMode = false
  },
}
