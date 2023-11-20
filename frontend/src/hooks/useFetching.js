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
            try
            {
                setError(err.response.data.detail);
            }
            catch
            {
                setError(err.message);
            }
        }
        finally
        {
            setIsLoading(false);
        }
    }
    return [fetching, isLoading, error];
}


export default useFetching;
