function findBy (list, value, column) {
  var result = []
  for (var key in list) {
    var section = list[key]
    if (section[column].includes(value)) {
      result.push(section)
    }
  }
  return result
}

export default findBy
