const axios = require("axios");
const fs = require('fs').promises
require('dotenv').config()

module.exports = async function() {
  try {
    let start = 0
    let allData = [];
    let pageSize = 25
    let total = 0
    while (start === 0 || allData.length < total) {
      const url = `http://localhost:1337/api/tapes?pagination[start]=${start}&pagination[limit]=${pageSize}&populate=*`
      response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_KEY}`
        }
      })

      const pagination  = response.data.meta.pagination;
      response.data.data.forEach(i => {
        if (!allData.find(item => item.id === i.id)) {
          allData.push(i)
        }
      })
      start=allData.length
      total = pagination.total
    }

    let mapped = allData.map(i => ({
      genre: i.genre,
      title_russian: i.title_russian,
      title_original: i.title_original,
      director: i.director,
      actors: i.actors,
      description: i.description,
      duration: i.duration,
      year: i.year,
      vhs: i.vhs,
      dvd: i.dvd,
      vcd1: i.vcd1,
      vcd2: i.vcd2,
      cover: i.cover || [],
      id: i.id
    }))
    mapped = mapped.sort((b, a)  => a.title_russian - b.title_russian);
    await fs.writeFile('./test.json', JSON.stringify(mapped, null, 2))
    return mapped;
  } catch (error) {
    console.error("Error fetching tapes:", error);
    return [];
  }
};