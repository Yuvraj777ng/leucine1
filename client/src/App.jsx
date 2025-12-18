import React, { useEffect, useState } from 'react'
import EquipmentTable from './components/EquipmentTable'
import EquipmentForm from './components/EquipmentForm'
import api from './services/api'

export default function App() {
  const [equipment, setEquipment] = useState([])
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const fetchData = async () => {
    try {
      const data = await api.getAll()
      setEquipment(data)
    } catch (err) {
      console.error(err)
      alert('Failed to fetch equipment')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAdd = async (item) => {
    await api.create(item)
    fetchData()
    setShowForm(false)
  }

  const handleUpdate = async (id, item) => {
    await api.update(id, item)
    fetchData()
    setEditing(null)
    setShowForm(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this equipment?')) return
    await api.remove(id)
    fetchData()
  }

  return (
    <div className="container">
      <h1>Equipment Manager</h1>
      <div className="controls">
        <button onClick={() => { setEditing(null); setShowForm(true); }}>Add Equipment</button>
      </div>

      {showForm && (
        <EquipmentForm
          initial={editing}
          onCancel={() => setShowForm(false)}
          onSubmit={(data) => (editing ? handleUpdate(editing.id, data) : handleAdd(data))}
        />
      )}

      <EquipmentTable items={equipment} onEdit={(it) => { setEditing(it); setShowForm(true) }} onDelete={handleDelete} />
    </div>
  )
}
