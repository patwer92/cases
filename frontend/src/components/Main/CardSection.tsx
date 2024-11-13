import React from 'react'
import { cardData } from '../../assets/cardData'
import Card from './Card'
import { CardProps } from '../../types/cardProps' // Importerer CardProps-typen

// Hovedkomponent som rendrer en seksjon med kort basert på data i cardData
const CardSection: React.FC = (): React.ReactElement => {
  return (
    <div className='grid grid-cols-5 gap-2 p-2 mb-10'>
      {cardData.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          name={card.name}
          img={card.image} // Konverterer `card.image` for å matche `img`-feltet i CardProps
          status={card.status as CardProps['status']} // Sikrer riktig status-type i samsvar med CardProps
        />
      ))}
    </div>
  )
}

export default CardSection
