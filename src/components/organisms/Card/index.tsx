import React from 'react'
import { Link } from 'react-router-dom'
import { CardPicture } from '../../molecules'

import './Card.scss'

function Card({ img, title = 'Title', author = 'Author' }) {
  return (
    <div className='card'>
      <CardPicture img={img} />
      <div className='cardBottom'>
        <div className='cardTitle'>{title}</div>
        <div className='cardAuthor'>
          <Link to='/'>{author}</Link>
        </div>
      </div>
    </div>
  )
}

export default Card
