import axios from 'axios'

const url = 'api/persons'

const getAll = () => axios.get(url).then(res => res.data)

const createOne = (person) => axios.post(url, person).then(res => res.data)

const updateOne = (id, person) => axios.put(`${url}/${id}`, person).then(res=>res.data)

const deleteOne = id => axios.delete(`${url}/${id}`)


export default {getAll, createOne, updateOne, deleteOne}