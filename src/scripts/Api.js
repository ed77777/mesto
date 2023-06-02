export default class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  deleteCard(url, id) {
    fetch(this.baseUrl + url + "/" + id, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) console.log(res);
      })
      .catch((res) => console.log(res));
  }

  // setLike(url) {
  //   console.log('set like');
  //   return fetch(this.baseUrl + url, {
  //     method: "PUT",
  //     headers: this.headers,
  //   }).then((res) => {
  //     // if (res.ok) console.log(res);
  //     if (res.ok) return res.json();
  //   });
  // }

  setDeleteLike(url,methodName) {
    return fetch(this.baseUrl + url, {
      method: methodName,
      headers: this.headers,
    }).then((res) => {
      if (res.ok) return res.json();
    });
  }

  // deleteLike(url) {
  //   console.log('delete like');
  //   return fetch(this.baseUrl + url, {
  //     method: "DELETE",
  //     headers: this.headers,
  //   }).then((res) => {
  //     if (res.ok) return res.json();
  //   });
  // }

  getInitialCards(url) {
    return fetch(this.baseUrl + "/" + url, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  getUserData(url) {
    return fetch(this.baseUrl + "/" + url, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  editDataProfile(url, name, about) {
    return fetch(this.baseUrl + "/" + url, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  editAvatar(url, avatar) {
    return fetch(this.baseUrl + "/" + url, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      }),
    });
  }

  AddNewCard(url, name, link) {
    return fetch(this.baseUrl + "/" + url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}
