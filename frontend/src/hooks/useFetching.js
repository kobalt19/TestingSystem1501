import * as React from 'react';


function useFetching(callback)
{
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    async function fetching(...args)
    {
        try
        {
            setError('');
            setIsLoading(true);
            const response = await callback(...args);
            return response;
        }
        catch (err)
        {
            setError(err.response.data.detail);
        }
        finally
        {
            setIsLoading(false);
        }
    }
    return [fetching, isLoading, error];
}


export default useFetching;
