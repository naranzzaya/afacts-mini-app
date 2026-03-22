import React, { useState } from 'react'

function GlossaryCard({ term, definition, category }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="glossary_card">
      <button
        className="glossary_card_button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="glossary_card_term">{term}</span>
        <span className="glossary_card_category">{category}</span>
      </button>

      {isOpen && <div className="glossary_card_definition">{definition}</div>}
    </div>
  )
}

export default GlossaryCard
