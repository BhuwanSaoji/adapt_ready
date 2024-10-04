import React from 'react';
import { useLocation } from 'react-router-dom';
import { Stack, Text, FontWeights, Separator } from '@fluentui/react';
import TopNavBar from '../../components/NavBar';

const DishDetails = () => {
    const location = useLocation();
    const selectedDish  = location.state || {};
    
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%', 
        },
        card: {
            padding: '30px',
            margin: '20px',
            minWidth: "600px",
            maxWidth: '800px', 
            backgroundColor: '#ffffff', 
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            borderRadius: '15px',
            border: '1px solid #e0e0e0', 
        },
        title: {
            fontSize: '32px', 
            fontWeight: FontWeights.semibold,
            color: '#333', 
            marginBottom: '15px',
            textAlign: 'center',
        },
        detail: {
            marginBottom: '10px',
            color: '#555', 
            fontSize: '18px',
        },
        highlight: {
            color: '#ff5722',
            fontWeight: FontWeights.bold,
        },
    };

    if (!selectedDish) {
        return <Text>No dish selected.</Text>;
    }

    return (
        <>
        <TopNavBar />
        <div style={styles.container}>
            <Stack style={styles.card} tokens={{ childrenGap: 10 }}>
                <Text style={styles.title}>{selectedDish.name}</Text> {/* Dish name as header */}
                <Separator />
                <Text style={styles.detail}>
                    <strong className={styles.highlight}>Ingredients:</strong> {selectedDish.ingredients}
                </Text>
                <Text style={styles.detail}>
                    <strong className={styles.highlight}>Diet:</strong> {selectedDish.diet}
                </Text>
                <Text style={styles.detail}>
                    <strong className={styles.highlight}>Preparation Time:</strong> {selectedDish.prep_time} minutes
                </Text>
                <Text style={styles.detail}>
                    <strong className={styles.highlight}>Cook Time:</strong> {selectedDish.cook_time} minutes
                </Text>
                <Text style={styles.detail}>
                    <strong className={styles.highlight}>Flavor Profile:</strong> {selectedDish.flavor_profile}
                </Text>
                <Text style={styles.detail}>
                    <strong className={styles.highlight}>Course:</strong> {selectedDish.course}
                </Text>
                <Text style={styles.detail}>
                    <strong className={styles.highlight}>State:</strong> {selectedDish.state}
                </Text>
                <Text style={styles.detail}>
                    <strong className={styles.highlight}>Region:</strong> {selectedDish.region}
                </Text>
            </Stack>
        </div>
        </>
    );
};

export default DishDetails;
