import axios from 'axios'

export const youtubeService = {
    getTop5Res,
}

//youtube api
// https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${}&q={}

async function getTop5Res({ name: searchTerm }) {
    console.log('search', searchTerm);
    const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&q=${searchTerm}
    `)
    const prettyData = prepareData(res.data)
    return prettyData
}

const prepareData = ({ items }) => {
    return items.map(item => {
        const { videoId } = item.id
        const { url: videoImg } = item.snippet.thumbnails.medium
        const { title } = item.snippet
        return { videoId, videoImg, title }
    })

    //items[0].id.videoId -< videoId
    //items[0].snippet.thumbnails.medium -> img url
    //items[0].snippet.title -> video title
}