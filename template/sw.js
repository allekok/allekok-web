/* Caching static resources */
const cache_ver = 'v2';

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cache_ver).then(function(cache) {
			return cache.addAll([
				/* Root */
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
			]);
		}));
});

self.addEventListener('activate', function(event) {
	const cacheWhitelist = [cache_ver];
	event.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if(cacheWhitelist.indexOf(key) === -1)
					return caches.delete(key);
			}));
		}));
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(resp) {
			return resp || fetch(event.request).then(function(response) {
				return response;
			});
		}).catch(function() {
			return caches.match("${relPath}index.html");
		}));
});
