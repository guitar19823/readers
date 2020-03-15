const fetch = require('node-fetch');

module.exports = async (url) => {
  try {
    const { user, book } = await fetch(url)
      .then(res => res.json());

    return joinDatasById(user, book);
  } catch (e) {
    throw new Error('Не удалось получить данные');
  }
};

const joinDatasById = (usersData, booksData) => {
  const users = [{
    uid: null,
    name: 'Unknown',
    old: '-',
    books: []
  }];

  Object.keys(usersData).map(userItem => {
    users.push({...usersData[userItem], books: []});

    Object.keys(booksData).map(bookItem => {
      
      if (booksData[bookItem].uid === usersData[userItem].uid) {
        users[+userItem + 1].books.push({
          ...booksData[bookItem]
        });

          delete booksData[bookItem];
      } else if (!booksData[bookItem].hasOwnProperty('uid')) {
        users[0].books.push({
          ...booksData[bookItem]
        });
        
        delete booksData[bookItem];
      }

    });
  });

  return users;
};