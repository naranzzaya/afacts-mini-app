import React, { useState } from 'react'

function GlossaryCard({ term, definition, category }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="glossary_card">
      <div className="glossary_card_header" onClick={() => setIsOpen(!isOpen)}>
        <div className="glossary_card_top">
          <span className="glossary_card_term">{term}</span>
          <span className="glossary_card_category">{category}</span>
        </div>
      </div>

      {isOpen && <div className="glossary_card_definition">{definition}</div>}
    </div>
  )
}

export default GlossaryCard
