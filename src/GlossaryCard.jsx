import React from 'react'

function GlossaryCard({ term, definition, category }) {
  return (
    <div className="glossary_card">
      <div className="glossary_card_header">
        <span className="glossary_card_term">{term}</span>
        <span className="glossary_card_category">{category}</span>
      </div>

      <div className="glossary_card_definition">{definition}</div>
    </div>
  )
}

export default GlossaryCard
