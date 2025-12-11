// assets/js/api.js
export async function fetchVehicles(path = 'assets/data/vehicles.json') {
    try {
        const resp = await fetch(path, { cache: 'no-cache' });
        if (!resp.ok) throw new Error(`Network error: ${resp.status}`);
        const data = await resp.json();
        return data;
    } catch (err) {
        console.error('fetchVehicles error:', err);
        throw err;
    }
}
