import Axios from 'axios';


export default class TestService
{
    static async getPendingPosts() 
    {
        const response = await Axios.get('http://localhost:8080/pending_tests');
        return response;
    }

    static async register(data)
    {
        const response = await Axios.post('http://localhost:8080/register', data);
        return response;
    }
}
