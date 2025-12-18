// Import React to use JSX syntax and React APIs (not strictly required in newer toolchains but retained for clarity)
import React from 'react'

// Stateless component that renders a table of equipment items
// Props:
// - items: array of equipment objects to display (defaults to empty array)
// - onEdit: callback invoked with an item when the Edit button is clicked
// - onDelete: callback invoked with an item id when Delete is clicked
export default function EquipmentTable({ items = [], onEdit, onDelete }) {
  return (
    // Table element with a CSS class for styling
    <table className="equipment-table">
      <thead>
        <tr>
          {/* Column headers */}
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Last Cleaned</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* When there are no items, show an empty state row spanning all columns */}
        {items.length === 0 && (
          <tr>
            <td colSpan={5} className="empty">No equipment found</td>
          </tr>
        )}
        {/* Map over items to render each row; use `id` as the React key */}
        {items.map((it) => (
          <tr key={it.id}>
            {/* Display item properties in their respective columns */}
            <td>{it.name}</td>
            <td>{it.type}</td>
            <td>{it.status}</td>
            {/* Show last cleaned date or a dash when not available */}
            <td>{it.lastCleanedDate || '-'}</td>
            <td>
              {/* Edit button triggers onEdit with the full item object */}
              <button onClick={() => onEdit(it)}>Edit</button>
              {/* Delete button triggers onDelete with the item's id; styled as dangerous */}
              <button className="danger" onClick={() => onDelete(it.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
