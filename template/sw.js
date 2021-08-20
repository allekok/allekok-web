const ver = 'v2'

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(ver).then(cache => {
			return cache.addAll([
				/* Root */
				'${relPath}',
				'${relPath}index.html',
				'${relPath}back.jpg',
				'${relPath}sw.js',
				'${relPath}site.webmanifest',

				/* App */
				'${relPath}app/allekok.js',
				'${relPath}app/main.css',
				'${relPath}app/font/DroidNaskh-Regular.woff',
				'${relPath}app/font/Material-Icons.woff2',

				/* Template */
				'${relPath}template/logo.jpg',
			])
		}))
})

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(keyList => {
			return Promise.all(keyList.map(key => {
				if(key != ver)
					return caches.delete(key)
			}))
		}))
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(res =>
			res || fetch(event.request).then(r => r)))
})
