function findBy (list, value, column) {
  return list.filter(function (item) {
    return item[column].includes(value)
  })
}

export default findBy
