import React from 'react'
import { Star } from 'lucide-react'

interface FavoriteEmojisProps {
  favorites: string[]
  onEmojiClick: (emoji: string) => void
  onEmojiLongPress: (emoji: string) => void
}

const FavoriteEmojis: React.FC<FavoriteEmojisProps> = ({ favorites, onEmojiClick, onEmojiLongPress }) => {
  let longPressTimer: NodeJS.Timeout

  const handleMouseDown = (emoji: string) => {
    longPressTimer = setTimeout(() => {
      onEmojiLongPress(emoji)
    }, 500)
  }

  const handleMouseUp = (emoji: string) => {
    clearTimeout(longPressTimer)
    onEmojiClick(emoji)
  }

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        <Star className="mr-2" />
        즐겨찾기
      </h2>
      <div className="grid grid-cols-6 gap-2">
        {favorites.map((emoji) => (
          <button
            key={emoji}
            className="text-2xl hover:bg-gray-100 rounded p-1"
            onMouseDown={() => handleMouseDown(emoji)}
            onMouseUp={() => handleMouseUp(emoji)}
            onTouchStart={() => handleMouseDown(emoji)}
            onTouchEnd={() => handleMouseUp(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FavoriteEmojis