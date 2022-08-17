import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';

export const SearchBox = ({ avengers, setAvenger }) => {
    return (
        <DatalistInput
            placeholder="Black Panther"
            label="Search Avenger"
            onSelect={(avenger) => setAvenger(avenger)}
            items={avengers}
        />
    );
};
