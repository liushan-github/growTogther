

module.exports = {
  /**
   *
   * @Description 格式化id
   * @param id
   * @return int id
   */
  toInt(id) {
    if (typeof id === 'number') return id;
    if (!id) return id;
    return parseInt(id, 10) || 0;
  }

}
