import axios from 'axios';
import {resolve} from "./resolver";
import {spaceToUnderscore} from "../helpers/helpers";

const baseUrl = "https://en.wikipedia.org/w"

export async function searchWiki(movie) {
  return await resolve(axios
    .get(`${baseUrl}/api.php?action=opensearch&search=${spaceToUnderscore(movie)}&limit=1&namespace=0&format=json&origin=*`)
    .then(res => res.data));
}

export async function getWikiContent(pageName) {
  return await resolve(axios
    .get(`${baseUrl}/api.php?action=query&prop=extracts&titles=${pageName}&exintro=&exsentences=5&explaintext=&redirects=&formatversion=2&format=json&origin=*`)
    .then(res => res.data));
}