export type Dish = {
  id: number
  name: string
  category: string
  description: string
  price: number
  image: string
  popular?: boolean
  tags?: string[]
  serves?: string
  options: string[]
}

export const dishes: Dish[] = [
  {
    id: 1,
    name: 'Mutton Kacchi Biryani',
    category: 'Kacchi Biryani',
    description:
      'Tender mutton, fragrant basmati rice, potato and royal spices slow-layered in a copper handi.',
    price: 420,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop',
    popular: true,
    tags: ['Signature', 'Spicy'],
    serves: '1 person',
    options: ['Single plate', 'Full handi'],
  },
  {
    id: 2,
    name: 'Chicken Kacchi Biryani',
    category: 'Kacchi Biryani',
    description:
      'Classic Zilian kacchi layered with juicy chicken, saffron rice and golden potato.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=600&h=400&fit=crop',
    popular: true,
    tags: ['Bestseller'],
    serves: '1 person',
    options: ['Single plate', 'Family portion'],
  },
  {
    id: 3,
    name: 'Beef Tehari',
    category: 'Kacchi Biryani',
    description:
      'Aromatic rice cooked with slow-braised beef, whole spices and a hint of mustard oil.',
    price: 300,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop',
    tags: ['Homestyle'],
    serves: '1 person',
    options: ['Regular', 'Spicy'],
  },
  {
    id: 4,
    name: 'Kung Pao Chicken',
    category: 'Chinese',
    description:
      'Wok-tossed chicken, roasted peanuts, dried chilies and sweet soy glaze.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&h=400&fit=crop',
    popular: true,
    tags: ['Wok-fired'],
    serves: '1–2 people',
    options: ['Regular', 'Extra spicy'],
  },
  {
    id: 5,
    name: 'Szechuan Beef',
    category: 'Chinese',
    description:
      'Tender beef strips with bell peppers, scallion and fiery Szechuan peppercorn sauce.',
    price: 460,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop',
    tags: ['Spicy'],
    serves: '1–2 people',
    options: ['Regular', 'Extra spicy'],
  },
  {
    id: 6,
    name: 'Thai Fried Rice',
    category: 'Chinese',
    description:
      'Wok-fired jasmine rice with mixed vegetables, egg and house Thai seasoning.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop',
    tags: ['Light'],
    serves: '1 person',
    options: ['Vegetable', 'Chicken'],
  },
  {
    id: 7,
    name: 'Zilian Special Platter',
    category: 'Platters',
    description:
      'Kacchi, roast, kebab, salad and chutney — a royal spread made for sharing.',
    price: 1150,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop',
    popular: true,
    tags: ['Sharing', 'Best value'],
    serves: '2–4 people',
    options: ['2 people', '4 people'],
  },
  {
    id: 8,
    name: 'Chicken Roast',
    category: 'Platters',
    description:
      'Golden roasted chicken marinated overnight in a rich Bengali spice paste.',
    price: 340,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop',
    tags: ['Popular'],
    serves: '1 person',
    options: ['1 piece', '2 pieces'],
  },
  {
    id: 9,
    name: 'Firni',
    category: 'Desserts',
    description: 'Silky rice pudding with cardamom, rose water and crushed pistachio.',
    price: 140,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop',
    tags: ['Traditional'],
    serves: '1 person',
    options: ['Regular', 'Large'],
  },
  {
    id: 10,
    name: 'Chicken Manchurian',
    category: 'Chinese',
    description:
      'Crispy chicken tossed in a tangy Indo-Chinese sauce with garlic and ginger.',
    price: 360,
    image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&h=400&fit=crop',
    tags: ['Indo-Chinese'],
    serves: '1–2 people',
    options: ['Dry', 'Gravy'],
  },
  {
    id: 11,
    name: 'Mutton Rezala',
    category: 'Platters',
    description:
      'Slow-cooked mutton in a creamy, aromatic white gravy with whole spices.',
    price: 520,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&h=400&fit=crop',
    tags: ['Rich', 'Mild'],
    serves: '1–2 people',
    options: ['Regular', 'With naan'],
  },
  {
    id: 12,
    name: 'Jilapi & Malpua',
    category: 'Desserts',
    description: 'Crispy golden jilapi and soft malpua drizzled with fragrant sugar syrup.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&h=400&fit=crop',
    tags: ['Sweet'],
    serves: '1–2 people',
    options: ['Regular', 'Party plate'],
  },
]

export const categories = ['All', 'Kacchi Biryani', 'Chinese', 'Platters', 'Desserts']

export const allTags = Array.from(new Set(dishes.flatMap((d) => d.tags ?? [])))

export const PRICE_MIN = Math.min(...dishes.map((d) => d.price))
export const PRICE_MAX = Math.max(...dishes.map((d) => d.price))