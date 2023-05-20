import { useState, useEffect } from 'react';

export const useVINDecoder = () => {
    const [vin, setVin] = useState();
    const [year, setYear] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState([]);
    const setInfo = (vin, year) => {
        setVin(vin);
        setYear(year);
    }
    useEffect(() => {
        if (!vin || !year) return;
        const url = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json&modelyear=${year}`
        const fetchDecode = async () => {
            try {
                setIsLoading(true);
                const data = await fetch(url);
                const results = await data.json();
                setResponse(results.Results);
                setIsLoading(false);
            } catch (e) {
                throw new e;
            }
        }
        fetchDecode();
    }, [vin, year]);

    return { response, setInfo, isLoading }
}
