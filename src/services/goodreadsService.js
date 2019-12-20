function goodreadsService() {
  function getBookById() {
    return new Promise((resolve) => {
      resolve({ description: 'our description' });
    });
  }

  return { getBookById };
}

module.exports = goodreadsService();
