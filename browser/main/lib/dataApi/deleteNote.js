const resolveStorageData = require('./resolveStorageData')
const _ = require('lodash')
const path = require('path')
const sander = require('sander')
const { findStorage } = require('browser/lib/findStorage')

function deleteNote (storageKey, noteKey) {
  let targetStorage
  try {
    targetStorage = findStorage(storageKey)
  } catch (e) {
    return Promise.reject(e)
  }

  return resolveStorageData(targetStorage)
    .then(function deleteNoteFile (storage) {
      let notePath = path.join(storage.path, 'notes', noteKey + '.cson')

      try {
        sander.unlinkSync(notePath)
      } catch (err) {
        console.warn('Failed to delete note cson', err)
      }
      return {
        noteKey,
        storageKey
      }
    })
}

module.exports = deleteNote
