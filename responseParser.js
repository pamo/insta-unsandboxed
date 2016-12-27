const sanitizeUndefinedProps = (object) => (JSON.parse(JSON.stringify(object)));
const transformResponseProperties = (data) => ({
  id: data.id,
  timestamp: data.takenAt,
  width: data.originalWidth,
  images: sanitizeUndefinedProps(data.images),
  caption: data.caption,
  link: `https://www.instagram.com/p/${data.code}/`,
  location: sanitizeUndefinedProps(data.location)
});

module.exports = {
  sanitizeUndefinedProps,
  transformResponseProperties
}
