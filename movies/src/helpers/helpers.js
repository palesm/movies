function spaceToUnderscore(string) {
  return string.replace(/ /g,"_");
}

function getPageName(url) {
  let arr = url && url.split('/')
  return arr && arr.length > 4 && arr[4];
}

export {spaceToUnderscore, getPageName};