import axios from 'axios'

export const wikiService = {
    getWikiData,
}

//https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${}&format=json
async function getWikiData({ name: searchWord }) {
    const res = await axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${searchWord}&format=json`)
    const prettyData = prepareData(res.data)
    return prettyData
}

const prepareData = ({ query }) => {
    // Can slice how much items you want
    return query.search.map(({ title, snippet }) => ({ title, snippet })).slice(0, 2)
    // const { title } = query.search[0]
    // const { snippet } = query.search[0]
    //query.search[0].title
    //query.search[0].snippet

}



