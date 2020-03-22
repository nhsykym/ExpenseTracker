import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const RenderOptions = (props) => {
    return props.categories.map((category, index) => {
        return (
            <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
        );
    });
};

export default RenderOptions;