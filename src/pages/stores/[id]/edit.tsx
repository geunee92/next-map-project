import { useRouter } from 'next/router';
import React from 'react';

function StoreEditPage() {
    const router = useRouter()

    const { id } = router.query

    return (
        <div>
            <h1>Store Edit: {id}</h1>
        </div>
    );
}

export default StoreEditPage;