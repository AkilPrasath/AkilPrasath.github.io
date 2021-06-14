'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "9600d9c47e9cb2ec8641279ef201e79a",
"assets/assets/images/akil.jpg": "3a15d9716ab8f4eab97db3c00c256eaf",
"assets/assets/images/coffee.jpg": "1e60feb097ca6ec332b6d75752203538",
"assets/assets/images/cybertechz.jpg": "46e58c78f51c08d7ea87a195cac2b82a",
"assets/assets/images/cybertechz1.jpg": "41dc95b1a22ea8a0c3a515e6f88533f7",
"assets/assets/images/favicon.png": "364e70ef978b1d7f4a704314f7d014ef",
"assets/assets/images/forge.jpg": "3856f394129a87610e68ab4d46df79b8",
"assets/assets/images/hackoff.jpg": "ac530819aa08479711ea175167918eb5",
"assets/assets/images/mobileapp.png": "dd728fde350bbcb2268aebf814d221fb",
"assets/assets/images/opencv.jpg": "a1e541d1b105922e5e26700d640bee7a",
"assets/assets/images/pair%2520program.jpg": "83f41cf1130d795a0d5750abe31848c6",
"assets/assets/images/puzzle.png": "a57fc8a8ca0e030de8d494194e03961f",
"assets/assets/images/team%2520work.jpg": "9a5e45495e4993b336a4c3295622a64a",
"assets/assets/images/tech/Api.png": "cfe0f7253cbe4060499cc241346f3bf7",
"assets/assets/images/tech/C.png": "0d672f2040922c1e2ea99cf4163bc4bb",
"assets/assets/images/tech/Dart.png": "96a744d46a8bede4bbb1bdb0dd2dc3d7",
"assets/assets/images/tech/Firebase.png": "871a1a35847549f71c7d6d34078a8778",
"assets/assets/images/tech/Flutter.png": "d165760a12f332e7485ef1bcced4161c",
"assets/assets/images/tech/Git.png": "d4c62a53fd355336bad5ea3d48881410",
"assets/assets/images/tech/Github.png": "453bb211708b1eaef12c08d9fefb66d3",
"assets/assets/images/tech/Java.png": "b5025211c49039bf9f422d0c104abb76",
"assets/assets/images/tech/Mongodb.png": "e47ee4423004b9028297ebba7634c9d9",
"assets/assets/images/tech/Mysql.png": "5b42c2d107185f31a963f0cecbfaeade",
"assets/assets/images/tech/Nodejs.png": "a543e1ebd54bd92a69d520e5d20f61a3",
"assets/assets/images/tech/Python.png": "4d9ffb35ba26f5504fa8020926ba324d",
"assets/assets/images/tech/Raspberrypi.png": "58f9174686ddd8904669fb0dc7652c9a",
"assets/assets/images/tech/Web.png": "9750d626eab4d136b37095a202b8c969",
"assets/assets/images/time.jpg": "3d287b0808e97e7ed8a0a85252f57158",
"assets/assets/images/vishwakarma.jpg": "e6e0d07453ebc7e7bc93a7aec908bd33",
"assets/assets/images/website.png": "fc24cf174b5ebd1d29c745357e13573c",
"assets/assets/lotties/developer_lottie.json": "bdbd4bedf6055718ba945b9ae55613ad",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "9465b6aa476f7c5d2051d443e335d234",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "3241d1d9c15448a4da96df05f3292ffe",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "eaed33dc9678381a55cb5c13edaf241d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "ffed6899ceb84c60a1efa51c809a57e4",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "1dfc23b22d48b92d8bfecef4753441db",
"/": "1dfc23b22d48b92d8bfecef4753441db",
"main.dart.js": "0c0669f687bad5a2d33b5bb1631b271a",
"manifest.json": "7a06224843491d669ba4f4edd0b7d7e1",
"version.json": "bdbcb5d5f5cbff75a03044ee06ab5cb2"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
