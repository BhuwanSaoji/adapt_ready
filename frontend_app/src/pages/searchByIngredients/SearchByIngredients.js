import React, { useState, useEffect } from 'react';
import { Dropdown, Stack, Text, DetailsList, DetailsListLayoutMode } from '@fluentui/react';
import { getAPI, postAPI } from '../../common/ApiHelper'; // Adjust the path as needed
import TopNavBar from '../../components/NavBar'
import { useNavigate } from 'react-router-dom';


const IngredientSelector = () => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [ingredientsOptions, setIngredientsOptions] = useState([{}])
    const [suggestedDishes, setSuggestedDishes] = useState([]);
    const [columns, setColumns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedIngredients.length) {
            fetchSuggestedDishes(selectedIngredients);
        } else {
            setSuggestedDishes([]);
        }
    }, [selectedIngredients]);

    useEffect(()=>{
      
      async function getIngredients(){
        
        let ans = await getAPI("/dishes/ingredients");
        setIngredientsOptions(ans.data);
      }
      getIngredients( )
    }, [])

    function handleDishClick(dish){
      navigate(`/dish/${dish.name}`, {state: dish})
    }

    const fetchSuggestedDishes = async (ingredients) => {
        try {
            const result = await postAPI(`/dishes/find`, ingredients);
            let cols = Object.keys(result.data.data[0])
            setSuggestedDishes(result.data.data); 
            let i=0;
            let temp_cols  =[]
            for (let col of cols) {
              const columnConfig = {
                  key: i++,
                  name: (
                      <div>
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
          setColumns(temp_cols)
        } catch (error) {
            console.error('Error fetching suggested dishes:', error);
        }
    };

    const handleIngredientChange = (event, option, index) => {
        const newSelectedIngredients = option.selected ? [...selectedIngredients, option.key] : selectedIngredients.filter(item => item !== option.key);
        setSelectedIngredients(newSelectedIngredients);
    };

    return (
       <>
        <TopNavBar />
        <Stack styles={{ root: { padding: '20px', maxWidth: '1400px', margin: '10px' } }}>
            <Text variant="xLarge" styles={{ root: { marginBottom: '20px' } }}>Select Ingredients</Text>
            <Dropdown
                placeholder="Select ingredients"
                multiSelect
                options={ingredientsOptions}
                onChange={handleIngredientChange}
                styles={{
                    dropdown: { width: '80%', marginBottom: '20px' },
                }}
            />
            <Text variant="large" styles={{ root: { marginBottom: '10px' } }}>Suggested Dishes:</Text>
            {suggestedDishes.length ? (
                <DetailsList
                    items={suggestedDishes}
                    columns={columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    styles={{ root: { marginBottom: '20px' } }}
                />
            ) : (
                <Text>No dishes found. Please select more ingredients.</Text>
            )}
        </Stack>
       </>
        
    );
};

export default IngredientSelector;
