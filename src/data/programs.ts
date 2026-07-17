export interface ProgramMediaCoverage {
  source: string
  date: string
  title: string
  url: string
}

export interface Program {
  id: string
  title: string
  subtitle: string
  status: 'active' | 'completed'
  year: number
  date?: string
  location: string
  founder?: string
  ledBy?: string
  partner?: string
  partners?: string[]
  type: string
  summary: string
  activities?: string[]
  keyTopics?: string[]
  fullReport: string[]
  mediaCoverage?: ProgramMediaCoverage[]
}

export const programs: Program[] = [
  {
    id: 'gombe-peace-project',
    title: 'Gombe Peace Project',
    subtitle: 'Promoting Interfaith Harmony & Community Peacebuilding',
    status: 'active',
    year: 2019,
    location: 'Gombe State, Nigeria',
    founder: 'Dr. Ahmed Magem',
    type: 'Youth-led Peacebuilding Initiative',
    partners: ["Boys' Brigade", 'JIBWIS', 'CAN', 'JNI', 'Security Agencies', 'Traditional Institutions'],
    summary:
      'The Gombe Peace Project emerged in 2019 as a youth-led response to rising religious tension and communal anxiety in Gombe State. Founded by Dr. Ahmed Magem, the initiative promotes peaceful coexistence, interfaith understanding and constructive dialogue among residents, following the tragic Easter procession incident of April 2019.',
    activities: [
      'Interfaith Engagement & Dialogue',
      'Hospital Visits to Victims',
      'Community & House-to-House Advocacy',
      'Ramadan Peace Campaign',
      'Campaign Against Fake News',
    ],
    fullReport: [
      'In 2019, the Gombe Peace Project emerged as a youth-led response to rising religious tension and communal anxiety in Gombe State. Founded and convened by Dr. Ahmed Magem, the initiative was established to promote peaceful coexistence, interfaith understanding and constructive dialogue among residents of the state, particularly following the tragic Easter procession incident of April 2019.',
      'The incident, which resulted in the death and injury of several members of the Boys\u2019 Brigade, created widespread grief and heightened tension between sections of the Christian and Muslim communities. At a time when anger and misinformation threatened to escalate the situation, the Gombe Peace Project mobilised volunteers and stakeholders to support reconciliation and prevent further violence.',
      'The project facilitated engagement with religious organisations, youth groups, community leaders and other stakeholders to encourage dialogue and reduce suspicion between affected communities. Meetings were held with representatives of the Gombe State Boys\u2019 Brigade and Jama\u2019atu Izalatil Bid\u2019ah Wa Iqamatus Sunnah (JIBWIS), while consultations were proposed with the Christian Association of Nigeria, Jama\u2019atu Nasril Islam, security agencies, traditional institutions and community leaders.',
      'As part of its humanitarian and peacebuilding intervention, members of the Gombe Peace Project visited victims receiving treatment at the Gombe State Specialist Hospital. The visits provided an opportunity to identify with those affected, offer moral support and reinforce the message that the tragedy should not be allowed to divide the people of Gombe State along religious lines.',
      'The project adopted a grassroots approach by conducting community consultations and house-to-house peace advocacy in areas affected by the tension. Volunteers encouraged residents to reject rumours, avoid inflammatory discussions and embrace dialogue, restraint and peaceful coexistence.',
      'During Ramadan in May 2019, the Gombe Peace Project called on Muslims across the state to use the holy month to pray for unity, peace and the development of Gombe State. The project urged residents to uphold compassion, patience, forgiveness and respect for neighbours, irrespective of religious affiliation.',
      'The Gombe Peace Project also raised concerns about the spread of unverified information during periods of crisis. Journalists, media organisations and members of the public were encouraged to verify information before publication or circulation and to avoid content capable of worsening religious tension.',
      'Through interfaith consultations, hospital visits, grassroots advocacy, stakeholder engagement and campaigns against misinformation, the project contributed to efforts aimed at restoring calm and promoting reconciliation in Gombe State.',
    ],
    mediaCoverage: [
      {
        source: 'Daily Trust',
        date: '8 May 2019',
        title: 'Sustain peaceful co-existence, NGO appeals to Gombe residents',
        url: 'https://dailytrust.com/sustain-peaceful-co-existence-ngo-appeals-to-gombe-residents/',
      },
      {
        source: 'Daily Trust',
        date: '10 May 2019',
        title: 'Easter crisis: Group tasks Gombe residence on peaceful co-existence',
        url: 'https://dailytrust.com/easter-crisis-group-tasks-gombe-residence-on-peaceful-co-existence/',
      },
    ],
  },
  {
    id: 'wanep-pcve-training',
    title: 'Coalition Building for Preventing & Countering Violent Extremism',
    subtitle: 'Training for Community Stakeholders',
    status: 'completed',
    year: 2023,
    date: '2\u20133 February 2023',
    location: 'Gombe State, Nigeria',
    partner: 'WANEP-Nigeria',
    ledBy: 'Dr. Ahmed Magem',
    type: 'Capacity Building Workshop',
    summary:
      'In collaboration with the West Africa Network for Peacebuilding\u2013Nigeria (WANEP-Nigeria), the Gombe Peace Project organised a two-day capacity-building workshop on coalition building for preventing and countering violent extremism, bringing together community stakeholders to develop community-driven approaches to preventing radicalisation and violence.',
    keyTopics: [
      'Coalition Building for P/CVE',
      'Understanding the Drivers of Violent Extremism',
      'Early Warning & Community Response',
      'Countering Extremist Narratives',
    ],
    fullReport: [
      'The Gombe Peace Project, in collaboration with the West Africa Network for Peacebuilding\u2013Nigeria (WANEP-Nigeria), organised a two-day capacity-building workshop on coalition building for preventing and countering violent extremism. The workshop, titled \u2018Coalition Building for Preventing and Countering Violent Extremism: Training for Community Stakeholders,\u2019 was held on 2 and 3 February 2023.',
      'The programme brought together community stakeholders to strengthen local collaboration, deepen their understanding of violent extremism and develop community-driven approaches to preventing radicalisation, intolerance and violence.',
      'Led by peacebuilding advocate Dr. Ahmed Magem, the Gombe Peace Project organised the workshop in recognition of the important role communities play in identifying early warning signs, addressing grievances and building resilience against extremist narratives.',
      'Participants examined the social, economic, political and religious factors that could expose individuals, particularly young people, to radicalisation and recruitment by violent extremist groups.',
      'A major focus of the training was the need for community stakeholders to move beyond isolated interventions and establish sustainable coalitions for preventing violence. Participants were reminded that no single organisation, institution or security agency could effectively address violent extremism alone.',
      'The training examined several conditions that could make individuals and communities vulnerable to extremist recruitment, including unemployment, poverty, exclusion, injustice, poor education, religious intolerance, misinformation and unresolved grievances.',
      'Community stakeholders were trained to identify early warning signs of radicalisation, hate speech, sectarian tension, intolerance and other threats capable of escalating into violence.',
      'The workshop also examined the role of communication in preventing and countering violent-extremism. Community actors were encouraged to promote credible counter-narratives centred on peace, religious tolerance, responsible citizenship, respect for human dignity and the peaceful resolution of grievances.',
    ],
  },
]
