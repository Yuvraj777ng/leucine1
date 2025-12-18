// Import React and the useState hook for local state management
import React, { useState } from 'react'

// Define available equipment types used to populate the "Type" select field
const TYPES = ['Machine', 'Vessel', 'Tank', 'Mixer']
// Define possible equipment statuses used to populate the "Status" select field
const STATUS = ['Active', 'Inactive', 'Under Maintenance']

// EquipmentForm is a controlled form component for creating or editing equipment entries
// Props:
// - initial: optional initial equipment values (used for editing)
// - onSubmit: callback invoked with form data when the form is valid and submitted
// - onCancel: callback invoked when user cancels the form
export default function EquipmentForm({ initial = null, onSubmit, onCancel }) {
  // Controlled state for the equipment name; default to initial.name or empty string
  const [name, setName] = useState(initial ? initial.name : '')
  // Controlled state for equipment type; default to initial.type or empty string
  const [type, setType] = useState(initial ? initial.type : '')
  // Controlled state for equipment status; default to initial.status or empty string
  const [status, setStatus] = useState(initial ? initial.status : '')
  // Controlled state for the last cleaned date; ensure empty string when not provided
  const [lastCleanedDate, setLastCleanedDate] = useState(initial ? initial.lastCleanedDate || '' : '')
  // Object mapping field names to validation error messages
  const [errors, setErrors] = useState({})

  // Validate required fields and populate `errors` state when invalid
  const validate = () => {
    const e = {}
    // Name is required and should not be whitespace-only
    if (!name.trim()) e.name = 'Name is required'
    // Type must be selected
    if (!type) e.type = 'Type is required'
    // Status must be selected
    if (!status) e.status = 'Status is required'
    // Update component state with validation results
    setErrors(e)
    // Return true when there are no errors
    return Object.keys(e).length === 0
  }

  // Handle form submission: prevent default, validate, then call onSubmit with sanitized data
  const submit = (ev) => {
    ev.preventDefault() // prevent default HTML form submission behavior
    if (!validate()) return // abort if validation fails
    // Trim name and convert empty lastCleanedDate to null for consistency
    onSubmit({ name: name.trim(), type, status, lastCleanedDate: lastCleanedDate || null })
  }

  // Render the controlled form UI; inputs are bound to state and update via setX callbacks
  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        {/* Label for the name input */}
        <label>Name</label>
        {/* Text input bound to `name` state */}
        <input value={name} onChange={(e) => setName(e.target.value)} />
        {/* Conditionally render field-level validation message */}
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className="form-row">
        <label>Type</label>
        {/* Select input for equipment type; options are generated from TYPES */}
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select type</option>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.type && <div className="error">{errors.type}</div>}
      </div>

      <div className="form-row">
        <label>Status</label>
        {/* Select input for status; options are generated from STATUS */}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select status</option>
          {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.status && <div className="error">{errors.status}</div>}
      </div>

      <div className="form-row">
        <label>Last Cleaned Date</label>
        {/* Date input bound to lastCleanedDate; empty fallback ensures controlled input value */}
        <input type="date" value={lastCleanedDate || ''} onChange={(e) => setLastCleanedDate(e.target.value)} />
      </div>

      <div className="form-actions">
        {/* Submit button that triggers the submit handler */}
        <button type="submit">Save</button>
        {/* Cancel button invoking onCancel prop when clicked */}
        <button type="button" className="muted" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
