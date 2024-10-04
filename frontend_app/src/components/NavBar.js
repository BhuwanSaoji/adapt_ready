import React, { useState, useEffect } from 'react';
import { CommandBar } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import { getAPI } from "../common/ApiHelper";

const TopNavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [dishes, setDishes] = useState([])
  
  const navigate = useNavigate();

  const items = [
    {
      key: 'home',
      text: 'Home',
      onClick: () => navigate("/home"),
    },
    {
      key: 'searchByIngredients',
      text: 'Search by Ingredients',
      onClick: () => navigate("/search_by_ingredients"),
    },
    
  ];

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch suggestions based on debounced query
  useEffect(() => {
    if (debouncedQuery) {
      fetchDataFromAPI(debouncedQuery);
    } else {
      setSuggestions([]); // Clear suggestions if query is empty
    }
  }, [debouncedQuery]);

  const fetchDataFromAPI = async (query) => {
    const result = await getAPI(`/dishes/${1}/${10}?search=${query}`);
    const dishNames = result.data.data.map(dish => dish.name);
    setDishes(result.data.data)
    setSuggestions(dishNames);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  // Updated renderSuggestion to include a button
  const renderSuggestion = (suggestion) => (
    <div  onClick={() => handleSuggestionClick(suggestion)} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', cursor: 'pointer' }}>
      {suggestion}
    </div>
  );

  const handleSuggestionClick = (suggestion) => {
    let dishDetails = dishes.filter(item=>item.name==suggestion)
    navigate(`/dish/${suggestion}`, {state: dishDetails[0] });
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSearchQuery(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#0078d4', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CommandBar
        items={items}
        styles={{
          root: {
            backgroundColor: 'transparent',
            color: 'white',
            padding: 0,
            marginRight: '10px',
          },
          primarySet: {
            display: 'flex',
            gap: '20px',
          },
          button: {
            color: 'white',
            fontWeight: '500',
            fontSize: '16px',
            ':hover': {
              backgroundColor: '#005a9e',
              color: 'white',
            },
          },
        }}
      />

      {/* Autosuggest Search Box */}
      <div style={{ position: 'relative', width: '300px', margin: "10px" }}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: 'Search dishes...',
            value: searchQuery,
            onChange: (event, { newValue }) => {
              setSearchQuery(newValue);
            },
            style: {
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none', // Removes the default outline
            },
          }}
          theme={{
            suggestionsContainer: {
              border: '1px solid #ccc',
              maxHeight: '200px',
              overflowY: 'auto',
              backgroundColor: 'white',
              zIndex: 10, // Ensure this is higher than the navbar
              position: 'absolute', // Position absolutely to prevent affecting navbar layout
              top: '100%', // Position it right below the input
              left: 0,
              right: 0,
            },
            suggestion: {
              padding: '10px',
              cursor: 'pointer',
            },
            suggestionHighlighted: {
              backgroundColor: '#ddd',
            },
          }}
        />
      </div>
    </div>
  );
};

export default TopNavBar;
