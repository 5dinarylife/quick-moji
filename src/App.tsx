import React, { useState, useEffect } from 'react'
import { Smile, Heart, Flag, Clock } from 'lucide-react'
import EmojiCategory from './components/EmojiCategory'
import FavoriteEmojis from './components/FavoriteEmojis'

const categories = [
  { name: '표정', icon: <Smile />, emojis: ['😀', '😂', '🥰', '😎', '🤔', '😴'] },
  { name: '감정', icon: <Heart />, emojis: ['❤️', '💔', '💖', '💯', '💢', '💤'] },
  { name: '기타', icon: <Flag />, emojis: ['🏳️‍🌈', '🚩', '🏁', '🎌', '🏴', '🏳️'] },
]

function App() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    chrome.storage.sync.get(['favorites'], (result) => {
      if (result.favorites) {
        setFavorites(result.favorites)
      }
    })
  }, [])

  const handleEmojiClick = (emoji: string) => {
    navigator.clipboard.writeText(emoji)
  }

  const handleEmojiLongPress = (emoji: string) => {
    const newFavorites = [...favorites]
    const index = newFavorites.indexOf(emoji)
    if (index > -1) {
      newFavorites.splice(index, 1)
    } else {
      newFavorites.push(emoji)
    }
    setFavorites(newFavorites)
    chrome.storage.sync.set({ favorites: newFavorites })
  }

  return (
    <div className="w-64 p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Clock className="mr-2" /> Quick-moji
      </h1>
      <FavoriteEmojis
        favorites={favorites}
        onEmojiClick={handleEmojiClick}
        onEmojiLongPress={handleEmojiLongPress}
      />
      {categories.map((category) => (
        <EmojiCategory
          key={category.name}
          category={category}
          onEmojiClick={handleEmojiClick}
          onEmojiLongPress={handleEmojiLongPress}
        />
      ))}
    </div>
  )
}

export default App