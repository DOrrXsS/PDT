import React from 'react'
import { useOutletContext } from 'react-router-dom';

import BookmarkTable from '../../features/urlData/components/BookmarkTable';

export default function homePage(props) {
    const { urls } = useOutletContext();

    return (
        < BookmarkTable {...urls} /> 
    )
}


