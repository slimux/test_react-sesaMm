import axios from './axios'

const getAll = () => {
    return axios.get('/movies')
}

let movieService = {
    getAll
}


export default movieService