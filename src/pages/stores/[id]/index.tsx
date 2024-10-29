import { useRouter } from 'next/router';
import React from 'react';

function StoreDetailPage() {
    const router = useRouter()

    const { id } = router.query

    return (
        <div>
            <h1>Store Detail: {id}</h1>
        </div>
    );
}

export default StoreDetailPage;