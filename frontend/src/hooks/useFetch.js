import * as React from 'react';


export default async function useFetch(callback)
{
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() =>
    {
        (
            async function (...args)
            {
                try
                {
                    setLoading(true);
                    const response = await callback(...args);
                    setData(await response.data);
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
                    setLoading(false);
                }
            }
        )()
    }, [callback]);
    return {data, loading, error};
}
