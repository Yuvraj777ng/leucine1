// Base API endpoint for equipment operations. Uses Vite env var if provided, otherwise falls back to localhost.
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/equipment'

// Retrieve all equipment entries from the API
// Returns a parsed JSON array on success, throws an Error on network/HTTP failure
async function getAll() {
  // Perform a GET request to the base endpoint
  const res = await fetch(BASE)
  // Basic error handling: treat non-2xx responses as errors
  if (!res.ok) throw new Error('Failed to fetch')
  // Parse and return the response body as JSON
  return res.json()
}

// Create a new equipment item by sending a POST request with JSON body
// `item` should be a plain JS object representing the new resource
async function create(item) {
  const res = await fetch(BASE, {
    method: 'POST',
    // Indicate that we're sending JSON in the request body
    headers: { 'Content-Type': 'application/json' },
    // Serialize the item to JSON for transport
    body: JSON.stringify(item)
  })
  // Throw on non-successful responses
  if (!res.ok) throw new Error('Failed to create')
  // Return response JSON (commonly the created resource)
  return res.json()
}

// Update an existing equipment item identified by `id` via PUT
// Returns the updated resource as JSON on success
async function update(id, item) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  })
  if (!res.ok) throw new Error('Failed to update')
  return res.json()
}

// Delete an equipment item by id. Note: many APIs return 204 No Content on success
// This function throws an Error when the deletion fails (non-2xx and not 204)
async function remove(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok && res.status !== 204) throw new Error('Failed to delete')
}

// Export the service functions as the module's default export for easy import elsewhere
export default { getAll, create, update, remove }
