import React from 'react'
import { useParams } from 'react-router-dom'

export default function Catalog() {
  const {id} = useParams()
  return (
    <div>Раздел конкретного каталога c id = {id}</div>
  )
}
