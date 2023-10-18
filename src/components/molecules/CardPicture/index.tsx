import React from 'react'

import './CardPicture.scss'

function CardPicture({ img }) {
  return (
    <div className='cardPicture'>
      <img src={img} alt='image' />
    </div>
  )
}

export default CardPicture
