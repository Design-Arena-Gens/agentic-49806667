'use client'

import { useState } from 'react'

interface ZodiacSign {
  name: string
  icon: string
  dates: string
  element: string
  ruling: string
}

const zodiacSigns: ZodiacSign[] = [
  { name: 'Aries', icon: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire', ruling: 'Mars' },
  { name: 'Taurus', icon: '♉', dates: 'Apr 20 - May 20', element: 'Earth', ruling: 'Venus' },
  { name: 'Gemini', icon: '♊', dates: 'May 21 - Jun 20', element: 'Air', ruling: 'Mercury' },
  { name: 'Cancer', icon: '♋', dates: 'Jun 21 - Jul 22', element: 'Water', ruling: 'Moon' },
  { name: 'Leo', icon: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire', ruling: 'Sun' },
  { name: 'Virgo', icon: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth', ruling: 'Mercury' },
  { name: 'Libra', icon: '♎', dates: 'Sep 23 - Oct 22', element: 'Air', ruling: 'Venus' },
  { name: 'Scorpio', icon: '♏', dates: 'Oct 23 - Nov 21', element: 'Water', ruling: 'Pluto' },
  { name: 'Sagittarius', icon: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire', ruling: 'Jupiter' },
  { name: 'Capricorn', icon: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth', ruling: 'Saturn' },
  { name: 'Aquarius', icon: '♒', dates: 'Jan 20 - Feb 18', element: 'Air', ruling: 'Uranus' },
  { name: 'Pisces', icon: '♓', dates: 'Feb 19 - Mar 20', element: 'Water', ruling: 'Neptune' },
]

const horoscopes: Record<string, string> = {
  'Aries': 'Today brings exciting opportunities for new beginnings. Your natural leadership qualities shine bright, attracting positive attention from those around you. Trust your instincts and take bold action.',
  'Taurus': 'Focus on stability and comfort today. Your practical nature will help you make sound financial decisions. Take time to enjoy the simple pleasures and connect with nature.',
  'Gemini': 'Communication flows effortlessly today. Your curiosity leads you to fascinating conversations and new learning opportunities. Share your ideas with confidence.',
  'Cancer': 'Emotional connections deepen today. Your intuitive nature helps you understand others on a profound level. Trust your feelings and nurture important relationships.',
  'Leo': 'Your charisma is magnetic today. Creative projects flourish under your passionate energy. Step into the spotlight and let your talents shine.',
  'Virgo': 'Attention to detail serves you well today. Your analytical mind solves complex problems with ease. Organization brings clarity and peace.',
  'Libra': 'Balance and harmony guide your day. Your diplomatic skills help resolve conflicts gracefully. Beauty and art inspire your creative spirit.',
  'Scorpio': 'Transformative energy surrounds you today. Your intensity and passion drive meaningful change. Trust your deep intuition to guide important decisions.',
  'Sagittarius': 'Adventure calls to your free spirit today. Expand your horizons through travel, learning, or philosophical pursuits. Optimism attracts good fortune.',
  'Capricorn': 'Your ambition and discipline lead to success today. Long-term goals come into clearer focus. Hard work yields tangible rewards.',
  'Aquarius': 'Innovation and originality set you apart today. Your humanitarian nature inspires positive change in your community. Embrace your uniqueness.',
  'Pisces': 'Creativity and spirituality flow through you today. Your compassionate heart brings healing to others. Trust your dreams and imagination.',
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('horoscope')
  const [selectedSign, setSelectedSign] = useState<string | null>(null)
  const [sign1, setSign1] = useState('')
  const [sign2, setSign2] = useState('')
  const [compatibilityResult, setCompatibilityResult] = useState<any>(null)
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [birthChart, setBirthChart] = useState<any>(null)

  const calculateCompatibility = () => {
    if (!sign1 || !sign2) return

    const elements: Record<string, string> = {
      'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
      'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
      'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
      'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water',
    }

    const element1 = elements[sign1]
    const element2 = elements[sign2]

    let score = 50
    let description = ''

    if (element1 === element2) {
      score = 85
      description = 'Excellent match! You share the same element, creating natural understanding and harmony.'
    } else if (
      (element1 === 'Fire' && element2 === 'Air') ||
      (element1 === 'Air' && element2 === 'Fire') ||
      (element1 === 'Earth' && element2 === 'Water') ||
      (element1 === 'Water' && element2 === 'Earth')
    ) {
      score = 75
      description = 'Great compatibility! Your elements complement each other beautifully, creating balance.'
    } else {
      score = 60
      description = 'Good potential! While your elements differ, you can learn and grow together with effort.'
    }

    setCompatibilityResult({ score, description, sign1, sign2 })
  }

  const generateBirthChart = () => {
    if (!birthDate || !birthTime || !birthPlace) return

    const signs = zodiacSigns.map(s => s.name)
    const randomSign = () => signs[Math.floor(Math.random() * signs.length)]

    setBirthChart({
      sun: randomSign(),
      moon: randomSign(),
      rising: randomSign(),
      mercury: randomSign(),
      venus: randomSign(),
      mars: randomSign(),
    })
  }

  return (
    <div className="container">
      <header className="header">
        <h1>✨ Astrology App ✨</h1>
        <p>Discover your cosmic destiny and unlock the secrets of the stars</p>
      </header>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'horoscope' ? 'active' : ''}`}
          onClick={() => setActiveTab('horoscope')}
        >
          Daily Horoscope
        </button>
        <button
          className={`tab-button ${activeTab === 'compatibility' ? 'active' : ''}`}
          onClick={() => setActiveTab('compatibility')}
        >
          Compatibility
        </button>
        <button
          className={`tab-button ${activeTab === 'birthchart' ? 'active' : ''}`}
          onClick={() => setActiveTab('birthchart')}
        >
          Birth Chart
        </button>
      </div>

      {activeTab === 'horoscope' && (
        <>
          <div className="zodiac-grid">
            {zodiacSigns.map((sign) => (
              <div
                key={sign.name}
                className={`zodiac-card ${selectedSign === sign.name ? 'selected' : ''}`}
                onClick={() => setSelectedSign(sign.name)}
              >
                <div className="zodiac-icon">{sign.icon}</div>
                <div className="zodiac-name">{sign.name}</div>
                <div className="zodiac-dates">{sign.dates}</div>
              </div>
            ))}
          </div>

          {selectedSign && (
            <div className="content-section">
              <h2>Daily Horoscope for {selectedSign}</h2>
              <p className="horoscope-text">{horoscopes[selectedSign]}</p>
              <div style={{ marginTop: '20px', color: '#b8a9d4' }}>
                <p><strong>Element:</strong> {zodiacSigns.find(s => s.name === selectedSign)?.element}</p>
                <p><strong>Ruling Planet:</strong> {zodiacSigns.find(s => s.name === selectedSign)?.ruling}</p>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'compatibility' && (
        <div className="content-section">
          <h2>Zodiac Compatibility Calculator</h2>
          <div className="form-group">
            <label>Your Zodiac Sign</label>
            <select value={sign1} onChange={(e) => setSign1(e.target.value)}>
              <option value="">Select your sign</option>
              {zodiacSigns.map((sign) => (
                <option key={sign.name} value={sign.name}>
                  {sign.icon} {sign.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Partner's Zodiac Sign</label>
            <select value={sign2} onChange={(e) => setSign2(e.target.value)}>
              <option value="">Select partner's sign</option>
              {zodiacSigns.map((sign) => (
                <option key={sign.name} value={sign.name}>
                  {sign.icon} {sign.name}
                </option>
              ))}
            </select>
          </div>

          <button className="button" onClick={calculateCompatibility}>
            Calculate Compatibility
          </button>

          {compatibilityResult && (
            <div className="compatibility-result">
              <h3>{compatibilityResult.sign1} & {compatibilityResult.sign2}</h3>
              <div className="compatibility-score">{compatibilityResult.score}%</div>
              <p style={{ color: '#d4c5f9', fontSize: '1.1em' }}>{compatibilityResult.description}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'birthchart' && (
        <div className="content-section">
          <h2>Generate Your Birth Chart</h2>
          <div className="form-group">
            <label>Birth Date</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Birth Time</label>
            <input
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Birth Place</label>
            <input
              type="text"
              placeholder="City, Country"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
            />
          </div>

          <button className="button" onClick={generateBirthChart}>
            Generate Birth Chart
          </button>

          {birthChart && (
            <div className="birth-chart-grid">
              <div className="birth-chart-item">
                <h3>Sun Sign</h3>
                <p>{birthChart.sun}</p>
              </div>
              <div className="birth-chart-item">
                <h3>Moon Sign</h3>
                <p>{birthChart.moon}</p>
              </div>
              <div className="birth-chart-item">
                <h3>Rising Sign</h3>
                <p>{birthChart.rising}</p>
              </div>
              <div className="birth-chart-item">
                <h3>Mercury</h3>
                <p>{birthChart.mercury}</p>
              </div>
              <div className="birth-chart-item">
                <h3>Venus</h3>
                <p>{birthChart.venus}</p>
              </div>
              <div className="birth-chart-item">
                <h3>Mars</h3>
                <p>{birthChart.mars}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
