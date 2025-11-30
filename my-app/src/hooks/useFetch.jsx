import {useState, useEffect} from 'react';

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        let isMounted = true;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error (`Error: ${response.status}`)
                }

                const json = await response.json();

                if (isMounted) {
                    setData(json);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }
        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]);

    return {data, loading, error};
}