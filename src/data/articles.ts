export interface Article {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  image?: string
}

export const articles: Article[] = [
  {
    id: 'gombe-peace-project-2019',
    title: 'Gombe Peace Project: Promoting Interfaith Harmony and Community Peacebuilding',
    excerpt:
      'In 2019, the Gombe Peace Project emerged as a youth-led response to rising religious tension and communal anxiety in Gombe State. Founded by Dr. Ahmed Magem, the initiative promoted peaceful coexistence, interfaith understanding and constructive dialogue following the tragic Easter procession incident of April 2019.',
    date: 'May 2019',
    category: 'Field Report',
    tags: ['peacebuilding', 'interfaith', 'gombe', 'community'],
    image: '/images/news/6.jpg',
  },
  {
    id: 'wanep-pcve-training-2023',
    title: 'Community Stakeholders Trained on Preventing Violent Extremism',
    excerpt:
      'In collaboration with WANEP-Nigeria, the Gombe Peace Project organised a two-day capacity-building workshop on coalition building for preventing and countering violent extremism. The training, held on 2\u20133 February 2023, brought together community stakeholders to develop practical strategies for strengthening cooperation and preventing radicalisation.',
    date: 'February 2023',
    category: 'Capacity Building',
    tags: ['P/CVE', 'WANEP', 'training', 'extremism'],
    image: '/images/news/6.jpg',
  },
]
