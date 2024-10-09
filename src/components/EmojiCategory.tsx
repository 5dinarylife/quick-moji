import React from 'react'

interface EmojiCategoryProps {
  category: {
    name: string
    icon: React.ReactNode
    emojis: string[]
  }
  onEmojiClick: (emoji: string) => void
  onEmojiLongPress: (emoji: string) => void
}

const EmojiCategory: React.FC<EmojiCategoryProps> = ({ category, onEmojiClick, onEmojiLongPress }) => {
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
        {category.icon}
        <span className="ml-2">{category.name}</span>
      </h2>
      <div className="grid grid-cols-6 gap-2">
        {category.emojis.map((emoji) => (
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

export default EmojiCategory