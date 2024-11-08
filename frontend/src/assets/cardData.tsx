import card1 from '../assets/images/Card1.jpg'
import card2 from '../assets/images/Card2.jpg'
import card3 from '../assets/images/Card3.jpg'
import card4 from '../assets/images/Card4.jpg'
import card5 from '../assets/images/Card5.jpg'

export const cardData: {
  id: string
  name: string
  status: string
  image: string
}[] = [
  {
    id: '1',
    name: 'Ola Nordmann',
    image: card1,
    status: 'Pålogget',
  },
  {
    id: '2',
    name: 'Kari Hansen',
    image: card2,
    status: 'Pålogget',
  },
  {
    id: '3',
    name: 'Per Johansen',
    image: card3,
    status: 'Avlogget',
  },
  {
    id: '4',
    name: 'Anne Larsen',
    image: card4,
    status: 'Pålogget',
  },
  {
    id: '5',
    name: 'Erik Olsen',
    image: card5,
    status: 'Avlogget',
  },
]
