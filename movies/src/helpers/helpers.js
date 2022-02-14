function spaceToUnderscore(string) {
  return string.replace(/ /g,"_");
}

function getPageName(url) {
  let arr = url && url.split('/')
  return arr?.[4];
}

export {spaceToUnderscore, getPageName};