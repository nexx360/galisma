NODE_ENV=dev npm run dev
cp dist/galisma.dev.js ~/Dropbox/Cleoma/Dev/test.cleoma.fr/galisma/galisma.dev.js
scp  dist/galisma.dev.js gabriel@dev.cleoma.fr:/home/sites/test.cleoma.fr/galisma/galisma.dev.js
NODE_ENV=dev npm run build
cp dist/galisma.js ~/Dropbox/Cleoma/Dev/test.cleoma.fr/galisma/galisma.js
scp  dist/galisma.js gabriel@dev.cleoma.fr:/home/sites/test.cleoma.fr/galisma/galisma.js