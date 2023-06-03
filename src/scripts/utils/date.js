// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const img1 = new URL("../../images/1.png", import.meta.url);
const img2 = new URL("../../images/2.png", import.meta.url);
const img3 = new URL("../../images/3.png", import.meta.url);
const img4 = new URL("../../images/4.png", import.meta.url);
const img5 = new URL("../../images/5.png", import.meta.url);
const img6 = new URL("../../images/6.png", import.meta.url);


// const cards = [
//     { path: img1, name: "Город в пустыне" },
//     { path: img2, name: "Девушка" },
//     { path: img3, name: "Скала" },
//     { path: img4, name: "Архитектура" },
//     { path: img5, name: "Город" },
//     { path: img6, name: "Лес" },
//   ];

// const cards = [
//     { path: "./images/1.png", name: "Город в пустыне" },
//     { path: "./images/2.png", name: "Девушка" },
//     { path: "./images/3.png", name: "Скала" },
//     { path: "./images/4.png", name: "Архитектура" },
//     { path: "./images/5.png", name: "Город" },
//     { path: "./images/6.png", name: "Лес" },
//   ];

// export { cards };
