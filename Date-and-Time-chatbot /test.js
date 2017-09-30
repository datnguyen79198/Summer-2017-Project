const getLocation = (location) =>
  ['city', 'country']
    .map(abcd => {
      console.log(abcd);
      return location[abcd] ? location[abcd] : ''
    })
    .filter(zvc => {
      console.log(zvc);
      return !!zvc;
    })
    .join(", ");

var a = {
  "country": "Germany",
  "city": "Munich"
}

//console.log(a.country);

console.log(getLocation(a));
