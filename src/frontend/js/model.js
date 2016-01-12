const {curry, append, remove, compose, replace, prop, map, ifElse, propSatisfies, equals} = require('ramda')
const { indexOf, Http, Compose } = require('./utils')
const { fold } = require('pointfree-fantasy')
const { Some, None } = require('fantasy-options')
const { Left, Right } = require('data.either')
const daggy = require('daggy')

const Url = String
const Point = Number

// mayToOpt :: Maybe a -> Option a
const mayToOpt = (m) => m.cata({Just: Some, Nothing: () => None})

// Photo :: {src :: Url, x :: Point, y :: Point }
const Photo = daggy.tagged('src', 'x', 'y')

// newPhoto :: Url -> Photo
const newPhoto = (url) => Photo(url, 0, 0)

const baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14c4ebab40155d8c54dacb0642f46d68&tags={TAGS}&extras=url_s&format=json&jsoncallback=?'

// makeUrl :: String -> Url
const makeUrl = (t) => replace("{TAGS}", t, baseUrl)

// toPhoto :: JSON -> [Photo]
const toPhoto = compose(map(compose(newPhoto, prop('url_s'))), prop('photo'), prop('photos'))

// failed :: {a} -> Either b a
const statFail = propSatisfies(equals('fail'), 'stat')

// toPhotoOrFail :: {a} -> Either b c
const toPhotoOrFail = compose(map(toPhoto), ifElse(statFail, Left, Right));

// flickrSearch :: Term -> Task Error (Either Error [Photo])
const flickrSearch = compose( map(toPhotoOrFail)
                            , Http.get
                            , makeUrl
                            )

// indexOfPhoto :: Photo -> [Photo] -> Number
const indexOfPhoto = curry((p, ps) => indexOf(p.src, ps.map(prop('src'))))

// replacePhoto :: Photo -> [Photo] -> [Photo]
const replacePhoto = curry((p, ps) => compose(fold(append(p), () => append(p, ps)),
                                              mayToOpt,
                                              map(i => remove(i, 1, ps)),
                                              indexOfPhoto(p))(ps))

// save :: [Photo] -> Task Error [Photo]
const save = Http.post('/save');

// load :: Task Error [Photo]
const load = Http.get('/photos');

module.exports = { flickrSearch, Photo, replacePhoto, save, load }

