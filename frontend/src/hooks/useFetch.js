import * as React from 'react';


export default async function useFetch(callback)
{
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    async function fetching(...args)
    {
        try
        {
            setError('');
            setIsLoading(true);
            await callback(...args);
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
