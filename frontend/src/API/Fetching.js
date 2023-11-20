import Axios from 'axios';


class Fetching
{
    static async register(username, password, passwordAgain)
    {
        const data = {
            username: username,
            password: password,
            password_again: passwordAgain
        }
        const response = await Axios.post('http://127.0.0.1:8080/register',
            data,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        return response;
    }

    static async login(username, password)
    {
        const data = {
            username: username,
            password: password
        }
        const response = await Axios.post('http://127.0.0.1:8080/token',
            data,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response;
    }

    static async get_current_user(_token)
    {
        const response = await Axios.get('http://127.0.0.1:8080/current_user?' +
                                         new URLSearchParams({token: _token}),
        {
            headers: {
                'Accept': 'application/json'
            }
        });
        return response;
    }
}


export default Fetching;
