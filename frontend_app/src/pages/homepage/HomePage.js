import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar';
import { getAPI } from '../../common/ApiHelper';
import {
    DetailsList,
    DetailsListLayoutMode,
    TextField,
    Stack,
    PrimaryButton
} from '@fluentui/react';
import './homepage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [items, setItems] = useState([]);
    const [filterTexts, setFilterTexts] = useState('');
    const [columns, setColumns] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [size, setSize] = useState(10);
    const navigate = useNavigate();

    function handleDishClick(dish){
        navigate(`/dish/${dish.name}`, {state: dish})
    }

    async function getDishes(filters= {}) {
        try {
            const filterParams = new URLSearchParams(filters).toString();
            let result = await getAPI(`/dishes/${pageNumber}/${size}?${filterParams}`);
            let cols = Object.keys(result.data.data[0]);
            let temp_cols = [];
            let i =0;

            const transformedData = result.data.data.map(item => {
                const newItem = {};
                for (const key in item) {
                    newItem[key] = item[key] === -1 ? "NA" : item[key];
                }
                return newItem;
            });

            
                for (let col of cols) {
                    const columnConfig = {
                        key: i++,
                        name: (
                            <div>
                                <TextField
                                    placeholder={`Filter by ${col}`}
                                    onChange={(e) => handleFilterChange(col, e.target.value)}
                                    className="filter-input"
                                />
                                {col.charAt(0).toUpperCase() + col.slice(1)}
                            </div>
                        ),
                        fieldName: col,
                        minWidth: 100,
                        maxWidth: 200,
                        isSorted: true,
                        isSortedDescending: false,
                    };
            
                    // If the column is the name column, modify the item rendering
                    if (col === 'name') {
                        columnConfig.onRender = (item) => (
                            <span
                                style={{ cursor: 'pointer', color: '#0078d4', textDecoration: 'underline' }} 
                                onClick={() => handleDishClick(item)}
                            >
                                {item.name}
                            </span>
                        );
                    }
            
                    temp_cols.push(columnConfig);
                }
            
            setTotalPages(result.data.totalPages)
            setColumns(temp_cols);
            setItems(transformedData);
        } catch (error) {
            console.error("Error fetching dishes:", error);
        }
    }


    const handleFilterChange = (columnKey, value) => {
        const newFilters = { ...filterTexts, [columnKey]: value };
        setFilterTexts(newFilters);
        getDishes(newFilters);
    };


    const filteredItems = items.filter(item => {
        return Object.keys(filterTexts).every(key => {
            const filterText = filterTexts[key]?.toLowerCase() || '';
            return item[key].toString().toLowerCase().includes(filterText);
        });
    });

    useEffect(() => {
        getDishes();
    }, [pageNumber, size]);

    return (
        <>
            <Navbar />

            <div className="home-container">
                <h1>Indian Dishes</h1>
                <DetailsList
                    items={filteredItems}
                    columns={columns}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                />
                 <Stack horizontal tokens={{ childrenGap: 10 }} styles={{ root: { marginTop: 20 } }}>
                    <PrimaryButton
                        text="Previous"
                        onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                        disabled={pageNumber === 1}
                    />
                    <span>Page {pageNumber} of {totalPages}</span>
                    <PrimaryButton
                        text="Next"
                        onClick={() => setPageNumber(Math.min(totalPages, pageNumber + 1))}
                        disabled={pageNumber === totalPages}
                    />
                </Stack>
            </div>
        </>
    );
}

export default HomePage;
