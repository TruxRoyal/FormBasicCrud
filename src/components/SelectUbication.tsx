import { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface SelectUbicationProps {
    onUbicationChange: (data: { country: string; state: string; city: string; countryName: string; stateName: string; cityName: string }) => void;
}

interface Country {
    id: number;
    name: string;
}

interface State {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
}

export default function SelectUbication({ onUbicationChange }: SelectUbicationProps) {
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');

    const [selectedCountryName, setSelectedCountryName] = useState<string>('');
    const [selectedStateName, setSelectedStateName] = useState<string>('');
    const [selectedCityName, setSelectedCityName] = useState<string>('');

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch('/api/items/locations?type=countries');
            const data: Country[] = await response.json();
            setCountries(data);
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const fetchStates = async () => {
                const response = await fetch(`/api/items/locations?type=states&id=${selectedCountry}`);
                const data: State[] = await response.json();
                setStates(data);
                setSelectedCountryName(countries.find(country => country.id === parseInt(selectedCountry))?.name || '');
            };
            fetchStates();
        } else {
            setStates([]);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState) {
            const fetchCities = async () => {
                const response = await fetch(`/api/items/locations?type=cities&id=${selectedState}`);
                const data: City[] = await response.json();
                setCities(data);
                setSelectedStateName(states.find(state => state.id === parseInt(selectedState))?.name || '');
            };
            fetchCities();
        } else {
            setCities([]);
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedCity) {
            setSelectedCityName(cities.find(city => city.id === parseInt(selectedCity))?.name || '');
        }
    }, [selectedCity]);

    useEffect(() => {
        onUbicationChange({
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
            countryName: selectedCountryName,
            stateName: selectedStateName,
            cityName: selectedCityName
        });
    }, [selectedCountry, selectedState, selectedCity, selectedCountryName, selectedStateName, selectedCityName]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
                <label htmlFor="country" className="text-sm font-medium text-gray-700">País</label>
                <Select onValueChange={(value) => setSelectedCountry(value)} value={selectedCountry}>
                    <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Seleccione un país">
                            {selectedCountry ? selectedCountryName : "Seleccione un país"}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {countries.map((country) => (
                            <SelectItem key={country.id} value={String(country.id)}>
                                {country.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label htmlFor="state" className="text-sm font-medium text-gray-700">Departamento</label>
                <Select
                    onValueChange={(value) => setSelectedState(value)}
                    value={selectedState}
                    disabled={!selectedCountry}
                >
                    <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Seleccione un departamento">
                            {selectedState ? selectedStateName : "Seleccione un departamento"}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {states.map((state) => (
                            <SelectItem key={state.id} value={String(state.id)}>
                                {state.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label htmlFor="city" className="text-sm font-medium text-gray-700">Ciudad</label>
                <Select
                    onValueChange={(value) => setSelectedCity(value)}
                    value={selectedCity}
                    disabled={!selectedState}
                >
                    <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Seleccione una ciudad">
                            {selectedCity ? selectedCityName : "Seleccione una ciudad"}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {cities.map((city) => (
                            <SelectItem key={city.id} value={String(city.id)}>
                                {city.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
