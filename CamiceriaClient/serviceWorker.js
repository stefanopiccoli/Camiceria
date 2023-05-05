// const staticCacheName = "site-static";
// const assets = ["/", "index.html", "./fallback.html", "./images/collar.webp"];

// // INSTALL
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(staticCacheName).then((cache) => {
//       console.log("caching");
//       cache.addAll(assets);
//     })
//   );
// });

// //ACTIVATE
// self.addEventListener("activate", (event) => {
//   console.log("Service worker has been activated");
//   navigator.serviceWorker.ready.then((registration)=> {
//     registration.showNotification("hi");
//   })
// });

// //FETCH

// self.addEventListener("fetch", (event) => {
//    event.respondWith(
//     fetch(event.request)
//       .then((res) => {
//         caches.open("apis").then((cache) => cache.add(event.request).catch(e=>console.log(e,event.request,res)));
//         return res;
//       })
//       .catch(() =>
//         caches.match(event.request)
//       ).catch(()=>caches.match('/fallback.html'))
//   )
// });

