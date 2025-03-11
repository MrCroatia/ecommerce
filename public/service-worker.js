// public/service-worker.js\nself.addEventListener('install', (event) => {\n  event.waitUntil(\n    caches.open('summer-shop-v1').then((cache) => {\n      return cache.addAll([\n        '/',\n        '/index.html',\n        '/favicon.ico',\n        // Add other static assets here\n      ]);\n    })\n  );\n});\n\nself.addEventListener('fetch', (event) => {\n  event.respondWith(\n    caches.match(event.request).then((response) => {\n      return response || fetch(event.request).then((fetchResponse) => {\n        // Don't cache API requests or external resources\n        if (\n          !event.request.url.includes('/api/') && \n          event.request.url.startsWith(self.location.origin)\n        ) {\n          return caches.open('summer-shop-v1').then((cache) => {\n            cache.put(event.request, fetchResponse.clone());\n            return fetchResponse;\n          });\n        }\n        return fetchResponse;\n      });\n    }).catch(() => {\n      // Fallback for offline page\n      if (event.request.mode === 'navigate') {\n        return caches.match('/');\n      }\n      return null;\n    })\n  );\n});\n\nself.addEventListener('activate', (event) => {\n  const cacheWhitelist = ['summer-shop-v1'];\n  event.waitUntil(\n    caches.keys().then((cacheNames) => {\n      return Promise.all(\n        cacheNames.map((cacheName) => {\n          if (cacheWhitelist.indexOf(cacheName) === -1) {\n            return caches.delete(cacheName);\n          }\n        })\n      );\n    })\n  );\n});