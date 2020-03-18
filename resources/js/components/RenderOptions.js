import React from 'react';

const RenderOptions = (props) => {
    return props.categories.map((category, index) => {
        return (
           <option key={index} value={category}>{category}</option>
        );
    });
};

export default RenderOptions;   